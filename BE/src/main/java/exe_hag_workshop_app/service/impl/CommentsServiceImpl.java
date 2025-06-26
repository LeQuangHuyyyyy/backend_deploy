package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CommentsRequest;
import exe_hag_workshop_app.dto.CommentsResponse;
import exe_hag_workshop_app.entity.Blogs;
import exe_hag_workshop_app.entity.Comments;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.repository.BlogRepository;
import exe_hag_workshop_app.repository.CommentsRepository;
import exe_hag_workshop_app.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentsServiceImpl implements CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<CommentsResponse> getAllComments() {
        return commentsRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CommentsResponse getCommentById(Integer commentId) throws ResourceNotFoundException {
        Comments comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        return convertToResponse(comment);
    }

    @Override
    public CommentsResponse createComment(CommentsRequest commentsRequest) throws ResourceNotFoundException {
        Blogs blog = blogRepository.findById(commentsRequest.getBlogId())
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + commentsRequest.getBlogId()));

        Comments comment = new Comments();
        comment.setCommentText(commentsRequest.getCommentText());
        comment.setAuthorName(commentsRequest.getAuthorName());
        comment.setBlog(blog);
        comment.setDateCreated(new Date());

        Comments savedComment = commentsRepository.save(comment);
        return convertToResponse(savedComment);
    }

    @Override
    public CommentsResponse updateComment(Integer commentId, CommentsRequest commentsRequest) throws ResourceNotFoundException {
        Comments comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (commentsRequest.getCommentText() != null) {
            comment.setCommentText(commentsRequest.getCommentText());
        }
        if (commentsRequest.getAuthorName() != null) {
            comment.setAuthorName(commentsRequest.getAuthorName());
        }

        if (commentsRequest.getBlogId() != null) {
            Blogs blog = blogRepository.findById(commentsRequest.getBlogId())
                    .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + commentsRequest.getBlogId()));
            comment.setBlog(blog);
        }

        Comments updatedComment = commentsRepository.save(comment);
        return convertToResponse(updatedComment);
    }

    @Override
    public void deleteComment(Integer commentId) throws ResourceNotFoundException {
        if (!commentsRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Comment not found with id: " + commentId);
        }
        commentsRepository.deleteById(commentId);
    }

    @Override
    public List<CommentsResponse> getCommentsByBlogId(Integer blogId) {
        return commentsRepository.findByBlog_BlogId(blogId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentsResponse> getCommentsByAuthorName(String authorName) {
        return commentsRepository.findByAuthorName(authorName).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private CommentsResponse convertToResponse(Comments comment) {
        CommentsResponse response = new CommentsResponse();
        response.setCommentId(comment.getCommentId());
        response.setCommentText(comment.getCommentText());
        response.setAuthorName(comment.getAuthorName());
        response.setDateCreated(comment.getDateCreated());
        response.setBlogId(comment.getBlog().getBlogId());
        response.setBlogTitle(comment.getBlog().getTitle());
        return response;
    }
} 