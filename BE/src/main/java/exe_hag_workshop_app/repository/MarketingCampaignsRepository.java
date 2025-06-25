package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.MarketingCampaigns;
import exe_hag_workshop_app.entity.Media;
import exe_hag_workshop_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketingCampaignsRepository extends JpaRepository<MarketingCampaigns, Integer> {
    List<MarketingCampaigns> findByWorkshopMarketingCampaigns_Workshop_Instructor(Users instructor);

    List<MarketingCampaigns> findByMarketingCampaignCategory_CategoryId(int categoryId);

    List<MarketingCampaigns> findByWorkshopMarketingCampaigns_Workshop_Media(Media media);


}
