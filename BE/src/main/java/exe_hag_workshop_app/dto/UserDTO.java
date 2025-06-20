package exe_hag_workshop_app.dto;

import exe_hag_workshop_app.entity.Enums.Roles;
import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String password;
    private Roles role;
    private Boolean active;
    private String avatarUrl;
    private String locale;
}