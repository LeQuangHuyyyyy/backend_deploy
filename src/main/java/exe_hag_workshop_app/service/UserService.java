package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.payload.UpdateUserRequest;
import exe_hag_workshop_app.exception.UserValidationException;

public interface UserService {
    AuthResponse getAuth() throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws exe_hag_workshop_app.exception.UserValidationException;

    UserDTO updateUserInfo(int userId, UpdateUserRequest request) throws UserValidationException;
}
