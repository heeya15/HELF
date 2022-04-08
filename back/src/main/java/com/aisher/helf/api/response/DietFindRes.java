package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;

@ApiModel("DietFindRes")
public interface DietFindRes {
    int getDietNo();
    int getWeight();
    int getDiaryNo();
    int getFoodNo();
    String getFoodName();
    Double getKcal();
    Double getCarbohydrate();
    Double getProtein();
    Double getFat();
}
