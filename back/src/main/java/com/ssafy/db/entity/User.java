package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Data
public class User extends BaseEntity{
    @Id
    @Column(name = "user_id", length= 20,  nullable = false)
    String userId;

    @Column(name = "user_password", length= 200, nullable = false)
    String userPassword;

    @Column(name = "user_name", length= 20, nullable = false)
    String userName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @Temporal(TemporalType.DATE)
    @Column(name = "birthday")
    LocalDate birthday;

    @Email
    @Column(length = 100, nullable = false)
    String userEmail;

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime joinDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "user") //참조를 당하는 쪽에서 읽기만 가능!
    @Builder.Default
    List<Like> likeList = new LinkedList<>();
}
