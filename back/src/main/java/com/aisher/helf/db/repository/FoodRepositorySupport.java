package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.Food;
import com.aisher.helf.db.entity.QFood;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class FoodRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    private FoodRepository foodRepository;
    QFood qFood = QFood.food;

    public Optional<Food> findByFoodName(String foodName) {
        Food food = jpaQueryFactory.select(qFood).from(qFood).where(qFood.foodName.eq(foodName)).fetchOne();
        if(food == null) return Optional.empty();
        return Optional.ofNullable(food);
    }
}