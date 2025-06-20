package exe_hag_workshop_app.entity;

import exe_hag_workshop_app.entity.Enums.FeedbackType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "feedbacks")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FeedBacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private int feedbackId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "rating")
    private int rating;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private FeedbackType type;

    @ManyToOne
    @JoinColumn(name = "workshop_id")
    private Workshops workshop;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products product;
}
