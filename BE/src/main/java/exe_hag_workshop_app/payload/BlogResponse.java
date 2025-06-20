package exe_hag_workshop_app.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class BlogResponse {
    private String title;
    private String content;
    private String imageUrl;
    private Date publishDate;
    private Date createdAt;
    private Date updatedAt;
    private String author;
    private long viewCount;
    private long likeCount;
}
