package com.aisher.helf.api.request;

import com.aisher.helf.db.entity.Food;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.math.BigDecimal;

/**
 * 음식 등록 API ([POST] /api/food/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel("FoodRegisterPostRequest")
public class FoodRegisterReq {
	@ApiModelProperty(name="음식 번호", example="1")
	private int foodNo;

	@ApiModelProperty(name="음식 이름", example="chicken breast")
	private String foodName;

	@ApiModelProperty(name="칼로리", example="109")
	private int kcal;

	@ApiModelProperty(name="탄수화물", example="0.00")
	private double carbohydrate;

	@ApiModelProperty(name="단백질", example="22.98")
	private double protein;

	@ApiModelProperty(name="지방", example="1.23")
	private double fat;

	public Food toEntity() {
		return Food.builder()
				.foodNo(foodNo)
				.foodName(foodName)
				.kcal(kcal)
				.carbohydrate(carbohydrate)
				.protein(protein)
				.fat(fat)
				.build();
	}
}
