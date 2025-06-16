package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private int cartItemId;
    private int quantity;
    private double price;
    private Integer productId;
    private String productName;
    private String productImage;
    private Integer workshopId;
    private String workshopTitle;
}