package exe_hag_workshop_app.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import exe_hag_workshop_app.dto.OrderDTO;
import exe_hag_workshop_app.entity.*;
import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.*;
import exe_hag_workshop_app.repository.*;
import exe_hag_workshop_app.service.OrderService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.PaymentData;

import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImp implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PayOS payOS;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    private void validateOrder(OrderDTO orderDTO) throws OrderValidationException {
        if (orderDTO.getUserId() <= 0) {
            throw new OrderValidationException("Invalid user ID");
        }
        if (orderDTO.getOrderDetails() == null || orderDTO.getOrderDetails().isEmpty()) {
            throw new OrderValidationException("Order must have at least one item");
        }
        if (orderDTO.getShippingAddress() == null || orderDTO.getShippingAddress().trim().isEmpty()) {
            throw new OrderValidationException("Shipping address is required");
        }
        if (orderDTO.getPhoneNumber() == null || !orderDTO.getPhoneNumber().matches("^\\d{10}$")) {
            throw new OrderValidationException("Invalid phone number format");
        }
    }

    @Override
    public List<OrderRequest> getAllOrders() {
        return orderRepository.findAll().stream().map(o -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(o, request);

            List<ProductInCartRequest> productInCartList = o.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getAllOrdersSuccess() {
        Users user = userRepository.findById(jwtTokenHelper.getUserIdFromToken()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return orderRepository.findByUser_UserIdAndStatus(user.getUserId(), OrderStatus.COMPLETED).stream().map(o -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(o, request);
            request.setPhoneNumber(user.getPhoneNumber());
            request.setCustomerName(user.getFirstName() + " " + user.getLastName());
            request.setCustomerEmail(user.getEmail());


            List<ProductInCartRequest> productInCartList = o.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                re.setPrice(od.getUnitPrice());
                if (od.getWorkshop() != null) {
                    re.setWorkshopId(od.getWorkshop().getWorkshopId());
                }
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getAllOrdersSuccessByInstructor(int instructorId) {
        Users instructor = userRepository.findById(instructorId).orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        return orderRepository.findByOrderDetails_Workshop_Instructor(instructor).stream().map(o -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(o, request);

            List<ProductInCartRequest> productInCartList = o.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());

    }

    @Override
    public OrderRequest getOrderById(int orderId) throws ResourceNotFoundException {
        Orders order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order"));

        OrderRequest request = new OrderRequest();
        BeanUtils.copyProperties(order, request);

        List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
            ProductInCartRequest re = new ProductInCartRequest();
            re.setProductId(od.getProduct().getProductId());
            re.setProductName(od.getProduct().getProductName());
            re.setQuantity(od.getQuantity());
            return re;
        }).collect(Collectors.toList());

        request.setProductInCartRequests(productInCartList);
        return request;
    }


    @Override
    @Transactional
    public ObjectNode createWorkshopOrder(CreatePaymentLinkRequestBody orderRequest) throws OrderValidationException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        String phoneNumber = jwtTokenHelper.getUserPhoneFromToken();
        Workshops w = workshopRepository.findById(orderRequest.getWorkshopId()).orElseThrow(() -> new ResourceNotFoundException("Workshop not found with ID: " + orderRequest.getWorkshopId()));
        Users user = userRepository.findById(jwtTokenHelper.getUserIdFromToken()).get();

        Orders order = new Orders();
        order.setOrderDate(new Date());
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order.setPhoneNumber(phoneNumber);
        order.setTotalAmount(w.getPrice());
        order.setUser(user);

        Orders finalOrder = order;

        List<OrderDetails> orderDetails = new ArrayList<>();
        OrderDetails od = new OrderDetails();
        od.setOrder(finalOrder);
        od.setUnitPrice(order.getTotalAmount());

        order.setOrderDetails(orderDetails);
        order = orderRepository.save(order);

        try {
            final String returnUrl = "https://hagworkshop.site/api/orders/success?orderId=" + order.getOrderId();
            final String cancelUrl = "https://hagworkshop.site/api/orders/cancel?orderId=" + order.getOrderId();
            final double price = w.getPrice();


            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            PaymentData paymentData = PaymentData.builder().orderCode(orderCode).description("thanh toan don hang").amount((int) price).returnUrl(returnUrl).cancelUrl(cancelUrl).build();

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            response.put("error", 0);
            response.put("message", "success");
            response.set("data", objectMapper.valueToTree(data));
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    @Transactional
    public ObjectNode createOrder(CreateOrderRequest orderRequest) throws OrderValidationException {
        Cart cart = cartRepository.findById(orderRequest.getCartId()).orElseThrow(() -> new ResourceNotFoundException("Cart"));
        String phoneNumber = jwtTokenHelper.getUserPhoneFromToken();
        Users user = userRepository.findById(cart.getUser().getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Chỉ tìm discount nếu discountId > 0 (có giá trị hợp lệ)
        Discounts discounts = null;
        if (orderRequest.getDiscountId() > 0) {
            discounts = discountRepository.findById(orderRequest.getDiscountId()).orElse(null);
        }

        Orders order = new Orders();
        double totalAmount = cart.getTotalAmount();

        // Tính toán totalAmount với discount nếu có
        if (discounts != null) {
            int percentDiscount = discounts.getDiscountPercentage();
            totalAmount = cart.getTotalAmount() * (1 - percentDiscount / 100.0);
        }

        order.setOrderDate(new Date());
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setTotalAmount(totalAmount); // Chỉ set một lần với giá trị đã tính toán
        order.setStatus(OrderStatus.PENDING);
        order.setPhoneNumber(phoneNumber);
        order.setDiscounts(discounts);
        order.setUser(user);

        Orders finalOrder = order;

        List<OrderDetails> orderDetails = cart.getCartItems().stream().map(cartItem -> {
            OrderDetails od = new OrderDetails();
            od.setOrder(finalOrder);
            od.setProduct(cartItem.getProduct());
            od.setQuantity(cartItem.getQuantity());
            od.setUnitPrice(cartItem.getProduct().getPrice());
            od.setSubtotal(cartItem.getProduct().getPrice() * cartItem.getQuantity());
            return od;
        }).collect(Collectors.toList());

        order.setOrderDetails(orderDetails);
        order = orderRepository.save(order);

        OrderRequest request = new OrderRequest();
        BeanUtils.copyProperties(order, request);

        List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
            ProductInCartRequest re = new ProductInCartRequest();
            re.setProductId(od.getProduct().getProductId());
            re.setProductName(od.getProduct().getProductName());
            re.setQuantity(od.getQuantity());
            return re;
        }).collect(Collectors.toList());

        request.setProductInCartRequests(productInCartList);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            final String returnUrl = "https://hagworkshop.site/api/orders/success?orderId=" + order.getOrderId();
            final String cancelUrl = "https://hagworkshop.site/api/orders/cancel?orderId=" + order.getOrderId();
            final int price = (int) totalAmount; // Sử dụng totalAmount đã tính toán với discount

            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            PaymentData paymentData = PaymentData.builder().orderCode(orderCode).description("Thanh toan don hang").amount(price).returnUrl(returnUrl).cancelUrl(cancelUrl).build();

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            response.put("error", 0);
            response.put("message", "success");
            response.set("data", objectMapper.valueToTree(data));
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", "fail");
            response.set("data", null);
            return response;
        }
    }

    @Override
    public void cancelOrder(HttpServletRequest request) throws ResourceNotFoundException {
        String orderId = request.getParameter("orderId");
        Orders order = orderRepository.findById(Integer.parseInt(orderId)).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
    }

    @Override
    public void successOrder(HttpServletRequest request) throws ResourceNotFoundException {
        String orderId = request.getParameter("orderId");
        Orders order = orderRepository.findById(Integer.parseInt(orderId)).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(OrderStatus.COMPLETED);
    }

//
//    @Override
//    public OrderRequest updateOrder(int orderId, OrderDTO orderDTO) throws ResourceNotFoundException, OrderValidationException {
//        final Orders existingOrder = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order"));
//
//        validateOrder(orderDTO);
//
//        existingOrder.setShippingAddress(orderDTO.getShippingAddress());
//        existingOrder.setPhoneNumber(orderDTO.getPhoneNumber());
//        existingOrder.setTotalAmount(orderDTO.getTotalAmount());
//
//        List<OrderDetails> orderDetails = getOrderDetail(orderDTO, existingOrder);
//        existingOrder.getOrderDetails().clear();
//        existingOrder.getOrderDetails().addAll(orderDetails);
//
//        orderRepository.save(existingOrder);
//
//        OrderRequest request = new OrderRequest();
//        BeanUtils.copyProperties(existingOrder, request);
//
//        List<ProductInCartRequest> productInCartList = existingOrder.getOrderDetails().stream().map(od -> {
//            ProductInCartRequest re = new ProductInCartRequest();
//            re.setProductId(od.getProduct().getProductId());
//            re.setProductName(od.getProduct().getProductName());
//            re.setQuantity(od.getQuantity());
//            return re;
//        }).collect(Collectors.toList());
//
//        request.setProductInCartRequests(productInCartList);
//        return request;
//    }
//
//    private List<OrderDetails> getOrderDetail(OrderDTO orderDTO, Orders existingOrder) {
//        return orderDTO.getOrderDetails().stream().map(detail -> {
//            OrderDetails od = new OrderDetails();
//            od.setOrder(existingOrder);
//            Products product = productRepository.findById(detail.getProductId()).orElseThrow(() -> new OrderValidationException("Product not found with id"));
//            od.setProduct(product);
//            od.setQuantity(detail.getQuantity());
//            od.setUnitPrice(detail.getUnitPrice());
//            return od;
//        }).collect(Collectors.toList());
//    }
//
//    @Override
//    public void deleteOrder(int orderId) throws ResourceNotFoundException {
//        if (!orderRepository.existsById(orderId)) {
//            throw new ResourceNotFoundException("Order not found");
//        }
//        orderRepository.deleteById(orderId);
//    }

    @Override
    public List<OrderRequest> getOrdersByUser(int userId) {
        return orderRepository.findByUser_UserId(userId).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getOrdersByDateRange(Date startDate, Date endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public double calculateTotalRevenue(Date startDate, Date endDate) {
        return orderRepository.calculateTotalRevenue(startDate, endDate);
    }

    @Override
    public OrderRequest updateOrderStatus(int orderId, OrderStatus status) throws ResourceNotFoundException {
        Orders order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        order.setStatus(status);
        order = orderRepository.save(order);

        OrderRequest request = new OrderRequest();
        BeanUtils.copyProperties(order, request);

        List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
            ProductInCartRequest re = new ProductInCartRequest();
            re.setProductId(od.getProduct().getProductId());
            re.setProductName(od.getProduct().getProductName());
            re.setQuantity(od.getQuantity());
            return re;
        }).collect(Collectors.toList());

        request.setProductInCartRequests(productInCartList);
        return request;
    }

    @Override
    public List<OrderRequest> getOrdersByProduct(int productId) {
        return orderRepository.findByOrderDetails_Product_ProductId(productId).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getOrdersByWorkshop(int workshopId) {
        return orderRepository.findByOrderDetails_Workshop_WorkshopId(workshopId).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getOrdersByFinishedWorkshop() {
        return orderRepository.findOrdersByFinishedWorkshop(new Date()).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OrderRequest> getOrdersByUpcomingWorkshop() {
        return orderRepository.findOrdersByUpcomingWorkshop(new Date()).stream().map(order -> {
            OrderRequest request = new OrderRequest();
            BeanUtils.copyProperties(order, request);

            List<ProductInCartRequest> productInCartList = order.getOrderDetails().stream().map(od -> {
                ProductInCartRequest re = new ProductInCartRequest();
                re.setProductId(od.getProduct().getProductId());
                re.setProductName(od.getProduct().getProductName());
                re.setQuantity(od.getQuantity());
                return re;
            }).collect(Collectors.toList());

            request.setProductInCartRequests(productInCartList);
            return request;
        }).collect(Collectors.toList());
    }
}
