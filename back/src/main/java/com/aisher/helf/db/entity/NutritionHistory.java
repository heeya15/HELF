package com.aisher.helf.db.entity;

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
public class NutritionHistory {
    @EmbeddedId
    NutritionHistoryId nutritionHistoryId;

    @Column(name = "carbohydrate", scale = 2)
    double carbohydrate;

    @Column(name = "protein", scale = 2)
    double protein;

    @Column(name = "fat", scale = 2)
    double fat;
}
