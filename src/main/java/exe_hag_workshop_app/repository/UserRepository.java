package exe_hag_workshop_app.repository;

import exe_hag_workshop_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}
