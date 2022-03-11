package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    Optional<Food> findById(int foodNo);
    List<Food> findAll();
}