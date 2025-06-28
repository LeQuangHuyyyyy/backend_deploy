package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.dto.UserDTO;
import exe_hag_workshop_app.entity.OrderDetails;
import exe_hag_workshop_app.entity.Orders;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.exception.UserValidationException;
import exe_hag_workshop_app.payload.UpdateUserRequest;
import exe_hag_workshop_app.payload.WorkshopResponse;
import exe_hag_workshop_app.repository.OrderDetailRepository;
import exe_hag_workshop_app.repository.OrderRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImp implements exe_hag_workshop_app.service.UserService {
    @Value("${imagekit.privateKey}")
    private String privateKey;

    @Value("${imagekit.publicKey}")
    private String publicKey;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public AuthResponse getAuth() throws Exception {
        String token = UUID.randomUUID().toString();
        long expire = (System.currentTimeMillis() / 1000L) + 300; // hết hạn sau 5 phút

        String signature = generateSignature(token, String.valueOf(expire), privateKey);

        return new AuthResponse(token, signature, String.valueOf(expire), publicKey, null, null, null);
    }

    @Override
    public void changePassword(int userId, String currentPassword, String newPassword) throws UserValidationException {
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserValidationException("User not found");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new UserValidationException("Current password is incorrect");
        }

        if (newPassword == null || newPassword.length() < 8) {
            throw new UserValidationException("Password must be at least 8 characters long");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public UserDTO updateUserInfo(int userId, UpdateUserRequest request) throws UserValidationException {
        Users user = userRepository.findById(userId).orElseThrow(() -> new UserValidationException("User not found"));

        if (request.getFirstName() != null) {
            if (request.getFirstName().trim().isEmpty()) {
                throw new UserValidationException("First name cannot be empty");
            }
            user.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            if (request.getLastName().trim().isEmpty()) {
                throw new UserValidationException("Last name cannot be empty");
            }
            user.setLastName(request.getLastName());
        }

        if (request.getPhone() != null) {
            if (!request.getPhone().matches("^\\d{10}$")) {
                throw new UserValidationException("Invalid phone number format");
            }
            user.setPhoneNumber(request.getPhone());
        }

        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }

        userRepository.save(user);

        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhoneNumber());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setAvatarUrl(user.getAvatar());
        return dto;
    }

    @Override
    public UserDTO updateUserRole(String email, Roles role) throws UserValidationException {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserValidationException("User not found");
        }
        user.setRole(role);
        userRepository.save(user);

        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhoneNumber());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        return dto;
    }

    @Override
    public UserDTO getUserById(int userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new UserValidationException("User not found"));

        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhoneNumber());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        return dto;
    }

    @Override
    public List<WorkshopResponse> getOrdersWorkShopByUserId() {
        Users user = userRepository.findById(jwtTokenHelper.getUserIdFromToken())
                .orElseThrow(() -> new UserValidationException("User not found"));

        List<Orders> getMyOrders = orderRepository.findByUser_UserId(user.getUserId());
        return null;
    }

    private String generateSignature(String token, String expire, String secret) throws Exception {
        String data = token + expire;
        Mac sha1_HMAC = Mac.getInstance("HmacSHA1");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA1");
        sha1_HMAC.init(secret_key);

        byte[] rawHmac = sha1_HMAC.doFinal(data.getBytes());
        return bytesToHex(rawHmac);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}
