package com.aisher.helf.api.response;

import java.time.LocalDate;

public interface NutritionHistoryFindRes {
    String getUser_id();
    LocalDate getCreated_at();
    int getDiary_no();
    double getCarbohydrate();
    double getProtein();
    double getFat();
}
