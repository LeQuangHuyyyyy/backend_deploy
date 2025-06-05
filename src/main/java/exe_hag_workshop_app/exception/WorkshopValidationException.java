package exe_hag_workshop_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WorkshopValidationException extends RuntimeException {
    public WorkshopValidationException(String message) {
        super(message);
    }
} 