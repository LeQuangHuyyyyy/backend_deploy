package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.CartDTO;
import exe_hag_workshop_app.payload.CreateCartItemRequest;

public interface CartService {
    CartDTO getCartByUserId();

    CartDTO addItemToCart(CreateCartItemRequest request);

    void removeCartItem(int cartItemId);

    void removeCartItemQuantity(int cartItemId);

    double calculateTotalAmount(int cartId);
} 