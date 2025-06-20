package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.entity.PasswordResetToken;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.repository.PasswordResetTokenRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.frontend.url:http://localhost:5173}") // cần thì thay cái này
    private String frontEndUrl;


    @Override
    public void generateResetToken(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return;
        }

        if (!user.getEmail().equals(email)) {
            return;
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();

        for (PasswordResetToken existingToken : tokenRepository.findAll()) {
            if (existingToken.getUser().equals(user)) {
                tokenRepository.delete(existingToken);
            }
        }
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(new Date(System.currentTimeMillis() + 3600_000));
        tokenRepository.save(resetToken);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset");

        String resetUrl = frontEndUrl + "/reset-password";

        String text = String.format(
                "Xin chào %s,\n\n" +
                        "Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n" +
                        "Mã đặt lại mật khẩu của bạn là: \n\n %s \n\n" +
                        "Vui lòng nhấn vào liên kết dưới đây để tiến hành đặt lại mật khẩu:\n\n" +
                        "%s\n\n" +
                        "Lưu ý: Liên kết này sẽ hết hạn sau 1 giờ kể từ thời điểm yêu cầu.\n\n" +
                        "Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Tài khoản của bạn sẽ không bị ảnh hưởng.\n\n" +
                        "Trân trọng,\n" +
                        "Đội ngũ hỗ trợ hệ thống.",
                user.getFirstName() + " " + user.getLastName(), token, resetUrl
        );


        message.setText(text);
        mailSender.send(message);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null) {
            return;
        }
        if (resetToken.getExpiryDate().before(new Date())) {
            tokenRepository.delete(resetToken);
            return;
        }
        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }
}
