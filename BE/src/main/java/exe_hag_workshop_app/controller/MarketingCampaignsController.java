package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.payload.MarketingCampaignsCategoryData;
import exe_hag_workshop_app.payload.MarketingCampaignsRequest;
import exe_hag_workshop_app.payload.MarketingCampaignsResponse;
import exe_hag_workshop_app.payload.ResponseData;
import exe_hag_workshop_app.service.MarketingCampaignsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketing-campaigns")
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

    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<ResponseData> getCampaignsByCategory(@PathVariable int categoryId) {
        return ResponseEntity.ok(marketingCampaignsService.getMarketingCampaignsByCategory(categoryId));
    }

    @GetMapping("/by-instructor/{instructorId}")
    public ResponseEntity<ResponseData> getCampaignsByInstructor(@PathVariable int instructorId) {
        List<MarketingCampaignsResponse> campaigns = marketingCampaignsService.getMarketingCampaignsByInstructors(instructorId);
        ResponseData responseData = new ResponseData();
        responseData.setStatus(200);
        responseData.setDescription("Success");
        responseData.setData(campaigns);
        return ResponseEntity.ok(responseData);
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

    @GetMapping("/by-media/{mediaId}")
    public ResponseEntity<ResponseData> getMarketingCampaignByMediaId(@PathVariable int mediaId) {
        List<MarketingCampaignsResponse> campaigns = marketingCampaignsService.getMarketingCampaignByMediaId(mediaId);
        ResponseData responseData = new ResponseData();
        responseData.setStatus(200);
        responseData.setDescription("Success");
        responseData.setData(campaigns);
        return ResponseEntity.ok(responseData);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateMarketingCampaignStatus(@PathVariable int id, @RequestParam String status) {
        marketingCampaignsService.updateMarketingCampaignStatus(id);
        return ResponseEntity.ok().build();
    }
}