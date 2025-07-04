package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.payload.UpdateUserRequest;
import exe_hag_workshop_app.exception.UserValidationException;
import exe_hag_workshop_app.payload.WorkshopResponse;

import java.util.List;

public interface UserService {
    AuthResponse getAuth() throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws exe_hag_workshop_app.exception.UserValidationException;

    UserDTO updateUserInfo(int userId, UpdateUserRequest request) throws UserValidationException;

    UserDTO updateUserRole(String email, Roles role) throws UserValidationException;

    UserDTO getUserById(int userId);


    List<WorkshopResponse> getOrdersWorkShopByUserId();
}
