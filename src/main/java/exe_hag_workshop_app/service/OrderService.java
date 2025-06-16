package exe_hag_workshop_app.service;

import com.fasterxml.jackson.databind.node.ObjectNode;
import exe_hag_workshop_app.dto.OrderDTO;
import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.payload.CreateOrderRequest;
import exe_hag_workshop_app.payload.CreatePaymentLinkRequestBody;
import exe_hag_workshop_app.payload.OrderRequest;
import exe_hag_workshop_app.payload.ResponseData;
import jakarta.servlet.http.HttpServletRequest;

import java.net.http.HttpRequest;
import java.util.Date;
import java.util.List;

public interface OrderService {
    List<OrderRequest> getAllOrders();

    OrderRequest getOrderById(int orderId) throws ResourceNotFoundException;

    ObjectNode createOrder(CreateOrderRequest order) throws OrderValidationException;

    ObjectNode createWorkshopOrder(CreatePaymentLinkRequestBody orderRequest);

    List<OrderRequest> getOrdersByUser(int userId);

    List<OrderRequest> getOrdersByStatus(OrderStatus status);

    List<OrderRequest> getOrdersByDateRange(Date startDate, Date endDate);

    double calculateTotalRevenue(Date startDate, Date endDate);

    OrderRequest updateOrderStatus(int orderId, OrderStatus status) throws ResourceNotFoundException;

    List<OrderRequest> getOrdersByProduct(int productId);

    List<OrderRequest> getOrdersByWorkshop(int workshopId);

    List<OrderRequest> getOrdersByFinishedWorkshop();

    List<OrderRequest> getOrdersByUpcomingWorkshop();

    void cancelOrder(HttpServletRequest request) throws ResourceNotFoundException;

    void successOrder(HttpServletRequest request) throws ResourceNotFoundException;


}
