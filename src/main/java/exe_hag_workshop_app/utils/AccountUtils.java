package exe_hag_workshop_app.utils;

import exe_hag_workshop_app.entity.Users;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AccountUtils {
    public Users getCurrentAccount() {
        return (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
