package exe_hag_workshop_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import exe_hag_workshop_app.dto.OrderDTO;
import exe_hag_workshop_app.entity.Enums.OrderStatus;
import exe_hag_workshop_app.exception.OrderValidationException;
import exe_hag_workshop_app.exception.ResourceNotFoundException;
import exe_hag_workshop_app.payload.CreateOrderRequest;
import exe_hag_workshop_app.payload.CreatePaymentLinkRequestBody;
import exe_hag_workshop_app.payload.OrderRequest;
import exe_hag_workshop_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//Payment imports
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PayOS payOS;

    @PostMapping(path = "/payment")
    public ObjectNode createPaymentLink(@RequestBody CreatePaymentLinkRequestBody RequestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        try {
            final String productName = RequestBody.getProductName();
            final String description = RequestBody.getDescription();
            final String returnUrl = RequestBody.getReturnUrl();
            final String cancelUrl = RequestBody.getCancelUrl();
            final int price = RequestBody.getPrice();

            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            ItemData item = ItemData.builder().name(productName).price(price).quantity(RequestBody.getQuantity()).build();

            PaymentData paymentData = PaymentData.builder().orderCode(orderCode).description(description).amount(price).item(item).returnUrl(returnUrl).cancelUrl(cancelUrl).build();

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

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest order) {
        try {
            OrderRequest createdOrder = orderService.createOrder(order);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (OrderValidationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateOrder(@PathVariable("id") int orderId, @RequestBody OrderDTO orderDTO) {
//        try {
//            OrderRequest updatedOrder = orderService.updateOrder(orderId, orderDTO);
//            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
//        } catch (ResourceNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        } catch (OrderValidationException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteOrder(@PathVariable("id") int orderId) {
//        try {
//            orderService.deleteOrder(orderId);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (ResourceNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        }
//    }

    // Business Logic Endpoints
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
