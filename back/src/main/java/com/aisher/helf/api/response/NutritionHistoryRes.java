package com.aisher.helf.api.response;

import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.entity.NutritionHistory;
import com.aisher.helf.db.entity.NutritionHistoryId;
import com.aisher.helf.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("NutritionHistoryRes")
public class NutritionHistoryRes {
    @ApiModelProperty(name = "날짜")
    private LocalDate createdAt;

    @ApiModelProperty(name = "유저아이디")
    private String userId;

    @ApiModelProperty(name = "식단 번호")
    private int diaryNo;

    @ApiModelProperty(name = "탄수화물")
    private double carbohydrate;

    @ApiModelProperty(name = "단백질")
    private double protein;

    @ApiModelProperty(name = "지방")
    private double fat;

    public NutritionHistory toEntity() {
        User user = new User();
        user.setUserId(userId);

        DietDiary dietDiary = new DietDiary();
        dietDiary.setDiaryNo(diaryNo);

        NutritionHistoryId nutritionHistoryId = new NutritionHistoryId();
        nutritionHistoryId.setDiaryNo(dietDiary);
        nutritionHistoryId.setCreatedAt(createdAt);
        nutritionHistoryId.setUser(user);

        return NutritionHistory.builder()
                .nutritionHistoryId(nutritionHistoryId)
                .carbohydrate(carbohydrate)
                .protein(protein)
                .fat(fat)
                .build();
    }
}
