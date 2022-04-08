package com.aisher.helf.db.repository;

import com.aisher.helf.api.request.WeightHistoryrRegisterReq;
import com.aisher.helf.db.entity.QUser;
import com.aisher.helf.db.entity.QWeightHistory;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.entity.WeightHistory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class WeightHistoryRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QWeightHistory qweightHistory = QWeightHistory.weightHistory;

}
