package exe_hag_workshop_app.dto;

import lombok.Data;

@Data
public class CommentsRequest {
    private String commentText;
    private Integer blogId;
} 