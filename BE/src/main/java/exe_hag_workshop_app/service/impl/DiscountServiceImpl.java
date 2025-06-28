package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.entity.Discounts;
import exe_hag_workshop_app.payload.DiscountRequest;
import exe_hag_workshop_app.payload.DiscountResponse;
import exe_hag_workshop_app.repository.DiscountRepository;
import exe_hag_workshop_app.service.DiscountService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepository;


    @Override
    public DiscountResponse createDiscount(DiscountRequest discountRequest) {
        Discounts discount = new Discounts();
        BeanUtils.copyProperties(discountRequest, discount);
        Discounts savedDiscount = discountRepository.save(discount);
        DiscountResponse response = new DiscountResponse();
        BeanUtils.copyProperties(savedDiscount, response);

        return response;
    }

    @Override
    public DiscountResponse updateDiscount(DiscountRequest discountRequest, int discountId) {
        Discounts existingDiscount = discountRepository.findById(discountId).orElseThrow(() -> new RuntimeException("Discount not found"));
        BeanUtils.copyProperties(discountRequest, existingDiscount);
        Discounts updatedDiscount = discountRepository.save(existingDiscount);
        DiscountResponse response = new DiscountResponse();
        BeanUtils.copyProperties(updatedDiscount, response);
        return response;
    }

    @Override
    public void deleteDiscount(int discountId) {
        discountRepository.deleteById(discountId);
    }

    @Override
    public DiscountResponse getDiscountById(int discountId) {
        Discounts discounts = discountRepository.findById(discountId).orElseThrow(() -> new RuntimeException("Discount not found"));
        DiscountResponse response = new DiscountResponse();
        BeanUtils.copyProperties(discounts, response);
        return response;
    }

    @Override
    public List<DiscountResponse> getAllDiscounts() {
        List<Discounts> discountsList = discountRepository.findAll();
        return discountsList.stream().map(discount -> {
            DiscountResponse response = new DiscountResponse();
            BeanUtils.copyProperties(discount, response);
            return response;
        }).toList();
    }



}
