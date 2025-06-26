package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.CommentsRequest;
import exe_hag_workshop_app.dto.CommentsResponse;
import exe_hag_workshop_app.exception.ResourceNotFoundException;

import java.util.List;

public interface CommentsService {
    List<CommentsResponse> getAllComments();
    CommentsResponse getCommentById(Integer commentId) throws ResourceNotFoundException;
    CommentsResponse createComment(CommentsRequest commentsRequest) throws ResourceNotFoundException;
    CommentsResponse updateComment(Integer commentId, CommentsRequest commentsRequest) throws ResourceNotFoundException;
    void deleteComment(Integer commentId) throws ResourceNotFoundException;
    List<CommentsResponse> getCommentsByBlogId(Integer blogId);
    List<CommentsResponse> getCommentsByAuthorName(String authorName);
} 