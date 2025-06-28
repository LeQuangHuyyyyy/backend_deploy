package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findBySocialPost_PostId(int postId);
    List<Comment> findByUserComment_UserId(int userId);
    List<Comment> findByIsAnswer(boolean isAnswer);
} 