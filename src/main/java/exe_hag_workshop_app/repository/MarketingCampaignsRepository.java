package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.MarketingCampaigns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketingCampaignsRepository extends JpaRepository<MarketingCampaigns, Integer> {
    List<MarketingCampaigns> findByMarketingCampaignCategory_CategoryId(int categoryId);



}
