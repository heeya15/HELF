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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @Autowired
    S3FileUploadService s3FileUploadService;

    /** 식단 일지 정보를 생성하는 registerDietDiary 입니다. **/
    @Override
    @Transactional

    public DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception {
        // 이미지 업로드
        String savingFileName = s3FileUploadService.upload(imagePath);
        dietDiaryRegisterReq.setSaveImagePath(savingFileName);

        // String 형태로 받은 날짜 데이터를 LocalDateTime으로 변경한 뒤, DB에 저장
        LocalDateTime diaryDate = LocalDateTime.parse(dietDiaryRegisterReq.getDiaryDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 식단 일지 table 에 등록
        DietDiary dietDiary = dietDiaryRepository.save(dietDiaryRegisterReq.toEntity(diaryDate));
        int dietDiaryNo = dietDiaryRepository.getDietDiaryNo();     // 현재 저장하는 식단 일지 번호 (dietDiaryNo) 가져오기

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
        DietDiary dietDiary = dietDiaryRepository.findById(dietDiaryNo);
        System.out.println(">>>>>>>>>>>>>>>>>>> 수정할 데이터 : " + dietDiary.toString());

        DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();
        dietDiaryFindRes.setDiaryNo(dietDiary.getDiaryNo());
        dietDiaryFindRes.setDiaryDate(dietDiary.getDiaryDate());
        dietDiaryFindRes.setMealTime(dietDiary.getMealTime());
        dietDiaryFindRes.setIsShared(dietDiary.getIsShared());
        dietDiaryFindRes.setDescription(dietDiary.getDescription());

        List<DietFindRes> dietFindResList = dietRepository.findAllDiet(dietDiary.getDiaryNo());
        dietDiaryFindRes.setDietFindResList(dietFindResList);

        System.out.println(dietDiaryFindRes.toString());
        return dietDiaryFindRes;
    }

    /** 모든 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    @Override
    public List<DietDiaryFindRes> findAllByDiaryDate(String date) {
        // 원하는 날짜의 식단 일지 정보 가져오기
        List<DietDiary> dietDiaryList = dietDiaryRepository.findByDiaryDateLike(date);

        List<DietDiaryFindRes> dietDiaryFindResList = new ArrayList<DietDiaryFindRes>();
        for(int i=0; i<dietDiaryList.size(); i++) {
            // 해당 일자에 기록한 식단 일지 하나 하나 세팅
            DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();

            dietDiaryFindRes.setDiaryNo(dietDiaryList.get(i).getDiaryNo());
            dietDiaryFindRes.setDiaryDate(dietDiaryList.get(i).getDiaryDate());
            dietDiaryFindRes.setMealTime(dietDiaryList.get(i).getMealTime());
            dietDiaryFindRes.setIsShared(dietDiaryList.get(i).getIsShared());
            dietDiaryFindRes.setDescription(dietDiaryList.get(i).getDescription());

            List<DietFindRes> dietFindResList = dietRepository.findAllDiet(dietDiaryList.get(i).getDiaryNo());
            dietDiaryFindRes.setDietFindResList(dietFindResList);

            // 하나의 세팅이 완료되었다면 최종 list에 추가
            dietDiaryFindResList.add(dietDiaryFindRes);
        }
        return dietDiaryFindResList;
    }

    /** 식단 일지 정보를 수정하는 updateDietDiary 입니다. **/
    @Override
    public void updateDietDiary(DietDiary dietDiary, DietDiaryRegisterReq dietDiaryRegisterReq) {
        // 식단 일지 테이블 수정
        dietDiary.updateDietDiary(dietDiaryRegisterReq);

        // 식단 테이블 기존의 데이터 삭제 후, 새로운 데이터로 생성
        dietRepository.deleteByDietDiary(dietDiary.getDiaryNo());
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiary.getDiaryNo(), foodNo));
        }
    }

    /** 식단 일지 정보를 삭제하는 deleteDietDiary 입니다. **/
    @Override
    public void deleteDietDiary(DietDiary dietDiary) {
        dietDiaryRepository.delete(dietDiary);
    }
}
