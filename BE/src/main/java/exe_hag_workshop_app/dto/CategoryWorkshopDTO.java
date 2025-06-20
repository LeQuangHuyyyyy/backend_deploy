package exe_hag_workshop_app.dto;

import exe_hag_workshop_app.payload.WorkshopResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryWorkshopDTO {
    private int categoryId;
    private String categoryName;
    private List<WorkshopResponse> workshops;
} 