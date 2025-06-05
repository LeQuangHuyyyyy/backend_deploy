package exe_hag_workshop_app.entity;


import exe_hag_workshop_app.entity.Enums.ReactionsType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reactions")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reaction_id")
    private int reactionId;

    @Column(name = "reaction_type")
    @Enumerated(EnumType.STRING)
    private ReactionsType reactionType;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private SocialPost socialPost;


}
