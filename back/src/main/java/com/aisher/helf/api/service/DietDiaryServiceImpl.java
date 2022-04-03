package com.aisher.helf.api.service;


import ai.djl.MalformedModelException;
import ai.djl.repository.zoo.ModelNotFoundException;
import ai.djl.translate.TranslateException;
import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.aisher.helf.api.request.DietRegisterReq;
import com.aisher.helf.api.response.*;
import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.repository.DietDiaryRepository;
import com.aisher.helf.db.repository.DietRepository;
import com.aisher.helf.db.repository.FoodRepository;
import com.aisher.helf.db.repository.NutritionHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import java.util.*;

import ai.djl.inference.Predictor;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.modality.cv.output.DetectedObjects;
import ai.djl.modality.cv.transform.Resize;
import ai.djl.modality.cv.transform.ToTensor;
import ai.djl.modality.cv.translator.YoloV5Translator;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ModelZoo;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.training.util.ProgressBar;
import ai.djl.translate.Pipeline;
import ai.djl.translate.Translator;
import lombok.extern.slf4j.Slf4j;

import com.google.gson.annotations.SerializedName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 식단 일지 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@Slf4j
@Service("dietDiaryService")
public class DietDiaryServiceImpl implements DietDiaryService{
    @Autowired
    DietDiaryRepository dietDiaryRepository;

    @Autowired
    DietRepository dietRepository;

    @Autowired
    FoodRepository foodRepository;

    @Autowired
    NutritionHistoryRepository nutritionHistoryRepository;

    @Autowired
    S3FileUploadService s3FileUploadService;

    @Autowired
    NutritionHistoryService nutritionHistoryService;

    public List<String> foodList = new ArrayList<>();

    /** 식단 일지 정보를 생성하는 registerDietDiary 입니다. **/
    @Override
    @Transactional
    public DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception {
        // 이미지 업로드
        String savingFileName = s3FileUploadService.upload(imagePath);
        dietDiaryRegisterReq.setSaveImagePath(savingFileName);

        // String 형태로 받은 날짜 데이터를 LocalDateTime으로 변경한 뒤, DB에 저장
        LocalDateTime diaryDateTime = LocalDateTime.parse(dietDiaryRegisterReq.getDiaryDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDate diaryDate = LocalDate.parse(dietDiaryRegisterReq.getDiaryDate().substring(0,10), DateTimeFormatter.ISO_DATE);

        // 식단 일지 table 에 등록
        DietDiary dietDiary = dietDiaryRepository.save(dietDiaryRegisterReq.toEntity(diaryDateTime));
        int dietDiaryNo = dietDiaryRepository.getDietDiaryNo();     // 현재 저장하는 식단 일지 번호 (dietDiaryNo) 가져오기

        // 영양 정보 히스토리 등록을 위해 해당 식단 일지의 단백질, 탄수화물, 지방 누적량
        double totalCarbohydrate = 0.0;
        double totalProtein = 0.0;
        double totalFat = 0.0;

        // 식단 table 에 등록
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
//            int foodNo = foodRepository.findFoodName("토마토");
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiaryNo, foodNo));

