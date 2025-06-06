package exe_hag_workshop_app.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "workshop_categories")
public class WorkshopCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    @Column(name = "category_name")
    @Enumerated(EnumType.STRING)
    private exe_hag_workshop_app.entity.Enums.WorkshopCategory categoryName;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshopCategory")
    private Set<Workshops> workshops;
}
