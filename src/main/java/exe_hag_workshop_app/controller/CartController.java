package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.CartDTO;
import exe_hag_workshop_app.payload.CreateCartItemRequest;
import exe_hag_workshop_app.service.CartService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
@PreAuthorize("isAuthenticated()")
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @GetMapping("")
    public ResponseEntity<CartDTO> getCart() {
        return ResponseEntity.ok(cartService.getCartByUserId());
    }

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItemToCart(
            @Valid @RequestBody CreateCartItemRequest request) {
        return ResponseEntity.ok(cartService.addItemToCart(request));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable int cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    public ResponseEntity<Void> clearCart() {
        int userId = jwtTokenHelper.getUserIdFromToken();
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
} 