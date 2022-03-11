package com.aisher.helf.api.service;

import com.aisher.helf.api.request.FoodRegisterReq;
import com.aisher.helf.db.entity.Food;
import com.aisher.helf.db.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 *	음식 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("foodService")
public class FoodServiceImpl implements FoodService{
    @Autowired
    FoodRepository foodRepository;

    /** 음식 정보을 생성하는 registerFood 입니다. */
    @Override
    @Transactional
    public Food registerFood(FoodRegisterReq foodRegisterReq) {
        return foodRepository.save(foodRegisterReq.toEntity());
    }

    /** 음식 정보를 음식 이름으로 가져오는 findByFoodNo 입니다. */
    public Food findByFoodNo(int foodNo) {
        Optional<Food> food = foodRepository.findById(foodNo);
        if(food.isPresent()) {
            return food.get();
        }
        return null;
    }

    /** 모든 음식 정보를 가져오는 findAllFood 입니다. */
    @Override
    public List<Food> findAllFood() {
        List<Food> foods = foodRepository.findAll();
        return foods;
    }

    /** 음식 정보 수정하는 updateFood 입니다 */
    @Override
    @Transactional
    public void updateFood(Food food, FoodRegisterReq foodRegisterReq) {
        food.updateFood(foodRegisterReq);
    }

    /** 음식 정보를 삭제하는 deleteFood 입니다. */
    @Override
    @Transactional
    public void deleteFood(Food food) {
        foodRepository.delete(food);
    }
}
