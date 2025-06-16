package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CartDTO;
import exe_hag_workshop_app.dto.CartItemDTO;
import exe_hag_workshop_app.entity.*;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.CreateCartItemRequest;
import exe_hag_workshop_app.repository.CartItemRepository;
import exe_hag_workshop_app.repository.CartRepository;
import exe_hag_workshop_app.repository.ProductRepository;
import exe_hag_workshop_app.repository.WorkshopRepository;
import exe_hag_workshop_app.service.CartService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    WorkshopRepository workshopsRepository;

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
        double totalAmount = 0.0;

        if (request.getQuantity() <= 0) {
            throw new IllegalArgumentException("quantity must be greater than 0");
        }

        Cart cart = cartRepository.findByUser_UserId(userId).orElseGet(() -> createNewCart(userId));

        if (request.getProductId() != null) {
            Products product = productsRepository.findById(request.getProductId()).orElseThrow(() -> new IllegalArgumentException("cannot find cart for user " + request.getProductId()));

            Optional<CartItem> existingCartItemOpt = cartItemRepository.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), product.getProductId());


            CartItem newItem = new CartItem();
            if (existingCartItemOpt.isPresent()) {
                Workshops workshop = workshopsRepository.findById(request.getWorkshopId()).orElseThrow(() -> new ResourceNotFoundException("cannot find workshop with ID " + request.getWorkshopId()));

                CartItem existingItem = existingCartItemOpt.get();
                existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
                existingItem.setWorkshop(workshop);
                totalAmount += workshop.getPrice();
                cartItemRepository.save(existingItem);
            } else {
                newItem.setCart(cart);
                newItem.setProduct(product);
                newItem.setQuantity(request.getQuantity());
                newItem.setPrice(product.getPrice());
                cartItemRepository.save(newItem);
            }


        } else {
            throw new IllegalArgumentException("missing product ID in request");
        }

        totalAmount += calculateTotalAmount(cart.getCartId());

        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);

        CartDTO cartDTO = new CartDTO();
        BeanUtils.copyProperties(cart, cartDTO);
        cartDTO.setTotalAmount(totalAmount);

        List<CartItemDTO> dtos = new ArrayList<>();


        for (CartItem c : cart.getCartItems()) {
            CartItemDTO dto = new CartItemDTO();
            BeanUtils.copyProperties(c, dto);
            dto.setProductId(c.getProduct().getProductId());
            dto.setProductName(c.getProduct().getProductName());
            if (!c.getProduct().getImages().isEmpty()) {
                dto.setProductImage(c.getProduct().getImages().iterator().next().getImageUrl());
            }
            if (c.getWorkshop() != null) {
                dto.setWorkshopId(c.getWorkshop().getWorkshopId());
                dto.setWorkshopTitle(c.getWorkshop().getWorkshopTitle());
            }

            dtos.add(dto);
        }

        cartDTO.setCartItems(dtos);

        return cartDTO;
    }


    @Override
    @Transactional
    public void removeCartItem(int cartItemId) {
        int userId = jwtTokenHelper.getUserIdFromToken();
        Cart cart = cartRepository.findByUser_UserId(userId).orElseThrow(() -> new IllegalArgumentException("cannot find cart for user"));

        CartItem cartItemToRemove = null;
        for (CartItem item : cart.getCartItems()) {
            if (item.getCartItemId() == cartItemId) {
                cartItemToRemove = item;
                break;
            }
        }

        if (cartItemToRemove == null) {
            throw new IllegalArgumentException("CartItem not found in user's cart");
        }

        cart.getCartItems().remove(cartItemToRemove);
        cartItemToRemove.setCart(null);
        cartItemRepository.delete(cartItemToRemove);
        cart.setTotalAmount(calculateTotalAmount(cart.getCartId()));
        cartRepository.save(cart);

        System.out.println("oke");
    }


    @Override
    public void removeCartItemQuantity(int cartItemId) {
        int userId = jwtTokenHelper.getUserIdFromToken();
        Cart cart = cartRepository.findByUser_UserId(userId).orElseThrow(() -> new IllegalArgumentException("cannot find cart for user"));

        CartItem cartItemToRemove = null;

        for (CartItem item : cart.getCartItems()) {
            if (item.getCartItemId() == cartItemId) {
                cartItemToRemove = item;
                break;
            }
        }
        if (cartItemToRemove == null) {
            throw new IllegalArgumentException("CartItem not found in user's cart");
        }

        if (cartItemToRemove.getQuantity() > 1) {
            cartItemToRemove.setQuantity(cartItemToRemove.getQuantity() - 1);
            cartItemRepository.save(cartItemToRemove);
        } else {
            cart.getCartItems().remove(cartItemToRemove);
            cartItemToRemove.setCart(null);
            cartItemRepository.delete(cartItemToRemove);
            cart.setTotalAmount(calculateTotalAmount(cart.getCartId()));
            cartRepository.save(cart);
        }

    }

    @Override
    public double calculateTotalAmount(int cartId) {
        return (cartItemRepository.findByCart_CartId(cartId).stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum());
    }

    private Cart createNewCart(int userId) {
        Cart cart = new Cart();
        cart.setUser(new Users(userId));
        return cartRepository.save(cart);
    }

    private CartDTO convertToDTO(Cart cart) {

        CartDTO dto = new CartDTO();
        dto.setCartId(cart.getCartId());
        dto.setCreatedAt(cart.getCreatedAt());
        dto.setUpdatedAt(cart.getUpdatedAt());
        dto.setTotalAmount(cart.getTotalAmount());

        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream().map(this::convertToCartItemDTO).collect(Collectors.toList());
        dto.setCartItems(cartItemDTOs);

//        List<CartItemDTO> cartItemDTOs = cart.getCartItems() == null ? List.of() : cart.getCartItems().stream().map(this::convertToCartItemDTO).collect(Collectors.toList());
//        dto.setCartItems(cartItemDTOs);

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