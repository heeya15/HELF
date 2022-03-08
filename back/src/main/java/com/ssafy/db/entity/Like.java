package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

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
    User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="board_no")
    ShareBoard shareBoard;
}
