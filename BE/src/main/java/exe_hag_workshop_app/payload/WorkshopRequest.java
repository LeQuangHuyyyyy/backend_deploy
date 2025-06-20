package exe_hag_workshop_app.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkshopRequest {
    private String workshopTitle;
    private String description;
    private double price;
    private String urlImage;
    private String address;
    private String category;
    private Set<ScheduleRequest> schedules;
}
