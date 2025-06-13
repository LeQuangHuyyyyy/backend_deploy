package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Discounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DiscountRepository extends JpaRepository<Discounts, Integer> {
}
