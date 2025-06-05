package exe_hag_workshop_app.payload;

import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MarketingCampaignsRequest {
    private String campaignName;

    private String detail;

    private int categoryId;

    private int workshopId;

    private Date startDate;

    private Date endDate;
}
