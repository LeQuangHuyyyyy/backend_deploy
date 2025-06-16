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
    private int workshopId;
    private String workshopTitle;
    private String description;
    private double price;
    private Date createAt;
    private String address;
    private Date updateAt;
    private String urlImage;
    private int userAccess;

    private Set<ScheduleRequest> schedules;
    private String createBy;

}
