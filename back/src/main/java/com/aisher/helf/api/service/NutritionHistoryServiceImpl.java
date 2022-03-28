package com.aisher.helf.api.service;

import com.aisher.helf.api.response.NutritionHistoryFindRes;
import com.aisher.helf.api.response.NutritionHistoryRes;
import com.aisher.helf.db.entity.NutritionHistory;
import com.aisher.helf.db.repository.NutritionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service("NutritionHistoryService")
public class NutritionHistoryServiceImpl implements NutritionHistoryService {
    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;

    @Override
    public void registerNutritionHistory(NutritionHistoryRes nutritionHistoryRes) {
        nutritionHistoryRepository.save(nutritionHistoryRes.toEntity());
    }

    @Override
    public void updateNutritionHistory(String userId, int diaryNo, LocalDate diaryDate, double carbohydrate, double protein, double fat) {
        nutritionHistoryRepository.updateNutritionHistory(userId, diaryNo, diaryDate, carbohydrate, protein, fat);
    }

    @Override
    public List<NutritionHistoryFindRes> findAllNutritionHistoryByUserId(String userId) {
        return nutritionHistoryRepository.findAllNutritionHistoryByUserId(userId);
    }

    @Override
    public NutritionHistory findNutritionHistoryByDiaryNo(int diaryNo) {
        return findNutritionHistoryByDiaryNo(diaryNo);
    }
}
