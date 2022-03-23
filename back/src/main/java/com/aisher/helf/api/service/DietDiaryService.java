package com.aisher.helf.api.service;

import ai.djl.MalformedModelException;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.output.DetectedObjects;
import ai.djl.repository.zoo.ModelNotFoundException;
import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.aisher.helf.api.response.DietDiaryAllRes;
import com.aisher.helf.api.response.DietDiaryFindRes;
import com.aisher.helf.db.entity.DietDiary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * 식단 일지를 관리하기 위한 서비스 인터페이스 정의.
 */
public interface DietDiaryService {
    /** 식단 일지 정보를 생성하는 registerDietDiary 입니다. **/
    DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception;
    /** 식단 일지 정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    DietDiary findByDiaryNo(int dietDiaryNo);
    /** 식단 일지 상세정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    DietDiaryFindRes findByDietDiaryNo(int dietDiaryNo);
    /** 검색 날짜에 해당하는 유저의 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    List<DietDiaryFindRes> findAllByDiaryDate(String date, String userId);
    /** 유저의 모든 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    List<DietDiaryAllRes> findAllByUserId(String userId);
    /** 식단 일지 정보를 수정하는 updateDietDiary 입니다. **/
    void updateDietDiary(DietDiary dietDiary, DietDiaryRegisterReq dietDiaryRegisterReq);
    /** 식단 일지 정보를 삭제하는 deleteDietDiary 입니다. **/
    void deleteDietDiary(DietDiary dietDiary);
    /** 음식을 인식하는 foodSegmentation **/
    DetectedObjects foodSegmentation(MultipartFile imagePath) throws IOException, ModelNotFoundException, MalformedModelException;

}
