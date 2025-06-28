package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.payload.UpdateRoleRequest;
import exe_hag_workshop_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    UserService userService;

    @PutMapping("/role")
    public ResponseEntity<UserDTO> updateUserRole(@RequestBody UpdateRoleRequest request) {
        UserDTO dto = userService.updateUserRole(request.getEmail(), request.getRole());
        return ResponseEntity.ok(dto);
    }
}
