package exe_hag_workshop_app.service;

public interface PasswordResetService {
    void generateResetToken(String email);

    void resetPassword(String token, String newPassword);
}
