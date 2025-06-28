package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Workshops;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface WorkshopRepository extends JpaRepository<Workshops, Integer> {
    Page<Workshops> findAll(Pageable pageable);

    Page<Workshops> findByInstructor_UserId(int instructorId, Pageable pageable);

    Page<Workshops> findByPriceBetween(double minPrice, double maxPrice, Pageable pageable);

    Page<Workshops> findByPriceGreaterThanEqualAndPriceLessThanEqual(double minPrice, double maxPrice, Pageable pageable);


    Page<Workshops> findByWorkshopTitleContainingIgnoreCase(String keyword, Pageable pageable);

    @Query("SELECT w FROM Workshops w JOIN w.schedules s WHERE s.startTime > :currentDate")
    Page<Workshops> findUpcomingWorkshops(@Param("currentDate") Date currentDate, Pageable pageable);

    @Query("SELECT COALESCE(SUM(o.subtotal), 0) FROM Workshops w JOIN w.orderDetails o " +
            "WHERE w.workshopId = :workshopId")
    double calculateWorkshopRevenue(@Param("workshopId") int workshopId);

    @Query("SELECT COALESCE(AVG(w.price), 0) FROM Workshops w")
    double calculateAveragePrice();
}
