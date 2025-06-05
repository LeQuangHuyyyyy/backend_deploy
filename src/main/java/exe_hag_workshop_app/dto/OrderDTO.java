package exe_hag_workshop_app.dto;

import exe_hag_workshop_app.entity.Enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private int userId;
    private String userName;
    private double totalAmount;
    private OrderStatus status;
    private Date orderDate;
    private Date updateDate;
    private String shippingAddress;
    private String phoneNumber;
    private List<OrderDetailDTO> orderDetails;
}

