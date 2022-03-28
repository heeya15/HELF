package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.ExerciseHistory;
import com.aisher.helf.db.entity.QExerciseHistory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ExerciseHistoryRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QExerciseHistory qExerciseHistory = QExerciseHistory.exerciseHistory;

    public List<ExerciseHistory> findByExerciseDate(String year, String userId) {
        List<ExerciseHistory> exerciseHistories = jpaQueryFactory
                .select(qExerciseHistory)
                .from(qExerciseHistory)
                .where(qExerciseHistory.exerciseDate.year().eq(Integer.valueOf(year)).and(qExerciseHistory.user.userId.eq(userId)))
                .orderBy(qExerciseHistory.exerciseDate.asc())
                .fetch();

        if(exerciseHistories == null) return null;
        return exerciseHistories;
    }
}
