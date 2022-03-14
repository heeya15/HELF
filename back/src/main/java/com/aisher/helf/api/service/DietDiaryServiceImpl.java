package com.aisher.helf.api.service;

import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.aisher.helf.api.request.DietRegisterReq;
import com.aisher.helf.api.response.DietDiaryFindRes;
import com.aisher.helf.api.response.DietFindRes;
import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.repository.DietDiaryRepository;
import com.aisher.helf.db.repository.DietRepository;
import com.aisher.helf.db.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 식단 일지 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@Service("dietDiaryService")
public class DietDiaryServiceImpl implements DietDiaryService{
    @Autowired
    DietDiaryRepository dietDiaryRepository;

    @Autowired
    DietRepository dietRepository;

    @Autowired
    FoodRepository foodRepository;

    /** 식단 일지 정보를 생성하는 registerDietDiary 입니다. **/
    @Override
    @Transactional
    public DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq) {
        // 식단 일지 table 에 등록
        DietDiary dietDiary = dietDiaryRepository.save(dietDiaryRegisterReq.toEntity());

        int dietDiaryNo = dietDiaryRepository.getDietDiaryNo();

        // 식단 table 에 등록
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiaryNo, foodNo));
        }
        return dietDiary;
    }

    /** 식단 일지 정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    public DietDiary findByDiaryNo(int dietDiaryNo) {
        return dietDiaryRepository.findById(dietDiaryNo);
    }

    /** 식단 일지 정보를 번호로 가져오는 findByDietDiaryNo 입니다. **/
    @Override
    public DietDiaryFindRes findByDietDiaryNo(int dietDiaryNo) {
        DietDiary dietDiaryRegisterReq = dietDiaryRepository.findById(dietDiaryNo);
        System.out.println(">>>>>>>>>>>>>>>>>>> 수정할 데이터 : " + dietDiaryRegisterReq.toString());

        DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();
        dietDiaryFindRes.setDiaryNo(dietDiaryRegisterReq.getDiaryNo());
        dietDiaryFindRes.setDiaryDate(dietDiaryRegisterReq.getDiaryDate());
        dietDiaryFindRes.setMealTime(dietDiaryRegisterReq.getMealTime());
        dietDiaryFindRes.setIsShared(dietDiaryRegisterReq.getIsShared());
        dietDiaryFindRes.setDescription(dietDiaryRegisterReq.getDescription());

        List<DietFindRes> dietFindResList = dietRepository.findAllDiet(dietDiaryRegisterReq.getDiaryNo());
        dietDiaryFindRes.setDietFindResList(dietFindResList);

        System.out.println(dietDiaryFindRes.toString());
        return dietDiaryFindRes;
    }

    /** 모든 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    @Override
    public List<DietDiary> findAllDietDiary() {
        return null;
    }

    /** 식단 일지 정보를 수정하는 updateDietDiary 입니다. **/
    @Override
    public void updateDietDiary(int dietDiaryNo) {
    }

    /** 식단 일지 정보를 수정하는 deleteDietDiary 입니다. **/
    @Override
    public void deleteDietDiary(DietDiary dietDiary) {
        dietDiaryRepository.delete(dietDiary);
    }
}
