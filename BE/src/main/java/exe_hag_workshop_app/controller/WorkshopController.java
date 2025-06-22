package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.exception.WorkshopValidationException;
import exe_hag_workshop_app.payload.UserInWorkshopByInstructor;
import exe_hag_workshop_app.payload.WorkshopRequest;
import exe_hag_workshop_app.payload.WorkshopResponse;
import exe_hag_workshop_app.service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workshops")
public class WorkshopController {

    @Autowired
    WorkshopService workshopService;

    @GetMapping
    public ResponseEntity<Page<WorkshopResponse>> getAllWorkshops(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<WorkshopResponse> workshops = workshopService.getAllWorkshops(pageable);
        return ResponseEntity.ok(workshops);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWorkshopById(@PathVariable("id") int workshopId) {
        try {
            WorkshopResponse response = workshopService.getWorkshopById(workshopId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<?> createWorkshop(@RequestBody WorkshopRequest request) {
        try {
            WorkshopResponse createdWorkshop = workshopService.createWorkshop(request);
            return new ResponseEntity<>(createdWorkshop, HttpStatus.CREATED);
        } catch (WorkshopValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<?> updateWorkshop(@PathVariable("id") int workshopId, @RequestBody WorkshopRequest request) {
        try {
            WorkshopResponse updatedWorkshop = workshopService.updateWorkshop(workshopId, request);
            return new ResponseEntity<>(updatedWorkshop, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (WorkshopValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<?> deleteWorkshop(@PathVariable("id") int workshopId) {
        try {
            workshopService.deleteWorkshop(workshopId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<?> getWorkshopsByInstructor(@PathVariable("instructorId") int instructorId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WorkshopResponse> workshops = workshopService.getWorkshopsByInstructor(instructorId, pageable);
        return new ResponseEntity<>(workshops, HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<?> getUpcomingWorkshops(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WorkshopResponse> workshops = workshopService.getUpcomingWorkshops(pageable);
        return new ResponseEntity<>(workshops, HttpStatus.OK);
    }

    @GetMapping("/price-range")
    public ResponseEntity<?> getWorkshopsByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WorkshopResponse> workshops = workshopService.getWorkshopsByPriceRange(minPrice, maxPrice, pageable);
        return new ResponseEntity<>(workshops, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchWorkshops(@RequestParam String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WorkshopResponse> workshops = workshopService.searchWorkshops(keyword, pageable);
        return new ResponseEntity<>(workshops, HttpStatus.OK);
    }

    @GetMapping("/{id}/revenue")
    public ResponseEntity<?> getWorkshopRevenue(@PathVariable("id") int workshopId) {
        double revenue = workshopService.calculateWorkshopRevenue(workshopId);
        return new ResponseEntity<>(revenue, HttpStatus.OK);
    }


//    @PostMapping("/user-access")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> incrementUserAccess(@RequestParam int workshopId) {
//        try {
//            workshopService.incrementUserAccess(workshopId);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (ResourceNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//    }


//    @GetMapping("/{instructorId}")
//    public ResponseEntity<?> getUserInWorkshopByInstructor(@PathVariable("instructorId") int instructorId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<UserInWorkshopByInstructor> workshops = workshopService.getUserInWorkshopByInstructor(instructorId, pageable);
//        return new ResponseEntity<>(workshops, HttpStatus.OK);
//}
}
