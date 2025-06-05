package exe_hag_workshop_app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comment")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "is_answer")
    private boolean isAnswer;

    @Column(name = "comment_answer")
    private int commentAnswer;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private SocialPost socialPost;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users userComment;
}
