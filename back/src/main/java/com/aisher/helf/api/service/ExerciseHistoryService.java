package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ExerciseHistoryRegisterReq;
import com.aisher.helf.api.response.ExerciseHistoryFindRes;
import com.aisher.helf.db.entity.ExerciseHistory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExerciseHistoryService {
    ExerciseHistory registerExerciseHistory(ExerciseHistoryRegisterReq exerciseHistoryRegisterReq, String userId);
    List<ExerciseHistoryFindRes> findAllExerciseHistoryByYear(String year, String userId);
}
