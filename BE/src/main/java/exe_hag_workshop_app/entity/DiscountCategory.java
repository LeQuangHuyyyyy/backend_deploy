package exe_hag_workshop_app.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "discount_category")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiscountCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_category_id")
    private int discountCategoryId;

    @Column(name = "discount_category_name")
    private String discountCategoryName;

    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Discounts discounts;
}
