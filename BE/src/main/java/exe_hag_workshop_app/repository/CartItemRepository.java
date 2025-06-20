package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    Optional<CartItem> findByCart_CartIdAndProduct_ProductId(int cartId, int productId);

    void deleteByCart_CartId(int cartId);

    List<CartItem> findByCart_CartId(int cartId);
}
