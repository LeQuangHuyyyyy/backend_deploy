package exe_hag_workshop_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String signature;
    private String expire;
    private String publicKey;
    private Integer userId;
    private String email;
    private String role;
}
