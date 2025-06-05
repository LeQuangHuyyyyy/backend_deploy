package exe_hag_workshop_app.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "marketing_campaigns")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MarketingCampaigns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaign_id")
    private int campaignId;

    @Column(name = "campaign_name")
    private String campaignName;

    @Column(name = "detail")
    private String detail;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private MarketingCampaignCategory marketingCampaignCategory;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH
    }, mappedBy = "marketingCampaigns")
    private Set<WorkshopMarketingCampaign> workshopMarketingCampaigns;


}
