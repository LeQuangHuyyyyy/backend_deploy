package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.entity.Cart;
import exe_hag_workshop_app.payload.LoginRequest;
import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.exception.UserValidationException;
import exe_hag_workshop_app.payload.LoginResponse;
import exe_hag_workshop_app.payload.RegisterRequest;
import exe_hag_workshop_app.payload.ChangePasswordRequest;
import exe_hag_workshop_app.payload.ForgotPasswordRequest;
import exe_hag_workshop_app.payload.ResetPasswordRequest;
import exe_hag_workshop_app.repository.CartRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.UserService;
import exe_hag_workshop_app.service.PasswordResetService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
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
    PasswordResetService passwordResetService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    CartRepository cartRepository;

    @GetMapping
    public ResponseEntity<?> getAuth() throws Exception {
        return ResponseEntity.ok(userService.getAuth());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Users users = userRepository.findByEmail(loginRequest.getEmail());
            if (users != null && passwordEncoder.matches(loginRequest.getPassword(), users.getPassword())) {
                String jwt = jwtTokenHelpers.generateToken(users);
                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setToken(jwt);
                return ResponseEntity.ok(loginResponse);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
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
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            validateUser(request);
            if (userRepository.findByEmail(request.getEmail()) != null) {
                throw new UserValidationException("Username is already taken");
            }
            Cart cart = new Cart();

            Users user = new Users();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setPhoneNumber(request.getPhone());
            user.setRole(Roles.USER);
            user.setActive(true);
            userRepository.save(user);

            Users savedUser = user;
            cart.setUser(savedUser);
            cartRepository.save(cart);

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

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req) {
        int userId = jwtTokenHelper.getUserIdFromToken();
        userService.changePassword(userId, req.getCurrentPassword(), req.getNewPassword());
        return ResponseEntity.ok("Password updated");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        passwordResetService.generateResetToken(request.getEmail());
        return ResponseEntity.ok("Reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    private void validateUser(RegisterRequest request) throws UserValidationException {
        if (request.getFirstName().trim().isEmpty() || request.getLastName().trim().isEmpty()) {
            throw new UserValidationException("Username cannot be empty");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new UserValidationException("Password cannot be empty");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new UserValidationException("Email cannot be empty");
        }
        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new UserValidationException("Invalid email format");
        }
        if (request.getPassword().length() < 8) {
            throw new UserValidationException("Password must be at least 8 characters long");
        }
        if (request.getPhone() != null && !request.getPhone().matches("^\\d{10}$")) {
            throw new UserValidationException("Invalid phone number format");
        }
    }
}
