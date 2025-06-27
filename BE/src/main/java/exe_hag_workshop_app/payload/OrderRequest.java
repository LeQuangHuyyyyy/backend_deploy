package exe_hag_workshop_app.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderRequest {
    private double totalAmount;
    private String shippingAddress;
    private String phoneNumber;

    private String customerName; // Tên người đặt hàng - cần thiết để giao hàng
    private String customerEmail; // Email để gửi thông tin đơn hàng
    private String note;

    private int orderId; // Mã đơn hàng

    private List<ProductInCartRequest> productInCartRequests;
}
