package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.entity.Blogs;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.BlogValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.BlogRequest;
import exe_hag_workshop_app.payload.BlogResponse;
import exe_hag_workshop_app.repository.BlogRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.BlogService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogServiceImp implements BlogService {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    JwtTokenHelper helpMe;

    @Autowired
    UserRepository userRepository;

    private void validateBlog(BlogRequest request) throws BlogValidationException {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new BlogValidationException("Blog title cannot be empty");
        }
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new BlogValidationException("Blog content cannot be empty");
        }
    }


    @Override
    public List<BlogRequest> getAllBlogs() {
        List<Blogs> blogs = blogRepository.findAll();
        return blogs.stream().map(blog -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(blog, request);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public BlogResponse getBlogById(int blogId) throws ResourceNotFoundException {
        BlogResponse response = new BlogResponse();
        Blogs blog = blogRepository.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog"));
        BeanUtils.copyProperties(blog, response);

        // Set author information
        if (blog.getCreatedBy() != null) {
            String authorName = blog.getCreatedBy().getFirstName();
            if (blog.getCreatedBy().getLastName() != null) {
                authorName += " " + blog.getCreatedBy().getLastName();
            }
            response.setAuthor(authorName);
        }

        return response;
    }

    @Override
    public BlogRequest createBlog(BlogRequest request) throws BlogValidationException {
        int id = helpMe.getUserIdFromToken();
        Users createdBy = userRepository.findById(id).get();
        validateBlog(request);
        Blogs blog = new Blogs();
        blog.setCreatedBy(createdBy);
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setImageUrl(request.getImageUrl());
        blog.setCreatedAt(new Date());
        blog.setUpdatedAt(new Date());
        blog.setPublishDate(new Date());
        blog.setPublished(true);
        blog.setViewCount(0);
        blog.setLikeCount(0);

        // Save the blog first to get the ID
        blogRepository.save(blog);

        // Create a new request with the updated values
        BlogRequest updatedRequest = new BlogRequest();
        updatedRequest.setTitle(blog.getTitle());
        updatedRequest.setContent(blog.getContent());
        updatedRequest.setImageUrl(blog.getImageUrl());

        return updatedRequest;
    }

    @Override
    public BlogRequest updateBlog(int blogId, BlogRequest request) throws ResourceNotFoundException, BlogValidationException {
        Blogs existingBlog = blogRepository.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog"));
        validateBlog(request);
        BeanUtils.copyProperties(request, existingBlog);
        existingBlog.setUpdatedAt(new Date());
        blogRepository.save(existingBlog);
        return request;
    }

    @Override
    public void deleteBlog(int blogId) throws ResourceNotFoundException {
        if (!blogRepository.existsById(blogId)) {
            throw new ResourceNotFoundException("Blog");
        }
        blogRepository.deleteById(blogId);
    }

    @Override
    public List<BlogRequest> getBlogsByAuthor(String name) {
        List<Blogs> blog = blogRepository.findByCreatedBy_FirstNameContainsIgnoreCase(name);
        return blog.stream().map(bl -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(bl, request);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<BlogRequest> searchBlogs(String keyword) {
        List<Blogs> blog = blogRepository.searchBlogs(keyword);
        return blog.stream().map(bl -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(bl, request);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<BlogRequest> getBlogsByDateRange(Date startDate, Date endDate) {
        List<Blogs> blog = blogRepository.findByCreatedAtBetween(startDate, endDate);
        return blog.stream().map(bl -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(bl, request);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public BlogRequest incrementViewCount(int blogId) throws ResourceNotFoundException {
        Blogs blog = blogRepository.findById(blogId).orElseThrow(() -> new ResourceNotFoundException("Blog Not Found"));
        blog.setViewCount(blog.getViewCount() + 1);

        BlogRequest request = new BlogRequest();
        BeanUtils.copyProperties(blog, request);
        return request;
    }

    @Override
    public Page<BlogRequest> getMostViewedBlogs(int page, int size, String sort) {
        Sort sorting = Sort.by(Sort.Direction.DESC, "viewCount");
        Pageable pageable = PageRequest.of(page, size, sorting);

        Page<Blogs> blogsPage = blogRepository.findByPublishedTrue(pageable);
        return blogsPage.map(blog -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(blog, request);
            return request;
        });
    }

    @Override
    public Page<BlogRequest> getMostLikedBlogs(int page, int size, String sort) {
        Sort sorting = Sort.by(Sort.Direction.DESC, "likeCount");
        PageRequest pageRequest = PageRequest.of(page, size, sorting);

        Page<Blogs> blogsPage = blogRepository.findByPublishedTrue(pageRequest);
        return blogsPage.map(blog -> {
            BlogRequest request = new BlogRequest();
            BeanUtils.copyProperties(blog, request);
            return request;
        });
    }
}
