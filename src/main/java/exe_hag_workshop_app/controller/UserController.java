package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.UserValidationException;
import exe_hag_workshop_app.payload.UpdateUserRequest;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.UserService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> updateCurrentUser(@RequestBody UpdateUserRequest request) {
        int userId = jwtTokenHelper.getUserIdFromToken();
        UserDTO dto = userService.updateUserInfo(userId, request);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> getCurrentUser() {
        int userId = jwtTokenHelper.getUserIdFromToken();
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhoneNumber());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setPicture(user.getPicture());
        return ResponseEntity.ok(dto);
    }
}
