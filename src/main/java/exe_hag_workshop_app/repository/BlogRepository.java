package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Blogs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;  
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blogs, Integer> {
    List<Blogs> findByCreatedBy_FirstNameContainsIgnoreCase(String firstName);

    @Query("select b from Blogs b where b.published = true")
    Page<Blogs> findByPublishedTrue(Pageable pageable);


    @Query("SELECT b FROM Blogs b WHERE " + "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " + "LOWER(b.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Blogs> searchBlogs(@Param("keyword") String keyword);

    List<Blogs> findByCreatedAtBetween(Date startDate, Date endDate);

}