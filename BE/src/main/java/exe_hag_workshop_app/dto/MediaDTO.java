package exe_hag_workshop_app.dto;

import exe_hag_workshop_app.entity.Workshops;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaDTO {

    private String videoUrl;

    private Integer workshopId;
} 