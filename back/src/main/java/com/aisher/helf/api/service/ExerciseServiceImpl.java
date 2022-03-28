package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ExerciseRegisterReq;
import com.aisher.helf.db.entity.Exercise;
import com.aisher.helf.db.repository.ExerciseRepository;
import com.aisher.helf.db.repository.ExerciseRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("exerciseService")
public class ExerciseServiceImpl implements ExerciseService{

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    ExerciseRepositorySupport exerciseRepositorySupport;

    @Override
    public Exercise registerExercise(ExerciseRegisterReq exerciseRegisterReq) {
        Exercise exercise = Exercise.builder()
                .exerciseNo(exerciseRegisterReq.getExerciseNo())
                .exerciseName(exerciseRegisterReq.getExerciseName())
                .build();
        return exerciseRepository.save(exercise);
    }

    @Override
    public Exercise getExerciseByExerciseNo(Long exerciseNo) {
        return exerciseRepositorySupport.findExerciseByExerciseNo(exerciseNo).orElse(null);
    }


}
