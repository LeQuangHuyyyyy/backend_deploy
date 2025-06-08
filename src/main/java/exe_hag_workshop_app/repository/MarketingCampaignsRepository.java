package exe_hag_workshop_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketingCampaignsRepository extends JpaRepository<MarketingCampaignsRepository, Integer> {
}
