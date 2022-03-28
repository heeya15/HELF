package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.NutritionRes;
import com.aisher.helf.db.entity.Food;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    Optional<Food> findById(int foodNo);
    List<Food> findAll();

    @Query(value = "select food_no \n" +
            "from food \n" +
            "where food_name = :foodName "
            , nativeQuery = true)
    int findFoodName(@Param("foodName") String foodName);

    @Query(value = "select carbohydrate, protein, fat \n" +
            "from food \n" +
            "where food_no = :foodNo"
            , nativeQuery = true)
    NutritionRes findNutrition(@Param("foodNo") int foodNo);
}