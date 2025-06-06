package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.AuthResponse;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final JwtTokenHelper helper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oauth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Tìm user trong database
        Users existingUser = userRepository.findByEmail(email);
        Users user = null;

        if (existingUser == null) {
            user = new Users();
            user.setEmail(email);
            user.setRole(Roles.USER);
            user = userRepository.save(user);
        } else {
            user = existingUser;
        }

        if (user != null) {
            helper.generateToken(user);
        }

        String role = user != null ? user.getRole().name() : Roles.USER.name();
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role)), attributes, "email");
    }
} 