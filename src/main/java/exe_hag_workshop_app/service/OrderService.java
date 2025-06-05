package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.OrderDTO;
import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.payload.OrderRequest;

import java.util.Date;
import java.util.List;

public interface OrderService {
    List<OrderRequest> getAllOrders();

    OrderRequest getOrderById(int orderId) throws ResourceNotFoundException;

    OrderRequest createOrder(OrderDTO orderDTO) throws OrderValidationException;

    OrderRequest updateOrder(int orderId, OrderDTO orderDTO) throws ResourceNotFoundException, OrderValidationException;

    void deleteOrder(int orderId) throws ResourceNotFoundException;

    List<OrderRequest> getOrdersByUser(int userId);

    List<OrderRequest> getOrdersByStatus(OrderStatus status);

    List<OrderRequest> getOrdersByDateRange(Date startDate, Date endDate);

    double calculateTotalRevenue(Date startDate, Date endDate);

    OrderRequest updateOrderStatus(int orderId, OrderStatus status) throws ResourceNotFoundException;

    List<OrderRequest> getOrdersByProduct(int productId);

    List<OrderRequest> getOrdersByWorkshop(int workshopId);
} 