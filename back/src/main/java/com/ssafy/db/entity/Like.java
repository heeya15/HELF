package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

/**
 * 좋아요 모델 정의.
 */
@Entity
@Data
@Builder
public class Like extends BaseEntity{
    @Column(name = "like_no",  nullable = false)
    int likeNo;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="board_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    ShareBoard shareBoard;
}
