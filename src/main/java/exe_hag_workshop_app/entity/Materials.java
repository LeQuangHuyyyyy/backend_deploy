package exe_hag_workshop_app.entity;

import exe_hag_workshop_app.entity.Enums.MaterialsType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "materials")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Materials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_id")
    private int material_id;

    @Column(name = "material_title")
    private String material_title;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private MaterialsType type;

    @Column(name = "link")
    private String link;

    @ManyToOne
    @JoinColumn(name = "workshop_id")
    private Workshops workshop;
}
