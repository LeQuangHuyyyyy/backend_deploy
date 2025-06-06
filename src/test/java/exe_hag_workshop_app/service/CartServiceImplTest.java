package exe_hag_workshop_app.service;

import exe_hag_workshop_app.entity.Cart;
import exe_hag_workshop_app.entity.CartItem;
import exe_hag_workshop_app.repository.CartItemRepository;
import exe_hag_workshop_app.repository.CartRepository;
import exe_hag_workshop_app.repository.ProductRepository;
import exe_hag_workshop_app.service.impl.CartServiceImpl;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceImplTest {

    @Mock
    CartRepository cartRepository;
    @Mock
    CartItemRepository cartItemRepository;
    @Mock
    ProductRepository productsRepository;
    @Mock
    JwtTokenHelper jwtTokenHelper;

    @InjectMocks
    CartServiceImpl cartService;

    @BeforeEach
    void setup() {
        // use spy to allow stubbing of calculateTotalAmount
        cartService = spy(cartService);
    }

    @Test
    void removeCartItemDeletesAndUpdatesCartTotal() {
        int userId = 1;
        int cartItemId = 5;

        Cart cart = new Cart();
        cart.setCartId(1);
        cart.setTotalAmount(50.0);

        CartItem item = new CartItem();
        item.setCartItemId(cartItemId);
        item.setCart(cart);

        when(jwtTokenHelper.getUserIdFromToken()).thenReturn(userId);
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.of(cart));
        when(cartItemRepository.findById(cartItemId)).thenReturn(Optional.of(item));
        doReturn(0.0).when(cartService).calculateTotalAmount(cart.getCartId());

        cartService.removeCartItem(cartItemId);

        verify(cartItemRepository).delete(item);
        verify(cartRepository).save(cart);
        verify(cartItemRepository, never()).save(any());
        assertEquals(0.0, cart.getTotalAmount());
    }
}
