package com.aisher.helf.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table
public class ShareBoard {
    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long boardNo;

    @Column(length = 1500, name = "description")
    String description;  // 식단 공유시 쓴 내용

    @Column(name = "hit", nullable = false)
    @ColumnDefault("0")
    int hit; // 조회수

    @Column(name = "created_at",columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDateTime createdAt; // 등록일

    @JsonIgnore
    @OneToMany(mappedBy = "shareboard", fetch = FetchType.EAGER)
    List<Comment> replies;

    //식단 일지 번호
    @OneToOne
    @JoinColumn(name = "diary_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    FoodDiary diaryNo;
}
