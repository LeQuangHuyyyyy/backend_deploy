package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByCart_CartIdAndProduct_ProductId(int cartId, int productId);
    Optional<CartItem> findByCart_CartIdAndWorkshop_WorkshopId(int cartId, int workshopId);
    void deleteByCart_CartId(int cartId);
} 