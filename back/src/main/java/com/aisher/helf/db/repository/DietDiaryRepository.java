package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.DietDiaryAllRes;
import com.aisher.helf.db.entity.DietDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietDiaryRepository extends JpaRepository<DietDiary, Integer> {
    // 제일 최근에 입력한 식단 일지 번호 (diary_no) 검색
    @Query(value = "select diary_no \n" +
            "from diet_diary \n" +
            "order by diary_no desc \n" +
            "limit 1 ", nativeQuery = true)
    int getDietDiaryNo();

    // 식단 일지 번호 (diary_no)를 이용하여 데이터 검색
    DietDiary findById(@Param("dietDiaryNo") int dietDiaryNo);

    @Query(value = "select * \n" +
            "from diet_diary \n" +
            "where diary_date like %:date% and user_id = :userId ", nativeQuery = true)
    List<DietDiary> findByDiaryDateLike(@Param("date") String date, @Param("userId") String userId);

    @Query(value = "select diary_no, diary_date, meal_time, image_path, is_shared, description \n" +
            "from diet_diary \n" +
            "where user_id = :userId ", nativeQuery = true)
    List<DietDiaryAllRes> findByUserId(@Param("userId") String userId);
}
