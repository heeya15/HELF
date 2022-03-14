package com.aisher.helf.api.service;

import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.aisher.helf.api.response.DietDiaryFindRes;
import com.aisher.helf.db.entity.DietDiary;

import java.util.List;

/**
 * 식단 일지를 관리하기 위한 서비스 인터페이스 정의.
 */
public interface DietDiaryService {
    /** 식단 일지 정보를 생성하는 registerDietDiary 입니다. **/
    DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq);
    /** 식단 일지 정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    DietDiary findByDiaryNo(int dietDiaryNo);
    /** 식단 일지 상세정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    DietDiaryFindRes findByDietDiaryNo(int dietDiaryNo);
    /** 모든 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    List<DietDiary> findAllDietDiary();
    /** 식단 일지 정보를 수정하는 updateDietDiary 입니다. **/
    void updateDietDiary(int dietDiaryNo);
    /** 식단 일지 정보를 수정하는 deleteDietDiary 입니다. **/
    void deleteDietDiary(DietDiary dietDiary);
}
