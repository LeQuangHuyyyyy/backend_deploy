package exe_hag_workshop_app.service;

import exe_hag_workshop_app.payload.DiscountRequest;
import exe_hag_workshop_app.payload.DiscountResponse;

import java.util.List;

public interface DiscountService {
    DiscountResponse createDiscount(DiscountRequest discountRequest);

    DiscountResponse updateDiscount(DiscountRequest discountRequest, int discountId);

    void deleteDiscount(int discountId);

    DiscountResponse getDiscountById(int discountId);

    List<DiscountResponse> getAllDiscounts();
}
