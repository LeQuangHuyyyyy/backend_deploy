package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.PasswordResetToken;
import exe_hag_workshop_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByToken(String token);

    void deleteByUser(Users user);
}