            // 식단 영양 성분 정보 찾기
            int weight = dietRegisterReqList.get(i).getWeight();
            NutritionRes nutritionRes = foodRepository.findNutrition(foodNo);
            totalCarbohydrate += nutritionRes.getCarbohydrate() * weight;
            totalProtein += nutritionRes.getProtein() * weight;
            totalFat += nutritionRes.getFat() * weight;
        }

        // 영양 성분 히스토리에 등록
        NutritionHistoryRes nutritionHistoryRes = new NutritionHistoryRes();
        nutritionHistoryRes.setDiaryNo(dietDiaryNo);
        nutritionHistoryRes.setUserId(dietDiaryRegisterReq.getUserId());
        nutritionHistoryRes.setCreatedAt(diaryDate);
        nutritionHistoryRes.setCarbohydrate(totalCarbohydrate);
        nutritionHistoryRes.setProtein(totalProtein);
        nutritionHistoryRes.setFat(totalFat);
        nutritionHistoryService.registerNutritionHistory(nutritionHistoryRes);

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

        DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();
        dietDiaryFindRes.setDiaryNo(dietDiary.getDiaryNo());
        dietDiaryFindRes.setDiaryDate(dietDiary.getDiaryDate());
        dietDiaryFindRes.setMealTime(dietDiary.getMealTime());
        dietDiaryFindRes.setImagePath(dietDiary.getImagePath());
        dietDiaryFindRes.setIsShared(dietDiary.getIsShared());
        dietDiaryFindRes.setDescription(dietDiary.getDescription());

        List<DietFindRes> dietFindResList = dietRepository.findAllDiet(dietDiary.getDiaryNo());
        dietDiaryFindRes.setDietFindResList(dietFindResList);

        System.out.println(dietDiaryFindRes.toString());
        return dietDiaryFindRes;
    }

    /** 검색 날짜에 해당하는 유저의 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    @Override
    public List<DietDiaryFindRes> findAllByDiaryDate(String date, String userId) {
        // 원하는 날짜의 식단 일지 정보 가져오기
        List<DietDiary> dietDiaryList = dietDiaryRepository.findByDiaryDateLike(date, userId);

        List<DietDiaryFindRes> dietDiaryFindResList = new ArrayList<DietDiaryFindRes>();
        for(int i=0; i<dietDiaryList.size(); i++) {
            // 해당 일자에 기록한 식단 일지 하나 하나 세팅
            DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();

            dietDiaryFindRes.setDiaryNo(dietDiaryList.get(i).getDiaryNo());
            dietDiaryFindRes.setImagePath(dietDiaryList.get(i).getImagePath());
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

    /** 유저의 모든 식단 일지 정보를 가져오는 findAllFood 입니다. **/
    @Override
    public List<DietDiaryAllRes> findAllByUserId(String userId) {
        return dietDiaryRepository.findByUserId(userId);
    }

    /** 식단 일지 정보를 수정하는 updateDietDiary 입니다. **/
    @Override
    public DietDiaryFindRes updateDietDiary(DietDiary dietDiary, DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception {
        // 이미지 수정시 업로드
        if(imagePath != null) {
            String savingFileName = s3FileUploadService.upload(imagePath);
            dietDiaryRegisterReq.setSaveImagePath(savingFileName);
        }

        // 식단 일지 테이블 수정
        dietDiary.updateDietDiary(dietDiaryRegisterReq);

        // 영양 정보 히스토리 수정을 위해 해당 식단 일지의 단백질, 탄수화물, 지방 누적량
        double totalCarbohydrate = 10.0;
        double totalProtein = 0.0;
        double totalFat = 0.0;

        // 식단 테이블 기존의 데이터 삭제 후, 새로운 데이터로 생성
        dietRepository.deleteByDietDiary(dietDiary.getDiaryNo());
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
//            int foodNo = 11;
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiary.getDiaryNo(), foodNo));

            // 식단 영양 성분 정보 찾기
            int weight = dietRegisterReqList.get(i).getWeight();
            NutritionRes nutritionRes = foodRepository.findNutrition(foodNo);
            totalCarbohydrate += nutritionRes.getCarbohydrate() * weight;
            totalProtein += nutritionRes.getProtein() * weight;
            totalFat += nutritionRes.getFat() * weight;
        }

        // 영양 성분 히스토리도 수정
        String userId = dietDiary.getUserId().getUserId();
        LocalDate diaryDate = LocalDate.parse(dietDiaryRegisterReq.getDiaryDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        int diaryNo = dietDiaryRegisterReq.getDiaryNo();
        nutritionHistoryService.updateNutritionHistory(userId, diaryNo, diaryDate, totalCarbohydrate, totalProtein, totalFat);

        // 수정된 데이터 가져오기
        return findByDietDiaryNo(dietDiary.getDiaryNo());
    }

    /** 식단 일지 정보를 삭제하는 deleteDietDiary 입니다. **/
    @Override
    public void deleteDietDiary(DietDiary dietDiary) {
        dietDiaryRepository.delete(dietDiary);
    }

    @Override
    public void updateDiaryShareStatus(int diaryNo) {
        dietDiaryRepository.updateShareStatus(diaryNo);
    }

    /** 음식을 인식하는 foodSegmentation 입니다. **/
    @Override
    public DetectedObjects foodSegmentation(MultipartFile imagePath) throws IOException, ModelNotFoundException, MalformedModelException, TranslateException, ModelNotFoundException, MalformedModelException, TranslateException {
        int imageSize = 640;

        Pipeline pipeline = new Pipeline();
        pipeline.add(new Resize(imageSize));
        pipeline.add(new ToTensor());

        Translator<Image, DetectedObjects> translator =  YoloV5Translator
                .builder()
                .setPipeline(pipeline)
                .optSynset(Arrays.asList("chickenbreast","tomato","salmon","steak","salad","egg","cucumber","milk","sweetpotato","rice","natto","tofu","broccoli"))
                .optThreshold(0.5f)
                .build();


        Criteria<Image, DetectedObjects> criteria = Criteria.builder()
                .setTypes(Image.class, DetectedObjects.class)
                .optModelUrls("src/main/resources/dist/model")
                .optModelName("best.torchscript")
                .optTranslator(translator)
                .optProgress(new ProgressBar())
                .build();

        ZooModel<Image,DetectedObjects> model = ModelZoo.loadModel(criteria);
        BufferedImage image = ImageIO.read(imagePath.getInputStream());
        Image img = ImageFactory.getInstance().fromImage(image);
//        Image img = ImageFactory.getInstance().fromFile(Paths.get("src/main/resources/dist/img/test.jpg"));
        Predictor<Image, DetectedObjects> predictor = model.newPredictor();

        DetectedObjects results = predictor.predict(img);


        Map<String, Boolean> foodsState = new HashMap<>();
        //인식된 음식 이름
        List<DetectedObjects.DetectedObject> list = results.items();
        for (DetectedObjects.DetectedObject result : list) {
            String className = result.getClassName();
            System.out.println(className);
            foodsState.put(className, true);
        }
        Map<String, String> foodKname = new HashMap<String, String>() {{
            put("chickenbreast","닭가슴살");
            put("tomato","토마토");
            put("salmon","연어");
            put("steak","안심스테이크");
            put("salad","야채샐러드");
            put("egg","계란");
            put("cucumber","오이");
            put("milk","우유");
            put("sweetpotato","고구마");
            put("rice","밥");
            put("natto","낫또");
            put("tofu","두부");
            put("broccoli","브로콜리");
        }};

        foodsState.forEach((key, value)->{
            foodList.add(foodKname.get(key));
        });

        System.out.println(results);

        Path outputDir = Paths.get("src/main/resources/dist/model/result");
        Files.createDirectories(outputDir);



        ImageUtils.drawBoundingBoxes((BufferedImage) img.getWrappedImage(),results);

        //인식된 결과 이미지 전송시 img 사용

        Path SavePath = outputDir.resolve("detected-DSC00020_0.png");
        // OpenJDK can't save jpg with alpha channel
        img.save(Files.newOutputStream(SavePath), "png");
        log.info("Detected objects image has been saved in: {}", imagePath);
        return null;
    }

    @Override
    public List<String> detectedResult() {
        return foodList;
    }

}
