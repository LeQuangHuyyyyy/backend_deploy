package exe_hag_workshop_app.entity;


import exe_hag_workshop_app.entity.Enums.WorkshopCate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "workshops")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Workshops {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workshop_id")
    private int workshopId;

    @Column(name = "workshop_title")
    private String workshopTitle;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @Column(name = "price")
    private double price;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "url_image")
    private String urlImage;

    @Column(name = "user_access")
    private int userAccess;

    @Enumerated(EnumType.STRING)
    @Column(name = "category_name")
    private WorkshopCate workshopCategory;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE}, mappedBy = "workshop")
    private Set<OrderDetails> orderDetails;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Users instructor;

    @Column(name = "quantity_access", nullable = true)
    private long quantityAccess;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshop")
    private Set<Materials> materials;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshop")
    private Set<FeedBacks> feedBacks;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshop")
    private Set<WorkshopMarketingCampaign> workshopMarketingCampaigns;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshops")
    private Set<Schedule> schedules;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}, mappedBy = "workshop")
    private Set<Media> media;
}
