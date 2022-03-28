package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ExerciseRegisterReq;
import com.aisher.helf.db.entity.Exercise;
import org.springframework.stereotype.Service;

@Service
public interface ExerciseService {
    Exercise registerExercise(ExerciseRegisterReq exerciseRegisterReq);
    Exercise getExerciseByExerciseNo(Long exerciseNo);
}
