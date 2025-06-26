package exe_hag_workshop_app.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogRequest {
    private int blogId;
    private String title;
    private String content;
    private String imageUrl;
}
