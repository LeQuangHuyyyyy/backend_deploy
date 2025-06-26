package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CommentRequest;
import exe_hag_workshop_app.dto.CommentResponse;
import exe_hag_workshop_app.entity.Comment;
import exe_hag_workshop_app.entity.SocialPost;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.repository.CommentRepository;
import exe_hag_workshop_app.repository.SocialPostRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SocialPostRepository socialPostRepository;

    @Override
    public List<CommentResponse> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CommentResponse getCommentById(int commentId) throws ResourceNotFoundException {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        return convertToResponse(comment);
    }

    @Override
    public CommentResponse createComment(CommentRequest commentRequest) throws ResourceNotFoundException {
        Users user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + commentRequest.getUserId()));
        
        SocialPost socialPost = socialPostRepository.findById(commentRequest.getSocialPostId())
                .orElseThrow(() -> new ResourceNotFoundException("Social post not found with id: " + commentRequest.getSocialPostId()));

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setAnswer(commentRequest.isAnswer());
        comment.setCommentAnswer(commentRequest.getCommentAnswer());
        comment.setSocialPost(socialPost);
        comment.setUserComment(user);
        comment.setCreatedAt(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        Comment savedComment = commentRepository.save(comment);
        return convertToResponse(savedComment);
    }

    @Override
    public CommentResponse updateComment(int commentId, CommentRequest commentRequest) throws ResourceNotFoundException {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (commentRequest.getContent() != null) {
            comment.setContent(commentRequest.getContent());
        }
        comment.setAnswer(commentRequest.isAnswer());
        comment.setCommentAnswer(commentRequest.getCommentAnswer());

        if (commentRequest.getUserId() > 0) {
            Users user = userRepository.findById(commentRequest.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + commentRequest.getUserId()));
            comment.setUserComment(user);
        }

        if (commentRequest.getSocialPostId() > 0) {
            SocialPost socialPost = socialPostRepository.findById(commentRequest.getSocialPostId())
                    .orElseThrow(() -> new ResourceNotFoundException("Social post not found with id: " + commentRequest.getSocialPostId()));
            comment.setSocialPost(socialPost);
        }

        Comment updatedComment = commentRepository.save(comment);
        return convertToResponse(updatedComment);
    }

    @Override
    public void deleteComment(int commentId) throws ResourceNotFoundException {
        if (!commentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Comment not found with id: " + commentId);
        }
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<CommentResponse> getCommentsByPostId(int postId) {
        return commentRepository.findBySocialPost_PostId(postId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentResponse> getCommentsByUserId(int userId) {
        return commentRepository.findByUserComment_UserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentResponse> getCommentsByIsAnswer(boolean isAnswer) {
        return commentRepository.findByIsAnswer(isAnswer).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private CommentResponse convertToResponse(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setCommentId(comment.getCommentId());
        response.setContent(comment.getContent());
        response.setCreatedAt(comment.getCreatedAt());
        response.setAnswer(comment.isAnswer());
        response.setCommentAnswer(comment.getCommentAnswer());
        response.setSocialPostId(comment.getSocialPost().getPostId());
        response.setUserId(comment.getUserComment().getUserId());
        response.setUserName(comment.getUserComment().getFirstName() + " " + comment.getUserComment().getLastName());
        return response;
    }
} 