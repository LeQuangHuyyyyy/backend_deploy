package exe_hag_workshop_app.dto;

import lombok.Data;
import java.util.Date;

@Data
public class CommentsResponse {
    private Integer commentId;
    private String commentText;
    private String authorName;
    private Date dateCreated;
    private Integer blogId;
    private String blogTitle;
} 