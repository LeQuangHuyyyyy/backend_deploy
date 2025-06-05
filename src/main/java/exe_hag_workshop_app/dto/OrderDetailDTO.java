package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    private int productId;
    private String productName;
    private int workshopId;
    private String workshopTitle;
    private int quantity;
    private double unitPrice;
    private double subtotal;
}
