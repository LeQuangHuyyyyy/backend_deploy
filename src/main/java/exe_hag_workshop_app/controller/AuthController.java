package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.payload.LoginRequest;
import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.UserValidationException;
import exe_hag_workshop_app.payload.LoginResponse;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.UserService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    JwtTokenHelper jwtTokenHelpers;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @GetMapping
    public ResponseEntity<?> getAuth() throws Exception {
        return ResponseEntity.ok(userService.getAuth());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String jwt;
        try {
            Users users = userRepository.findByEmail(loginRequest.getEmail());
            if (users != null) {
                jwt = jwtTokenHelpers.generateToken(users);
                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setToken(jwt);
                return ResponseEntity.ok(loginResponse);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
        return null;
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<AuthResponse> oauth2Success() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        String token = jwtTokenHelper.generateToken(user);

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUserId(user.getUserId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            validateUser(userDTO);
            if (userRepository.findByEmail(userDTO.getEmail()) != null) {
                throw new UserValidationException("Username is already taken");
            }

            Users user = new Users();
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setEmail(userDTO.getEmail());
            user.setPhoneNumber(userDTO.getPhone());
            user.setRole(Roles.USER);
            user.setActive(true);
            userRepository.save(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (UserValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }

    private void validateUser(UserDTO userDTO) throws UserValidationException {
        if (userDTO.getFirstName().trim().isEmpty() || userDTO.getLastName().trim().isEmpty()) {
            throw new UserValidationException("Username cannot be empty");
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            throw new UserValidationException("Password cannot be empty");
        }
        if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()) {
            throw new UserValidationException("Email cannot be empty");
        }
        if (!userDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new UserValidationException("Invalid email format");
        }
        if (userDTO.getPassword().length() < 8) {
            throw new UserValidationException("Password must be at least 8 characters long");
        }
        if (userDTO.getPhone() != null && !userDTO.getPhone().matches("^\\d{10}$")) {
            throw new UserValidationException("Invalid phone number format");
        }
    }
}