package com.ssafy.db.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
public class Diet {
    @Id
    @Column(name = "diet_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int dietNo;

    @Column(name = "weight")
    @ColumnDefault("100")
    int weight;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "history_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FoodDiary foodDiary;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_name")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Food foodName;

}
