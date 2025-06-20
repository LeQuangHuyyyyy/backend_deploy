package exe_hag_workshop_app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "workshop_marketing_campaigns")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WorkshopMarketingCampaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "workshop_id")
    private Workshops workshop;

    @ManyToOne
    @JoinColumn(name = "marketing_campaign_id")
    private MarketingCampaigns marketingCampaigns;
}
