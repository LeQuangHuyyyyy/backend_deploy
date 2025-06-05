package exe_hag_workshop_app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "social_media")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SocialMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "social_media_id")
    private int socialMediaId;

    @Column(name = "social_media_name")
    private String socialMediaName;

    @Column(name = "number_of_followers")
    private Long numberOfFollowers;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "create_by")
    private Users createBy;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "socialMedia")
    private Set<SocialPost> socialPost;


}
