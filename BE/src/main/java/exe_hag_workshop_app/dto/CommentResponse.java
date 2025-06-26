package exe_hag_workshop_app.dto;

import lombok.Data;

@Data
public class CommentResponse {
    private int commentId;
    private String content;
    private String createdAt;
    private boolean isAnswer;
    private int commentAnswer;
    private int socialPostId;
    private int userId;
    private String userName;
} 