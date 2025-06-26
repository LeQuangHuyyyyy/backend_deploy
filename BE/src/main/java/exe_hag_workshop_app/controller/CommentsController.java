package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.CommentsRequest;
import exe_hag_workshop_app.dto.CommentsResponse;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog-comments")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @GetMapping
    public ResponseEntity<List<CommentsResponse>> getAllComments() {
        List<CommentsResponse> comments = commentsService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentsResponse> getCommentById(@PathVariable Integer commentId) {
        try {
            CommentsResponse comment = commentsService.getCommentById(commentId);
            return ResponseEntity.ok(comment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CommentsResponse> createComment(@RequestBody CommentsRequest commentsRequest) {
        try {
            CommentsResponse createdComment = commentsService.createComment(commentsRequest);
            return ResponseEntity.ok(createdComment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentsResponse> updateComment(@PathVariable Integer commentId, @RequestBody CommentsRequest commentsRequest) {
        try {
            CommentsResponse updatedComment = commentsService.updateComment(commentId, commentsRequest);
            return ResponseEntity.ok(updatedComment);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer commentId) {
        try {
            commentsService.deleteComment(commentId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/blog/{blogId}")
    public ResponseEntity<List<CommentsResponse>> getCommentsByBlogId(@PathVariable Integer blogId) {
        List<CommentsResponse> comments = commentsService.getCommentsByBlogId(blogId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/author/{authorName}")
    public ResponseEntity<List<CommentsResponse>> getCommentsByAuthorName(@PathVariable String authorName) {
        List<CommentsResponse> comments = commentsService.getCommentsByAuthorName(authorName);
        return ResponseEntity.ok(comments);
    }
} 