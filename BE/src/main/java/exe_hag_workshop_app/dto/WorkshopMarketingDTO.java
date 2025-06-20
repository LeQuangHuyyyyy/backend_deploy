package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkshopMarketingDTO {
    private int workshopId;
    private String workshopTitle;
    private double discountPercentage;
    private String promotionCode;
}