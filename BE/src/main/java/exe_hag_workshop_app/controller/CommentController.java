package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.CommentRequest;
import exe_hag_workshop_app.dto.CommentResponse;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getAllComments() {
        List<CommentResponse> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable int commentId) {
        try {
            CommentResponse comment = commentService.getCommentById(commentId);
            return ResponseEntity.ok(comment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest commentRequest) {
        try {
            CommentResponse createdComment = commentService.createComment(commentRequest);
            return ResponseEntity.ok(createdComment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable int commentId, @RequestBody CommentRequest commentRequest) {
        try {
            CommentResponse updatedComment = commentService.updateComment(commentId, commentRequest);
            return ResponseEntity.ok(updatedComment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable int postId) {
        List<CommentResponse> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByUserId(@PathVariable int userId) {
        List<CommentResponse> comments = commentService.getCommentsByUserId(userId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/answers/{isAnswer}")
    public ResponseEntity<List<CommentResponse>> getCommentsByIsAnswer(@PathVariable boolean isAnswer) {
        List<CommentResponse> comments = commentService.getCommentsByIsAnswer(isAnswer);
        return ResponseEntity.ok(comments);
    }
} 