package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkshopDTO {
    private int workshopId;
    private String workshopTitle;
    private String description;
    private double price;
    private Date createAt;
    private Date updateAt;
    private String urlImage;
} 