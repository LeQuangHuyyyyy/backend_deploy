package exe_hag_workshop_app.config.security;

import exe_hag_workshop_app.service.impl.CustomOAuth2UserService;
import exe_hag_workshop_app.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class CustomFilterSecurity {

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    private final JwtCustom jwtCustom;
    private final CustomUserDetailsService userDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    public CustomFilterSecurity(JwtCustom jwtCustom, CustomUserDetailsService userDetailsService, CustomOAuth2UserService customOAuth2UserService) {
        this.jwtCustom = jwtCustom;
        this.userDetailsService = userDetailsService;
        this.customOAuth2UserService = customOAuth2UserService;
    }

    public static final String[] PUBLIC_URLS = {
            "/api/auth/login",
            "/api/auth/**",
            "/api/auth/register",
            "/api/auth/forgot-password",
            "/api/auth/reset-password",
            "/api/auth/google-login-url",
            "/swagger-ui/**",
            "/api-docs/**",
            "/v3/api-docs/**",
            "/oauth2/**",
            "/login/oauth2/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("Allowed Origins: " + Arrays.toString(allowedOrigins));
        http.cors(cors -> cors.configurationSource(corsConfigurationSource())).sessionManagement(
                        session ->
                                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(PUBLIC_URLS).permitAll()
                                .requestMatchers(HttpMethod.GET, "/**").permitAll()


                                .anyRequest().permitAll())
                .oauth2Login(oauth2 ->
                        oauth2.authorizationEndpoint(authorization ->
                                        authorization.baseUri("/oauth2/authorization"))

                                .redirectionEndpoint(redirection ->
                                        redirection.baseUri("/login/oauth2/code/*"))

                                .userInfoEndpoint(userInfo ->
                                        userInfo.userService(customOAuth2UserService))

                                .defaultSuccessUrl("/api/auth/oauth2/success", true))
                .addFilterBefore(jwtCustom, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        if (allowedOrigins == null || allowedOrigins.length == 0) {
            allowedOrigins = new String[]{"http://localhost:5173", "http://localhost:8080", "https://exe-fe-flax.vercel.app", "https://hagworkshop.site", "http://34.96.206.251:8080"};
        }
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
