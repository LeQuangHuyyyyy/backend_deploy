package exe_hag_workshop_app.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ProductRequest {

    private String productName;

    private String description;

    private double price;

    private int categoryId;

    List<ImageProductDTO> images;
    
}
