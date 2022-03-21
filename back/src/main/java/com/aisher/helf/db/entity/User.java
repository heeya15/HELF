package com.aisher.helf.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Data;
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
@Entity
public class User {
    @Id
    @Column(name = "user_id", length= 20,  nullable = false)
    String userId;

    @Column(name = "user_password", length= 200, nullable = false)
    String userPassword;

    @Column(name = "user_name", length= 20, nullable = false)
    String userName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
//  @Temporal(TemporalType.DATE)//자바8에서 지원하는 LocalDate, LocalDateTime을 사용할때는 생략 가능
    @Column(name = "birthday")
    LocalDate birthday;

    @Email
    @Column(name = "user_email",length = 100, nullable = false)
    String userEmail;

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime joinDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER) //참조를 당하는 쪽에서 읽기만 가능!
    List<LikeList> likeList ;

    public void updateUser(String user_name, String user_password) {
        this.userName = user_name;
        this.userPassword =user_password;
    }
}
