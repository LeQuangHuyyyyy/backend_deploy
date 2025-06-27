package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.entity.Enums.WorkshopCate;
import exe_hag_workshop_app.entity.Schedule;
import exe_hag_workshop_app.entity.Workshops;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.exception.WorkshopValidationException;
import exe_hag_workshop_app.payload.ScheduleRequest;
import exe_hag_workshop_app.payload.WorkshopRequest;
import exe_hag_workshop_app.payload.WorkshopResponse;
import exe_hag_workshop_app.repository.ScheduleRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.repository.WorkshopRepository;
import exe_hag_workshop_app.service.WorkshopService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class WorkshopServiceImp implements WorkshopService {

    @Autowired
    WorkshopRepository workshopRepository;

    @Autowired
    JwtTokenHelper helper;

    @Autowired
    UserRepository userRepo;
    @Autowired
    private ScheduleRepository scheduleRepository;

    private void validateWorkshop(WorkshopRequest request) throws WorkshopValidationException {
        if (request.getWorkshopTitle() == null || request.getWorkshopTitle().trim().isEmpty()) {
            throw new WorkshopValidationException("Workshop title cannot be empty");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new WorkshopValidationException("Description cannot be empty");
        }
        if (request.getPrice() < 0) {
            throw new WorkshopValidationException("Price cannot be negative");
        }
        if (request.getSchedules() == null) {
            throw new WorkshopValidationException("Schedule must not be null");
        }
    }


    @Override
    public Page<WorkshopResponse> getAllWorkshops(Pageable pageable) {
        Page<Workshops> workshopPage = workshopRepository.findAll(pageable);
        return workshopPage.map(workshop -> {
            WorkshopResponse response = new WorkshopResponse();
            BeanUtils.copyProperties(workshop, response);
            if (workshop.getInstructor() != null) {
                response.setCreateBy(workshop.getInstructor().getFirstName() + " " + workshop.getInstructor().getLastName());
            }

            if (workshop.getSchedules() != null && !workshop.getSchedules().isEmpty()) {
                response.setSchedules(workshop.getSchedules().stream().map(schedule -> {
                    ScheduleRequest scheduleRequest = new ScheduleRequest();
                    BeanUtils.copyProperties(schedule, scheduleRequest);
                    return scheduleRequest;
                }).collect(Collectors.toSet()));
            }

            response.setUserAccess(workshop.getUserAccess());


            return response;
        });
    }

    @Override
    public WorkshopResponse getWorkshopById(int workshopId) throws ResourceNotFoundException {
        Workshops workshop = workshopRepository.findById(workshopId).orElseThrow(() -> new ResourceNotFoundException("Workshop not found"));
        if (workshop.getUserAccess() == 0) {
            workshop.setUserAccess(1);
        } else {
            workshop.setUserAccess(workshop.getUserAccess() + 1);
        }
        workshopRepository.save(workshop);
        WorkshopResponse response = new WorkshopResponse();
        BeanUtils.copyProperties(workshop, response);

        if (workshop.getSchedules() != null && !workshop.getSchedules().isEmpty()) {
            response.setSchedules(workshop.getSchedules().stream().map(schedule -> {
                ScheduleRequest scheduleRequest = new ScheduleRequest();
                BeanUtils.copyProperties(schedule, scheduleRequest);
                return scheduleRequest;
            }).collect(Collectors.toSet()));
        }

        response.setCreateBy(workshop.getInstructor().getFirstName() + " " + workshop.getInstructor().getLastName());
        return response;
    }

    @Transactional
    @Override
    public WorkshopResponse createWorkshop(WorkshopRequest request) throws WorkshopValidationException {
        validateWorkshop(request);
        WorkshopResponse response = new WorkshopResponse();
        int instructorId = helper.getUserIdFromToken();


        Workshops workshops = new Workshops();
        BeanUtils.copyProperties(request, workshops);
        WorkshopCate category = WorkshopCate.valueOf(request.getCategory().toUpperCase());
        workshops.setWorkshopCategory(category);
        workshops.setCreateAt(new Date());
        workshops.setUpdateAt(new Date());
        workshops.setUserAccess(0);

        workshops.setInstructor(userRepo.findById(instructorId).orElseThrow(() -> new ResourceNotFoundException("Workshop not found")));

        workshopRepository.save(workshops);


        Set<ScheduleRequest> schedules = new HashSet<>();

        Schedule schedule = null;
        for (ScheduleRequest sr : request.getSchedules()) {
            if (sr.getStartTime() == null || sr.getStartTime().before(new Date())) {
                throw new WorkshopValidationException("Schedule start time must be in the future");
            } else if (sr.getEndTime() == null || sr.getEndTime().before(sr.getStartTime())) {
                throw new WorkshopValidationException("Schedule end time must be after start time");
            }
            schedule = new Schedule();
            BeanUtils.copyProperties(sr, schedule);
            schedule.setWorkshops(workshops);
            scheduleRepository.save(schedule);

            schedules.add(sr);

        }

        BeanUtils.copyProperties(workshops, response);
        response.setCreateBy(workshops.getInstructor().getFirstName() + " " + workshops.getInstructor().getLastName());
        response.setSchedules(schedules);
        return response;

    }

    @Transactional
    @Override
    public WorkshopResponse updateWorkshop(int workshopId, WorkshopRequest request) throws ResourceNotFoundException, WorkshopValidationException {
        Workshops existingWorkshop = workshopRepository.findById(workshopId).orElseThrow(() -> new ResourceNotFoundException("Workshop not found"));
        WorkshopResponse response = new WorkshopResponse();
        validateWorkshop(request);

        for (ScheduleRequest sr : request.getSchedules()) {
            if (sr.getStartTime() == null || sr.getStartTime().before(new Date())) {
                throw new WorkshopValidationException("Schedule start time must be in the future");
            } else if (sr.getEndTime() == null || sr.getEndTime().before(sr.getStartTime())) {
                throw new WorkshopValidationException("Schedule end time must be after start time");
            }
        }


        BeanUtils.copyProperties(request, existingWorkshop, "workshopId", "createAt");
        existingWorkshop.setWorkshopCategory(WorkshopCate.valueOf(request.getCategory()));
        existingWorkshop.setUpdateAt(new Date());
        existingWorkshop = workshopRepository.save(existingWorkshop);
        BeanUtils.copyProperties(existingWorkshop, response);
        response.setCreateBy(existingWorkshop.getInstructor().getFirstName() + " " + existingWorkshop.getInstructor().getLastName());
        return response;
    }

    @Override
    public void deleteWorkshop(int workshopId) throws ResourceNotFoundException {
        if (!workshopRepository.existsById(workshopId)) {
            throw new ResourceNotFoundException("Workshop not found");
        }
        workshopRepository.deleteById(workshopId);
    }

    @Override
    public Page<WorkshopResponse> getWorkshopsByInstructor(int instructorId, Pageable pageable) {
        Page<Workshops> workshopPage = workshopRepository.findByInstructor_UserId(instructorId, pageable);
        return workshopPage.map(this::convertToWorkshopResponse);
    }

    @Override
    public Page<WorkshopResponse> getUpcomingWorkshops(Pageable pageable) {
        Page<Workshops> workshopPage = workshopRepository.findUpcomingWorkshops(new Date(), pageable);
        return workshopPage.map(this::convertToWorkshopResponse);
    }

    @Override
    public Page<WorkshopResponse> getWorkshopsByPriceRange(double minPrice, double maxPrice, Pageable pageable) {
        Page<Workshops> workshopPage = workshopRepository.findByPriceBetween(minPrice, maxPrice, pageable);
        return workshopPage.map(this::convertToWorkshopResponse);
    }

    @Override
    public Page<WorkshopResponse> searchWorkshops(String keyword, Pageable pageable) {
        Page<Workshops> workshopPage = workshopRepository.findByWorkshopTitleContainingIgnoreCase(keyword, pageable);
        return workshopPage.map(this::convertToWorkshopResponse);
    }

    private WorkshopResponse convertToWorkshopResponse(Workshops workshop) {
        WorkshopResponse response = new WorkshopResponse();
        BeanUtils.copyProperties(workshop, response);
        if (workshop.getInstructor() != null) {
            response.setCreateBy(workshop.getInstructor().getFirstName() + " " + workshop.getInstructor().getLastName());
        }
        if (workshop.getSchedules() != null && !workshop.getSchedules().isEmpty()) {
            response.setSchedules(workshop.getSchedules().stream().map(schedule -> {
                ScheduleRequest scheduleRequest = new ScheduleRequest();
                BeanUtils.copyProperties(schedule, scheduleRequest);
                return scheduleRequest;
            }).collect(Collectors.toSet()));
        }
        return response;
    }

    @Override
    public double calculateWorkshopRevenue(int workshopId) {
        return workshopRepository.calculateWorkshopRevenue(workshopId);
    }

    @Override
    public double calculateAveragePrice() {
        return workshopRepository.calculateAveragePrice();
    }

//    @Override
//    public void incrementUserAccess(int workshopId) throws ResourceNotFoundException, WorkshopValidationException {
//        Workshops workshop = workshopRepository.findById(workshopId).orElseThrow(() -> new ResourceNotFoundException("Workshop not found"));
//        workshop.setUserAccess(workshop.getUserAccess() + 1);
//        workshopRepository.save(workshop);
//    }


}
