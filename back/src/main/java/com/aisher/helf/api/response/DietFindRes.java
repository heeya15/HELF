package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;

@ApiModel("DietFindRes")
public interface DietFindRes {
    int getDiet_no();
    int getWeight();
    int getDiary_no();
    int getFood_no();
    String getFood_name();
    Double getKcal();
    Double getCarbohydrate();
    Double getProtein();
    Double getFat();
}
