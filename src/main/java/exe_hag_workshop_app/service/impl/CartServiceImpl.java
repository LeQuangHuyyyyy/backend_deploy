package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CartDTO;
import exe_hag_workshop_app.dto.CartItemDTO;
import exe_hag_workshop_app.payload.CreateCartItemRequest;
import exe_hag_workshop_app.entity.*;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.repository.CartItemRepository;
import exe_hag_workshop_app.repository.CartRepository;
import exe_hag_workshop_app.repository.ProductRepository;
import exe_hag_workshop_app.service.CartService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ProductRepository productsRepository;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Override

    public CartDTO getCartByUserId() throws ResourceNotFoundException {
        int userId = jwtTokenHelper.getUserIdFromToken();
        Cart cart = null;
        try {
            cart = cartRepository.findByUser_UserId(userId).orElseGet(() -> createNewCart(userId));
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("cannot find cart with this ID");
        }
        return convertToDTO(cart);
    }

    @Override
    @Transactional
    public CartDTO addItemToCart(CreateCartItemRequest request) {
        int userId = jwtTokenHelper.getUserIdFromToken();

        Cart cart = cartRepository.findByUser_UserId(userId).orElseGet(() -> createNewCart(userId));

        if (request.getProductId() != null) {
            Products product = productsRepository.findById(request.getProductId()).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm"));

            Optional<CartItem> existingCartItem = cartItemRepository.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), product.getProductId());

            if (existingCartItem.isPresent()) {
                CartItem cartItem = existingCartItem.get();
                cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
                cartItemRepository.save(cartItem);
            } else {
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setPrice(product.getPrice());
                cartItem.setQuantity(request.getQuantity());
                cartItemRepository.save(cartItem);
            }
        }

        cart.setTotalAmount(calculateTotalAmount(cart.getCartId()));
        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    @Override
    @Transactional
    public void removeCartItem(int cartItemId) {
        int userId = jwtTokenHelper.getUserIdFromToken();
        Cart cart = cartRepository.findByUser_UserId(userId).orElseThrow(() -> new IllegalArgumentException("cannot find cart for user"));

        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new IllegalArgumentException(""));

        cartItemRepository.delete(cartItem);

        cart.setTotalAmount(calculateTotalAmount(cart.getCartId()));
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(int userId) {
        Cart cart = cartRepository.findByUser_UserId(userId).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));
        cartItemRepository.deleteByCart_CartId(cart.getCartId());
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    @Override
    public double calculateTotalAmount(int cartId) {
        return cartItemRepository.findAll().stream().filter(item -> item.getCart().getCartId() == cartId).mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
    }

    private Cart createNewCart(int userId) {
        Cart cart = new Cart();
        cart.setUser(new Users(userId));
        return cartRepository.save(cart);
    }

    private CartDTO convertToDTO(Cart cart) {

        CartDTO dto = new CartDTO();

        dto.setCreatedAt(cart.getCreatedAt());
        dto.setUpdatedAt(cart.getUpdatedAt());
        dto.setTotalAmount(cart.getTotalAmount());

        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream().map(this::convertToCartItemDTO).collect(Collectors.toList());
        dto.setCartItems(cartItemDTOs);

        return dto;
    }

    private CartItemDTO convertToCartItemDTO(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setCartItemId(item.getCartItemId());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());

        if (item.getProduct() != null) {
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            // Lấy ảnh đầu tiên của sản phẩm nếu có
            if (!item.getProduct().getImages().isEmpty()) {
                dto.setProductImage(item.getProduct().getImages().iterator().next().getImageUrl());
            }
        }

        if (item.getWorkshop() != null) {
            dto.setWorkshopId(item.getWorkshop().getWorkshopId());
            dto.setWorkshopTitle(item.getWorkshop().getWorkshopTitle());
            // Thêm logic lấy ảnh workshop nếu có
        }

        return dto;
    }
} 