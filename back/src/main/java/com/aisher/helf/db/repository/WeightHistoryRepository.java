package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.WeightHistoryTenRecordRes;
import com.aisher.helf.db.entity.WeightHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface WeightHistoryRepository extends JpaRepository<WeightHistory, LocalDate> {
    // 해당 유저 daily에 몸무게를 등록한 경우가 있는지 개수 구하는 쿼리.
    @Query(value="select count(*)\n" +
                 "from weight_history\n" +
                 "where user_id = :user_id and created_at = :created_at"
            , nativeQuery = true)
    int findByWeightHistoryCount(@Param("user_id") String user_id, @Param("created_at") LocalDate created_at);

    @Query(value="select *\n" +
                 "from weight_history\n" +
                 "where user_id = :user_id and created_at = :created_at"
            , nativeQuery = true)
    WeightHistory findByWeightHistory(@Param("user_id") String user_id, @Param("created_at") LocalDate created_at);

    @Query(value="select h.created_at, h.weight, h.user_id\n" +
                 "from (select created_at, weight, user_id\n" +
             "\t  from weight_history\n" +
             "\t  where user_id = :user_id\n" +
             "\t  order by created_at desc\n" +
             "\t  limit 0,10) h\n" +
             "order by h.created_at asc;"
            , nativeQuery = true)
    List<WeightHistoryTenRecordRes> findByTenWeightHistory(@Param("user_id") String user_id);

    @Query(value="select *\n" +
            "from weight_history\n" +
            "where user_id = :user_id\n" +
            "order by created_at desc\n" +
            "limit 1;"
            , nativeQuery = true)
    WeightHistory findByTopWeightHistory(@Param("user_id") String user_id);
}