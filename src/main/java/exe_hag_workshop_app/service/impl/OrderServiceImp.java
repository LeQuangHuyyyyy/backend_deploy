package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.OrderDTO;
import exe_hag_workshop_app.dto.OrderDetailDTO;
import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.entity.OrderDetails;
import exe_hag_workshop_app.entity.Orders;
import exe_hag_workshop_app.entity.Products;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.OrderRequest;
import exe_hag_workshop_app.payload.ProductInCartRequest;
import exe_hag_workshop_app.repository.OrderDetailRepository;
import exe_hag_workshop_app.repository.OrderRepository;
import exe_hag_workshop_app.repository.ProductRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.OrderService;
import org.hibernate.query.Order;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    OrderDetailRepository orderDetailRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

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
    public OrderRequest createOrder(OrderDTO orderDTO) throws OrderValidationException {
        validateOrder(orderDTO);

        Orders order = new Orders();
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);
        order.setUser(userRepository.findById(orderDTO.getUserId()).orElseThrow(() -> new OrderValidationException("User not found")));
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        order.setTotalAmount(orderDTO.getTotalAmount());

        order = orderRepository.save(order);

        Orders finalOrder = order;
        List<OrderDetails> orderDetails = getOrderDetail(orderDTO, finalOrder);
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
        return request;
    }

    @Override
    public OrderRequest updateOrder(int orderId, OrderDTO orderDTO) throws ResourceNotFoundException, OrderValidationException {
        final Orders existingOrder = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order"));

        validateOrder(orderDTO);

        existingOrder.setShippingAddress(orderDTO.getShippingAddress());
        existingOrder.setPhoneNumber(orderDTO.getPhoneNumber());
        existingOrder.setTotalAmount(orderDTO.getTotalAmount());

        List<OrderDetails> orderDetails = getOrderDetail(orderDTO, existingOrder);
        existingOrder.getOrderDetails().clear();
        existingOrder.getOrderDetails().addAll(orderDetails);

        orderRepository.save(existingOrder);

        OrderRequest request = new OrderRequest();
        BeanUtils.copyProperties(existingOrder, request);

        List<ProductInCartRequest> productInCartList = existingOrder.getOrderDetails().stream().map(od -> {
            ProductInCartRequest re = new ProductInCartRequest();
            re.setProductId(od.getProduct().getProductId());
            re.setProductName(od.getProduct().getProductName());
            re.setQuantity(od.getQuantity());
            return re;
        }).collect(Collectors.toList());

        request.setProductInCartRequests(productInCartList);
        return request;
    }

    private List<OrderDetails> getOrderDetail(OrderDTO orderDTO, Orders existingOrder) {
        return orderDTO.getOrderDetails().stream().map(detail -> {
            OrderDetails od = new OrderDetails();
            od.setOrder(existingOrder);
            Products product = productRepository.findById(detail.getProductId()).orElseThrow(() -> new OrderValidationException("Product not found with id"));
            od.setProduct(product);
            od.setQuantity(detail.getQuantity());
            od.setUnitPrice(detail.getUnitPrice());
            return od;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(int orderId) throws ResourceNotFoundException {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found");
        }
        orderRepository.deleteById(orderId);
    }

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
} 