package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.MarketingCampaignCategory;
import exe_hag_workshop_app.entity.MarketingCampaigns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketingCampaignsRepository extends JpaRepository<MarketingCampaigns, Integer> {

    List<MarketingCampaigns> findByMarketingCampaignCategory_CategoryId(int categoryId);

    @Query("SELECT DISTINCT mc FROM MarketingCampaigns mc " +
           "LEFT JOIN FETCH mc.workshopMarketingCampaigns wmc " +
           "LEFT JOIN FETCH wmc.workshop w " +
           "LEFT JOIN FETCH w.instructor " +
           "LEFT JOIN FETCH w.schedules " +
           "WHERE mc.marketingCampaignCategory.categoryId = :categoryId")
    List<MarketingCampaigns> findCampaignsWithWorkshopsByCategoryId(@Param("categoryId") int categoryId);
}
