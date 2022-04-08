package com.aisher.helf.db.entity;

import com.aisher.helf.api.request.FoodRegisterReq;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Food {
    @Id
    @Column(name = "food_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int foodNo;

    @Column(name = "food_name", length = 100)
    String foodName;

    @Column(name = "kcal")
    int kcal;

    @Column(name = "carbohydrate", scale = 2)
    double carbohydrate;

    @Column(name = "protein", scale = 2)
    double protein;

    @Column(name = "fat", scale = 2)
    double fat;

    public void updateFood(FoodRegisterReq foodRegisterReq) {
        this.foodName = foodRegisterReq.getFoodName();
        this.kcal = foodRegisterReq.getKcal();
        this.carbohydrate = foodRegisterReq.getCarbohydrate();
        this.protein = foodRegisterReq.getProtein();
        this.fat = foodRegisterReq.getFat();
    }
}
