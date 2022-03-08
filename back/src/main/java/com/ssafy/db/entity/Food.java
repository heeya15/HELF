package com.ssafy.db.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Food {
    @Id
    @Column(name = "food_name", length = 100)
    String foodName;

    @Column(name = "kcal")
    int kcal;

    @Column(name = "carbohydrate")
    Double carbohydrate;

    @Column(name = "protein")
    Double protein;

    @Column(name = "fat")
    Double fat;

}
