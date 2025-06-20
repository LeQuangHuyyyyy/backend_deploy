package exe_hag_workshop_app.payload;

import exe_hag_workshop_app.dto.UserDTO;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private UserDTO userInfo;
}