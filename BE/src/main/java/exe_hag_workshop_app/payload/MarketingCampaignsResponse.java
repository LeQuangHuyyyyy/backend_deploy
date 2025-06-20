package exe_hag_workshop_app.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarketingCampaignsResponse {
    private int campaignId;
    private String campaignName;
    private String detail;
    private Date startDate;
    private Date endDate;
    private int categoryId;
    private String categoryName;
}
