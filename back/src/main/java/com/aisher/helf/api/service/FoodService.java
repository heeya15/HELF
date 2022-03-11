package com.aisher.helf.api.service;

import com.aisher.helf.api.request.FoodRegisterReq;
import com.aisher.helf.db.entity.Food;

import java.util.List;

/**
 * 음식을 관리하기 위한 서비스 인터페이스 정의.
 */
public interface FoodService {
    /** 음식 정보을 생성하는 registerFood 입니다. */
    Food registerFood(FoodRegisterReq foodRegisterReq);
    /** 음식 정보를 음식 이름으로 가져오는 findByFoodNo 입니다. */
    Food findByFoodNo(int foodNo);
    /** 모든 음식 정보를 가져오는 findAllFood 입니다. */
    List<Food> findAllFood();
    /** 음식 정보를 수정하는 updateFood 입니다. */
    void updateFood(Food food, FoodRegisterReq foodRegisterReq);
    /** 음식 정보를 삭제하는 deleteFood 입니다. */
    void deleteFood(Food food);
}
