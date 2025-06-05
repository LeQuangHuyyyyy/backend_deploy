package exe_hag_workshop_app.dto;

import exe_hag_workshop_app.entity.FeedBacks;
import exe_hag_workshop_app.entity.ProductCategory;
import exe_hag_workshop_app.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDTO {
    private String productName;

    private String description;

    private double price;

    private String categoryName;
}
