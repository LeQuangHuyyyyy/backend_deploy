package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.repository.DiscountRepository;
import exe_hag_workshop_app.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepository;


}
