package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.DietFindRes;
import com.aisher.helf.db.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {

    @Query(value = "select diet_no, weight, diary_no, d.food_no, food_name, kcal, carbohydrate, protein, fat \n" +
            "from diet d join food f \n" +
            "on d.food_no = f.food_no \n" +
            "where diary_no = :diaryNo ", nativeQuery = true)
    List<DietFindRes> findAllDiet(@Param("diaryNo") int diaryNo);

    @Transactional
    @Modifying
    @Query(value = "delete \n" +
            "from diet \n" +
            "where diary_no = :diaryNo", nativeQuery = true)
    void deleteByDietDiary(@Param("diaryNo") int diaryNo);
}
