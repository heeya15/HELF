package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class FoodDiary {
    @Id
    @Column(name = "diary_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int diaryNo;

    @Column(name = "diary_date", columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDateTime userStartTime;

    @Column(name = "meal_time", length = 20, nullable = false)
    String mealTime;

    @Column(name = "image_path", length = 300)
    String imagePath;

    @Column(name = "is_shared")
    @ColumnDefault("0")
    Boolean isShared;

    @Column(name = "description", length = 1000)
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
}
