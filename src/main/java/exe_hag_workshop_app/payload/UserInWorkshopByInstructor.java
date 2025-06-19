package exe_hag_workshop_app.payload;

import exe_hag_workshop_app.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInWorkshopByInstructor {
    private String workshopName;
    private List<UserDTO> users;
}
