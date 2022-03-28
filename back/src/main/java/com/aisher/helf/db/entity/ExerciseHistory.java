package com.aisher.helf.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseHistory {
    @Id
    @Column(name = "history_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long historyNo;

    @Column(name = "exercise_count")
    Long exerciseCount;

    @Column(name = "exercise_date", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDateTime exerciseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="exercise_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Exercise exercise;
}
