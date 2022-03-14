package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.DietDiary;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
}
