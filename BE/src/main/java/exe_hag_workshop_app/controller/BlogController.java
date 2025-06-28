package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.exception.BlogValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.BlogRequest;
import exe_hag_workshop_app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    BlogService blogService;

    @GetMapping
    public ResponseEntity<?> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable("id") int blogId) {
        try {
            return ResponseEntity.ok(blogService.getBlogById(blogId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@RequestBody BlogRequest request) {
        try {
            return new ResponseEntity<>(blogService.createBlog(request), HttpStatus.CREATED);
        } catch (BlogValidationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable("id") int blogId, @RequestBody BlogRequest request) {
        try {
            return ResponseEntity.ok(blogService.updateBlog(blogId, request));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BlogValidationException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable("id") int blogId) {
        try {
            blogService.deleteBlog(blogId);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/author")
    public ResponseEntity<?> getBlogsByAuthor(@RequestParam String name) {
        return ResponseEntity.ok(blogService.getBlogsByAuthor(name));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBlogs(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(blogService.searchBlogs(keyword));
    }

    @GetMapping("/date-range")
    public ResponseEntity<?> getBlogsByDateRange(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return ResponseEntity.ok(blogService.getBlogsByDateRange(startDate, endDate));
    }

    @PutMapping("/{id}/view")
    public ResponseEntity<?> incrementViewCount(@PathVariable("id") int blogId) {
        try {
            return ResponseEntity.ok(blogService.incrementViewCount(blogId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/most-viewed")
    public ResponseEntity<?> getMostViewedBlogs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "viewCount,desc") String sort) {
        return ResponseEntity.ok(blogService.getMostViewedBlogs(page, size, sort));
    }

    @GetMapping("/most-liked")
    public ResponseEntity<?> getMostLikedBlogs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "viewCount,desc") String sort) {
        return ResponseEntity.ok(blogService.getMostLikedBlogs(page, size, sort));
    }
}