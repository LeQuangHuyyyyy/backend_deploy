package exe_hag_workshop_app.payload;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiscountRequest {

    private String discountCode;

    private String description;

    private Date startDate;

    private Date endDate;

    private int discountPercentage;

    private int quantity;

}
