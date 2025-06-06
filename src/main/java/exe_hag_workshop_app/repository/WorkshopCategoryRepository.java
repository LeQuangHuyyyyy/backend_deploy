package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.WorkshopCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkshopCategoryRepository extends JpaRepository<WorkshopCategory, Integer> {

}
