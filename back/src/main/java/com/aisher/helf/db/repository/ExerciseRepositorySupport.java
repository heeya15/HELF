package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.Exercise;
import com.aisher.helf.db.entity.QExercise;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ExerciseRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QExercise qExercise = QExercise.exercise;

    public Optional<Exercise> findExerciseByExerciseNo(Long exerciseNo) {
        Exercise exercise = jpaQueryFactory
                .select(qExercise)
                .from(qExercise)
                .where(qExercise.exerciseNo.eq(exerciseNo))
                .fetchOne();
        if(exercise == null) return Optional.empty();
        return Optional.ofNullable(exercise);
    }

}
