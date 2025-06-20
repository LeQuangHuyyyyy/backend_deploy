package exe_hag_workshop_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import exe_hag_workshop_app.payload.LoginRequest;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.service.PasswordResetService;
import exe_hag_workshop_app.service.UserService;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtTokenHelper jwtTokenHelper;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private UserService userService;
    @MockBean
    private PasswordResetService passwordResetService;

    @Test
    void loginSuccess() throws Exception {
        LoginRequest request = new LoginRequest("user@example.com", "password");
        Users user = new Users();
        user.setPassword("hashed");

        when(userRepository.findByEmail("user@example.com")).thenReturn(user);
        when(passwordEncoder.matches("password", "hashed")).thenReturn(true);
        when(jwtTokenHelper.generateToken(user)).thenReturn("jwt-token");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"));
    }

    @Test
    void loginFailure() throws Exception {
        LoginRequest request = new LoginRequest("user@example.com", "wrong");
        Users user = new Users();
        user.setPassword("hashed");

        when(userRepository.findByEmail("user@example.com")).thenReturn(user);
        when(passwordEncoder.matches("wrong", "hashed")).thenReturn(false);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }
}
