package exe_hag_workshop_app.entity;


import exe_hag_workshop_app.entity.Enums.Roles;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "is_active")
    private boolean isActive;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Roles role;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "createBy")
    private Set<SocialMedia> socialMedia;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "userComment")
    private Set<Comment> comment;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "user")
    private Set<DiscountUser> discountUsers;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "createdBy")
    private Set<Blogs> blogs;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "user")
    private Set<Orders> orders;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH
    }, mappedBy = "instructor")
    private Set<Workshops> workshops;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH
    }, mappedBy = "createBy")
    private Set<Products> products;

    @OneToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, mappedBy = "user")
    private Set<Cart> carts;

    @Column(name = "picture")
    private String picture;

    public Users(int userId) {
        this.userId = userId;
    }
}

