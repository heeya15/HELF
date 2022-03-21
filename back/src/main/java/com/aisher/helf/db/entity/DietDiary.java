package com.aisher.helf.db.entity;

import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DietDiary {
    @Id
    @Column(name = "diary_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int diaryNo;

    @Column(name = "diary_date", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDateTime diaryDate;

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
    private User userId;

    public void updateDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq) {
        // String 형태로 받은 날짜 데이터를 LocalDateTime으로 변경한 뒤, DB에 저장
        LocalDateTime diaryDate = LocalDateTime.parse(dietDiaryRegisterReq.getDiaryDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        this.diaryDate = diaryDate;
        this.mealTime = dietDiaryRegisterReq.getMealTime();
        //this.imagePath = dietDiaryRegisterReq.getImagePath();
        this.isShared = dietDiaryRegisterReq.getIsShared();
        this.description = dietDiaryRegisterReq.getDescription();
    }
}
