package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Integer> {
    List<Comments> findByBlog_BlogId(Integer blogId);
    List<Comments> findByAuthorName(String authorName);
} 