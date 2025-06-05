package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.MarketingCampaignCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MarketingCampaignsCategoryRepository extends JpaRepository<MarketingCampaignCategory, Integer> {
}
