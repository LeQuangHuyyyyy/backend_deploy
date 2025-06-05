package exe_hag_workshop_app.service;

import exe_hag_workshop_app.exception.BlogValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.BlogRequest;
import exe_hag_workshop_app.payload.BlogResponse;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface BlogService {
    List<BlogRequest> getAllBlogs();

    BlogResponse getBlogById(int blogId) throws ResourceNotFoundException;

    BlogRequest createBlog(BlogRequest request) throws BlogValidationException;

    BlogRequest updateBlog(int blogId, BlogRequest request) throws ResourceNotFoundException, BlogValidationException;

    void deleteBlog(int blogId) throws ResourceNotFoundException;

    List<BlogRequest> getBlogsByAuthor(String name) throws ResourceNotFoundException;

    List<BlogRequest> searchBlogs(String keyword);

    List<BlogRequest> getBlogsByDateRange(Date startDate, Date endDate);

    BlogRequest incrementViewCount(int blogId) throws ResourceNotFoundException;

    Page<BlogRequest> getMostViewedBlogs(int page, int size, String sort);

    Page<BlogRequest> getMostLikedBlogs(int page, int size, String sort);
} 