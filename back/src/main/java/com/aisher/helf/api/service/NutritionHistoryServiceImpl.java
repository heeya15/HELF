package com.aisher.helf.api.service;

import com.aisher.helf.api.response.NutritionHistoryFindRes;
import com.aisher.helf.api.response.NutritionHistoryRes;
import com.aisher.helf.db.entity.NutritionHistory;
import com.aisher.helf.db.repository.NutritionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service("NutritionHistoryService")
public class NutritionHistoryServiceImpl implements NutritionHistoryService {
    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;

    /** 영양 성분 히스토리 정보를 생성하는 registerNutritionHistory 입니다. **/
    @Override
    public void registerNutritionHistory(NutritionHistoryRes nutritionHistoryRes) {
        nutritionHistoryRepository.save(nutritionHistoryRes.toEntity());
    }

    /** 영양 성분 히스토리 정보를 수정하는 updateNutritionHistory 입니다. **/
    @Override
    public void updateNutritionHistory(String userId, int diaryNo, LocalDate diaryDate, double carbohydrate, double protein, double fat) {
        nutritionHistoryRepository.updateNutritionHistory(userId, diaryNo, diaryDate, carbohydrate, protein, fat);
    }

    /** diaryNo에 해당하는 영양 성분 히스토리 정보를 조회하는 findNutritionHistoryByUserId 입니다. **/
    @Override
    public List<NutritionHistoryFindRes> findAllNutritionHistoryByUserId(String userId, String createdAt) {
        LocalDate date = LocalDate.parse(createdAt, DateTimeFormatter.ISO_DATE);
        return nutritionHistoryRepository.findAllNutritionHistoryByUserId(userId, date);
    }

    /** 유저의 일별 모든 영양 성분 히스토리 정보를 조회하는 findAllNutritionHistoryByUserId 입니다. **/
    @Override
    public NutritionHistory findNutritionHistoryByDiaryNo(int diaryNo) {
        return findNutritionHistoryByDiaryNo(diaryNo);
    }
}
