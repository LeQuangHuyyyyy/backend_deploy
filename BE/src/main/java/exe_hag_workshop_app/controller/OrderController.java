package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.CreateOrderRequest;
import exe_hag_workshop_app.payload.CreatePaymentLinkRequestBody;
import exe_hag_workshop_app.payload.OrderRequest;
import exe_hag_workshop_app.payload.ResponseData;
import exe_hag_workshop_app.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping(path = "/workshop-order")
    public ResponseEntity<?> createPaymentLink(@RequestBody CreatePaymentLinkRequestBody requestBody) {
        try {
            ResponseData data = new ResponseData();
            data.setStatus(200);
            data.setDescription("Payment link created successfully");
            data.setData(orderService.createWorkshopOrder(requestBody));
            return new ResponseEntity<>(data, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // CRUD Endpoints
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        List<OrderRequest> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable("id") int orderId) {
        try {
            OrderRequest order = orderService.getOrderById(orderId);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("order-success")
    public ResponseEntity<?> getOrderSuccess() {
        try {
            List<OrderRequest> orders = orderService.getAllOrdersSuccess();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("order-success-instructor/{id}")
    public ResponseEntity<?> getOrderSuccessByInstructor(@PathVariable("id") int instructorId) {
        try {
            List<OrderRequest> orders = orderService.getAllOrdersSuccess();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest order) {
        try {
            ResponseData data = new ResponseData();
            data.setData(orderService.createOrder(order));
            data.setStatus(200);
            data.setDescription("Order created successfully");
            return new ResponseEntity<>(data, HttpStatus.CREATED);
        } catch (OrderValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cancel")
    public ResponseEntity<?> cancelOrder(HttpServletRequest request) {
        ResponseData data = new ResponseData();
        try {
            data.setDescription("Order cancelled successfully");
            orderService.cancelOrder(request);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("https://hagworkshop.site/order-failed"));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("success")
    public ResponseEntity<?> successOrder(HttpServletRequest request) {
        ResponseData data = new ResponseData();

        try {
            data.setDescription("Order successfully");
            orderService.successOrder(request);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("https://hagworkshop.site/order-success"));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable("userId") int userId) {
        List<OrderRequest> orders = orderService.getOrdersByUser(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getOrdersByStatus(@PathVariable("status") OrderStatus status) {
        List<OrderRequest> orders = orderService.getOrdersByStatus(status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/date-range")
    public ResponseEntity<?> getOrdersByDateRange(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<OrderRequest> orders = orderService.getOrdersByDateRange(startDate, endDate);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> calculateTotalRevenue(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        double revenue = orderService.calculateTotalRevenue(startDate, endDate);
        return new ResponseEntity<>(revenue, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") int orderId, @RequestParam OrderStatus status) {
        try {
            OrderRequest updatedOrder = orderService.updateOrderStatus(orderId, status);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getOrdersByProduct(@PathVariable("productId") int productId) {
        List<OrderRequest> orders = orderService.getOrdersByProduct(productId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/workshop/{workshopId}")
    public ResponseEntity<?> getOrdersByWorkshop(@PathVariable("workshopId") int workshopId) {
        List<OrderRequest> orders = orderService.getOrdersByWorkshop(workshopId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/workshops/finished")
    public ResponseEntity<?> getOrdersByFinishedWorkshop() {
        List<OrderRequest> orders = orderService.getOrdersByFinishedWorkshop();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/workshops/upcoming")
    public ResponseEntity<?> getOrdersByUpcomingWorkshop() {
        List<OrderRequest> orders = orderService.getOrdersByUpcomingWorkshop();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
