package exe_hag_workshop_app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import vn.payos.PayOS;

@SpringBootApplication
@Configuration
public class ExeHagWorkshopAppApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(ExeHagWorkshopAppApplication.class, args);
    }

    @Value("${PAYOS_CLIENT_ID}")
    private String clientId = "da0dea87-5d0c-41ba-9daa-3be9fbb9be36";

    @Value("${PAYOS_API_KEY}")
    private String apiKey = "fa8cf150-b742-409c-b87b-89cecda0b83b";

    @Value("${PAYOS_CHECKSUM_KEY}")
    private String checksumKey = "25b5e97d33c1b7ac47bdf933b9834272685b0630962016a2265cb4b8f461d2a2";

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600); // Max age of the CORS pre-flight request
    }

    @Bean
    public PayOS payOS() {
        return new PayOS(clientId, apiKey, checksumKey);
    }

}
