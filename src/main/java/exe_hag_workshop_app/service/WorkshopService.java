package exe_hag_workshop_app.service;

import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.exception.WorkshopValidationException;
import exe_hag_workshop_app.payload.ScheduleRequest;
import exe_hag_workshop_app.payload.WorkshopRequest;
import exe_hag_workshop_app.payload.WorkshopResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WorkshopService {
    Page<WorkshopResponse> getAllWorkshops(Pageable pageable);

    WorkshopResponse getWorkshopById(int workshopId) throws ResourceNotFoundException;

    WorkshopResponse createWorkshop(WorkshopRequest request) throws WorkshopValidationException;

    WorkshopResponse updateWorkshop(int workshopId, WorkshopRequest request) throws WorkshopValidationException, ResourceNotFoundException;

    void deleteWorkshop(int workshopId) throws ResourceNotFoundException;

    Page<WorkshopResponse> getWorkshopsByInstructor(int instructorId, Pageable pageable);

    Page<WorkshopResponse> getUpcomingWorkshops(Pageable pageable);

    Page<WorkshopResponse> getWorkshopsByPriceRange(double minPrice, double maxPrice, Pageable pageable);

    Page<WorkshopResponse> searchWorkshops(String keyword, Pageable pageable);

    double calculateWorkshopRevenue(int workshopId);

    void incrementUserAccess(int workshopId) throws ResourceNotFoundException, WorkshopValidationException;
}
