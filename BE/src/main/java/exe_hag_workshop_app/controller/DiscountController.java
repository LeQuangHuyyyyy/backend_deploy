package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.payload.DiscountRequest;
import exe_hag_workshop_app.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {
    @Autowired
    private DiscountService discountService;

    @PostMapping("/create-discount")
    public ResponseEntity<?> createDiscount(@RequestBody DiscountRequest discountRequest) {
        return ResponseEntity.ok(discountService.createDiscount(discountRequest));
    }

    @GetMapping("/get-all-discounts")
    public ResponseEntity<?> getAllDiscounts() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @GetMapping("/{discountId}")
    public ResponseEntity<?> getDiscountById(@PathVariable int discountId) {
        return ResponseEntity.ok(discountService.getDiscountById(discountId));
    }

    @PutMapping("/update-discount/{discountId}")
    public ResponseEntity<?> updateDiscount(@PathVariable int discountId, @RequestBody DiscountRequest discountRequest) {
        return ResponseEntity.ok(discountService.updateDiscount(discountRequest, discountId));
    }

    @DeleteMapping("/delete-discount/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable int discountId) {
        discountService.deleteDiscount(discountId);
        return ResponseEntity.ok("Discount deleted successfully");
    }

}
