package exe_hag_workshop_app.payload;

import exe_hag_workshop_app.entity.FeedBacks;
import exe_hag_workshop_app.entity.ImageProduct;
import exe_hag_workshop_app.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private int productId;

    private String productName;

    private String description;

    private double price;

    private String nameCreateBy;

    private String categoryName;

    List<ImageProductDTO> images;

}
