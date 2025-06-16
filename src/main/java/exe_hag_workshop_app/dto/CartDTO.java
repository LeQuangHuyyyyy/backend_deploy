package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private int cartId;
    private Date createdAt;
    private Date updatedAt;
    private double totalAmount;
    private List<CartItemDTO> cartItems;
} 