package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<ImageProduct, Integer> {
} 