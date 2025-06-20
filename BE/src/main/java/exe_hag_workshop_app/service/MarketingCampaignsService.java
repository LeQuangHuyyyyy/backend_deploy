package exe_hag_workshop_app.service;

import exe_hag_workshop_app.payload.MarketingCampaignsCategoryData;
import exe_hag_workshop_app.payload.MarketingCampaignsRequest;
import exe_hag_workshop_app.payload.MarketingCampaignsResponse;
import exe_hag_workshop_app.payload.ResponseData;


public interface MarketingCampaignsService {
    MarketingCampaignsResponse createMarketingCampaign(MarketingCampaignsRequest request);

    MarketingCampaignsResponse updateMarketingCampaign(int id, MarketingCampaignsRequest request);

    void deleteMarketingCampaign(int id);

    MarketingCampaignsResponse getMarketingCampaignById(int id);

    ResponseData getAllMarketingCampaigns();

    ResponseData getMarketingCampaignsByCategory(int categoryId);

    ResponseData getWorkshopsByCategories();

    ResponseData getAllCategories();

    ResponseData createCategory(MarketingCampaignsCategoryData categoryData);
}
