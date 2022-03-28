package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.NutritionHistoryFindRes;
import com.aisher.helf.api.response.NutritionHistoryRes;
import com.aisher.helf.api.response.NutritionRes;
import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.entity.NutritionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface NutritionHistoryRepository extends JpaRepository<NutritionHistory, Integer> {
    @Modifying
    @Transactional
    @Query(value = "update nutrition_history \n" +
            "set carbohydrate = :carbohydrate, protein = :protein, fat = :fat \n" +
            "where created_at = :diaryDate and user_id = :userId and diary_no = :diaryNo", nativeQuery = true)
    void updateNutritionHistory(@Param("userId") String userId,@Param("diaryNo") int diaryNo, @Param("diaryDate") LocalDate diaryDate,
                                @Param("carbohydrate") double carbohydrate, @Param("protein") double protein, @Param("fat") double fat);

    @Query(value= "select * \n" +
            "from nutrition_history \n" +
            "where user_id = :userId and created_at = date(now()) ", nativeQuery = true)
    List<NutritionHistoryFindRes> findAllNutritionHistoryByUserId(@Param("userId") String userId);
}
