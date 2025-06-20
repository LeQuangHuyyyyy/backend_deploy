package exe_hag_workshop_app.payload;

import exe_hag_workshop_app.entity.Products;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageProductDTO {
    private String imageUrl;
}
