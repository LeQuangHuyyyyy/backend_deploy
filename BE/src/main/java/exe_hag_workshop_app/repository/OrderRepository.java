package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findByUser_UserId(int userId);
    List<Orders> findByStatus(OrderStatus status);
    List<Orders> findByOrderDateBetween(Date startDate, Date endDate);
    
    @Query("SELECT o FROM Orders o JOIN o.orderDetails od WHERE od.product.productId = :productId")
    List<Orders> findByOrderDetails_Product_ProductId(@Param("productId") int productId);
    
    @Query("SELECT o FROM Orders o JOIN o.orderDetails od WHERE od.workshop.workshopId = :workshopId")
    List<Orders> findByOrderDetails_Workshop_WorkshopId(@Param("workshopId") int workshopId);
    
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Orders o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    double calculateTotalRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT DISTINCT o FROM Orders o " +
           "JOIN o.orderDetails od " +
           "JOIN od.workshop w " +
           "JOIN w.schedules s " +
           "WHERE s.startTime > :now")
    List<Orders> findOrdersByUpcomingWorkshop(@Param("now") Date now);



    @Query("SELECT DISTINCT o FROM Orders o " +
            "JOIN o.orderDetails od " +
            "JOIN od.workshop w " +
            "JOIN w.schedules s " +
            "WHERE s.startTime < :now")
    List<Orders> findOrdersByFinishedWorkshop(@Param("now") Date now);
}
