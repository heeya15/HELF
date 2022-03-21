package com.aisher.helf.api.request;

import com.aisher.helf.db.entity.Diet;
import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.entity.Food;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 식단 등록 API ([POST] /api/dietdiary/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel("DietRegisterRequest")
public class DietRegisterReq {
    @ApiModelProperty(name="무게", example="0")
    private int weight;

    @ApiModelProperty(name="음식 이름", example="chicken breast")
    private String foodName;

    public Diet toEntity(int dietDiaryNo, int foodNumber) {
        DietDiary dietDiary = new DietDiary();
        dietDiary.setDiaryNo(dietDiaryNo);

        Food food = new Food();
        food.setFoodNo(foodNumber);

        return Diet.builder()
                .weight(weight)
                .diaryNo(dietDiary)
                .foodNo(food)
                .build();
    }
}
