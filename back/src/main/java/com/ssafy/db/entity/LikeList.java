package com.ssafy.db.entity;

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
public class LikeList {
    @Id
    @Column(name = "like_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long likeNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="board_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    ShareBoard shareBoard;
}
