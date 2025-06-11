package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.payload.MarketingCampaignsCategoryData;
import exe_hag_workshop_app.payload.MarketingCampaignsRequest;
import exe_hag_workshop_app.payload.MarketingCampaignsResponse;
import exe_hag_workshop_app.payload.ResponseData;
import exe_hag_workshop_app.service.MarketingCampaignsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marketing-campaigns")
@CrossOrigin(origins = "*")
public class MarketingCampaignsController {

    @Autowired
    private MarketingCampaignsService marketingCampaignsService;

    @PostMapping
    public ResponseEntity<MarketingCampaignsResponse> createCampaign(@RequestBody MarketingCampaignsRequest request) {
        return ResponseEntity.ok(marketingCampaignsService.createMarketingCampaign(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarketingCampaignsResponse> updateCampaign(@PathVariable int id, @RequestBody MarketingCampaignsRequest request) {
        return ResponseEntity.ok(marketingCampaignsService.updateMarketingCampaign(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable int id) {
        marketingCampaignsService.deleteMarketingCampaign(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarketingCampaignsResponse> getCampaignById(@PathVariable int id) {
        return ResponseEntity.ok(marketingCampaignsService.getMarketingCampaignById(id));
    }

    @GetMapping
    public ResponseEntity<ResponseData> getAllCampaigns() {
        return ResponseEntity.ok(marketingCampaignsService.getAllMarketingCampaigns());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ResponseData> getCampaignsByCategory(@PathVariable int categoryId) {
        return ResponseEntity.ok(marketingCampaignsService.getMarketingCampaignsByCategory(categoryId));
    }

    @GetMapping("/workshops-by-categories")
    public ResponseEntity<ResponseData> getWorkshopsByCategories() {
        return ResponseEntity.ok(marketingCampaignsService.getWorkshopsByCategories());
    }

    @GetMapping("/categories")
    public ResponseEntity<ResponseData> getAllCategories() {
        return ResponseEntity.ok(marketingCampaignsService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody MarketingCampaignsCategoryData category) {
        marketingCampaignsService.createCategory(category);
        return ResponseEntity.ok().build();
        

    }
}