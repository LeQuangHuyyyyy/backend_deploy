package exe_hag_workshop_app.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private boolean isAnswer;
    private int commentAnswer;
    private int socialPostId;
    private int userId;
} 