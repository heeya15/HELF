package com.aisher.helf.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Diet {
    @Id
    @Column(name = "diet_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int dietNo;

    @Column(name = "weight")
    @ColumnDefault("100")
    int weight;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DietDiary diaryNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Food foodNo;

}
