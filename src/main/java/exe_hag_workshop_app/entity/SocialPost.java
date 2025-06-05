package exe_hag_workshop_app.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "social_post")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SocialPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;

    @Column(name = "post_title")
    private String postTitle;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "status")
    private boolean status;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "socialPost")
    private Set<Reactions> reactions;

    @ManyToOne
    @JoinColumn(name = "social_media_id")
    private SocialMedia socialMedia;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "socialPost")
    private Set<Comment> comment;

}
