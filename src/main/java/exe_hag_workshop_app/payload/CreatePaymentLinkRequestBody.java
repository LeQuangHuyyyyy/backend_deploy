package exe_hag_workshop_app.payload;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentLinkRequestBody {
    private int orderId;
}
