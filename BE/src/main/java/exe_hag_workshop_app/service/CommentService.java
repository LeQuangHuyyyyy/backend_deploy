package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.CommentRequest;
import exe_hag_workshop_app.dto.CommentResponse;
import exe_hag_workshop_app.exception.ResourceNotFoundException;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getAllComments();
    CommentResponse getCommentById(int commentId) throws ResourceNotFoundException;
    CommentResponse createComment(CommentRequest commentRequest) throws ResourceNotFoundException;
    CommentResponse updateComment(int commentId, CommentRequest commentRequest) throws ResourceNotFoundException;
    void deleteComment(int commentId) throws ResourceNotFoundException;
    List<CommentResponse> getCommentsByPostId(int postId);
    List<CommentResponse> getCommentsByUserId(int userId);
    List<CommentResponse> getCommentsByIsAnswer(boolean isAnswer);
} 