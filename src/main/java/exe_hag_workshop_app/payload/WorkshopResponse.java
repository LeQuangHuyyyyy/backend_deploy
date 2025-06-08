package exe_hag_workshop_app.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkshopResponse {
    private String workshopTitle;
    private String description;
    private double price;
    private Date createAt;
    private Date updateAt;
    private String urlImage;
    private String userAccess;

    private Set<ScheduleRequest> schedules;
    private String createBy;

}
