package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.AuthResponse;

public interface UserService {
    AuthResponse getAuth() throws Exception;
}
