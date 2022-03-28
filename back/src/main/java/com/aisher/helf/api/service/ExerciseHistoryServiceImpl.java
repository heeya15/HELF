package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ExerciseHistoryRegisterReq;
import com.aisher.helf.api.response.ExerciseHistoryFindRes;
import com.aisher.helf.db.entity.Exercise;
import com.aisher.helf.db.entity.ExerciseHistory;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.repository.ExerciseHistoryRepository;
import com.aisher.helf.db.repository.ExerciseHistoryRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service("exerciseHistoryService")
public class ExerciseHistoryServiceImpl implements ExerciseHistoryService{

    @Autowired
    UserService userService;

    @Autowired
    ExerciseService exerciseService;

    @Autowired
    ExerciseHistoryRepository exerciseHistoryRepository;

    @Autowired
    ExerciseHistoryRepositorySupport exerciseHistoryRepositorySupport;

    @Override
    public ExerciseHistory registerExerciseHistory(ExerciseHistoryRegisterReq exerciseHistoryRegisterReq, String userId) {
        User user = userService.getUserByUserId(userId);
        Exercise exercise = exerciseService.getExerciseByExerciseNo(exerciseHistoryRegisterReq.getExerciseNo());

        ExerciseHistory exerciseHistory = ExerciseHistory.builder()
                .historyNo(exerciseHistoryRegisterReq.getHistoryNo())
                .exerciseCount(exerciseHistoryRegisterReq.getExerciseCount())
                .exerciseDate(LocalDateTime.parse(exerciseHistoryRegisterReq.getExerciseDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .user(user)
                .exercise(exercise)
                .build();
        return exerciseHistoryRepository.save(exerciseHistory);
    }

    @Override
    public List<ExerciseHistoryFindRes> findAllExerciseHistoryByYear(String year, String userId) {
        List<ExerciseHistory> exerciseHistoryList = exerciseHistoryRepositorySupport.findByExerciseDate(year, userId);

        List<ExerciseHistoryFindRes> exerciseHistoryFindResList = new ArrayList<ExerciseHistoryFindRes>();
        for(int i=0; i<exerciseHistoryList.size(); i++) {
            ExerciseHistoryFindRes exerciseHistoryFindRes = new ExerciseHistoryFindRes();

            exerciseHistoryFindRes.setHistoryNo(exerciseHistoryList.get(i).getHistoryNo());
            exerciseHistoryFindRes.setExerciseCount(exerciseHistoryList.get(i).getExerciseCount());
            exerciseHistoryFindRes.setExerciseName(exerciseHistoryList.get(i).getExercise().getExerciseName());
            exerciseHistoryFindRes.setExerciseDate(exerciseHistoryList.get(i).getExerciseDate());

            exerciseHistoryFindResList.add(exerciseHistoryFindRes);

        }
        return exerciseHistoryFindResList;
    }

}
