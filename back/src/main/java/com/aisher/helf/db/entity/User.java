package com.aisher.helf.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Data
@Setter
@Getter
@Entity
public class User {
    @Id
    @Column(name = "user_id", length= 20,  nullable = false)
    String userId;

    @Column(name = "user_password", length= 200, nullable = false)
    String userPassword;

    @Column(name = "user_name", length= 20, nullable = false)
    String userName;

    @Email
    @Column(name = "user_email",length = 100, nullable = false)
    String userEmail;

    @Column(name = "weight")
    @ColumnDefault("0")
    int weight;

    @Column(name = "height")
    @ColumnDefault("0")
    int height;

    @Column(name = "gender")
    @ColumnDefault("0")
    boolean gender;

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime joinDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER) //참조를 당하는 쪽에서 읽기만 가능!
    List<LikeList> likeList ;

    public void updateUser(String userName, String userPassword) {
        this.userName = userName;
        this.userPassword =userPassword;
    }

    public void updateAdditionalUserInfo(int weight, int height, boolean gender) {
        this.weight = weight;
        this.height = height;
        this.gender = gender;
    }
}
