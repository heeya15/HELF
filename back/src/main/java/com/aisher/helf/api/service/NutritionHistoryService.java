package com.aisher.helf.api.service;

import com.aisher.helf.api.response.NutritionHistoryFindRes;
import com.aisher.helf.api.response.NutritionHistoryRes;
import com.aisher.helf.db.entity.NutritionHistory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * 영양 성분 히스토리를 관리하기 위한 서비스 인터페이스 정의.
 */
@Service
public interface NutritionHistoryService {
    /** 영양 성분 히스토리 정보를 생성하는 registerNutritionHistory 입니다. **/
    void registerNutritionHistory(NutritionHistoryRes nutritionHistoryRes);
    /** 영양 성분 히스토리 정보를 수정하는 updateNutritionHistory 입니다. **/
    void updateNutritionHistory(String userId, int diaryNo, LocalDate diaryDate, double carbohydrate, double protein, double fat);
    /** diaryNo에 해당하는 영양 성분 히스토리 정보를 조회하는 findNutritionHistoryByUserId 입니다. **/
    NutritionHistory findNutritionHistoryByDiaryNo(int diaryNo);
    /** 유저의 일별 모든 영양 성분 히스토리 정보를 조회하는 findAllNutritionHistoryByUserId 입니다. **/
    List<NutritionHistoryFindRes> findAllNutritionHistoryByUserId(String userId, String createdAt);
}
