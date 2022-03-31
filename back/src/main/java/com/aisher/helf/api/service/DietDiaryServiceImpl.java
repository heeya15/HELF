package com.aisher.helf.api.service;

import ai.djl.Application;
import ai.djl.MalformedModelException;
import ai.djl.inference.Predictor;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.modality.cv.output.DetectedObjects;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ModelNotFoundException;
import ai.djl.repository.zoo.ModelZoo;
import ai.djl.repository.zoo.ZooModel;
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

import javax.transaction.Transactional;
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
import ai.djl.Application;
import ai.djl.ModelException;
import ai.djl.engine.Engine;
import ai.djl.inference.Predictor;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.modality.cv.output.BoundingBox;
import ai.djl.modality.cv.output.DetectedObjects;
import ai.djl.modality.cv.output.Rectangle;
import ai.djl.modality.cv.util.NDImageUtils;
import ai.djl.ndarray.NDArray;
import ai.djl.ndarray.NDList;
import ai.djl.ndarray.types.DataType;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ModelZoo;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.training.util.ProgressBar;
import ai.djl.translate.Batchifier;
import ai.djl.translate.TranslateException;
import ai.djl.translate.Translator;
import ai.djl.translate.TranslatorContext;
import ai.djl.util.JsonUtils;
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
    public DetectedObjects foodSegmentation(MultipartFile imagePath) throws IOException, ModelNotFoundException, MalformedModelException {
        Image image = ImageFactory.getInstance().fromImage(imagePath);

        Criteria<Image, DetectedObjects> criteria =
                Criteria.builder()
                        .optApplication(Application.CV.IMAGE_CLASSIFICATION)
                        .setTypes(Image.class, DetectedObjects.class)
                        .optTranslator(new MyTranslator())
                        .optModelUrls("src/main/resources/dist/model")
                        .optModelName("model-final")
                        .build();
        try (ZooModel<Image, DetectedObjects> model = ModelZoo.loadModel(criteria);
             Predictor<Image, DetectedObjects> predictor = model.newPredictor()) {
            DetectedObjects detection = predictor.predict(image);
            saveBoundingBoxImage(image, detection);
            return detection;
        } catch (TranslateException e) {
            e.printStackTrace();
        }
        return null;
    }
    // 인식 잘되는지 테스트용
    private void saveBoundingBoxImage(Image image, DetectedObjects detection) throws IOException {
        Path outputDir = Paths.get("src/main/resources/dist/model/result");
        Files.createDirectories(outputDir);
        Image newImage = image.duplicate();
        newImage.drawBoundingBoxes(detection);

        Path imagePath = outputDir.resolve("detected-test.png");
        newImage.save(Files.newOutputStream(imagePath), "png");
    }
private static final class MyTranslator implements Translator<Image, DetectedObjects> {

    private Map<Integer, String> classes;
    private int maxBoxes;
    private float threshold;

    MyTranslator() {
        maxBoxes = 10;
        threshold = 0.7f;
    }

    @Override
    public NDList processInput(TranslatorContext ctx, Image input) {
        NDArray array = input.toNDArray(ctx.getNDManager(), Image.Flag.COLOR);
        array = NDImageUtils.resize(array, 224);
        array = array.toType(DataType.UINT8, true);
        array = array.expandDims(0);
        return new NDList(array);
    }

/*        @Override
        public void prepare(NDManager manager, Model model) throws IOException {
            if (classes == null) {
                classes = loadSynset();
            }
        }*/

    @Override
    public DetectedObjects processOutput(TranslatorContext ctx, NDList list) {

        int[] classIds = null;
        float[] probabilities = null;
        NDArray boundingBoxes = null;
        for (NDArray array : list) {
            if ("detection_boxes".equals(array.getName())) {
                boundingBoxes = array.get(0);
            } else if ("detection_scores".equals(array.getName())) {
                probabilities = array.get(0).toFloatArray();
            } else if ("detection_classes".equals(array.getName())) {
                classIds = array.get(0).toType(DataType.INT32, true).toIntArray();
            }
        }
        Objects.requireNonNull(classIds);
        Objects.requireNonNull(probabilities);
        Objects.requireNonNull(boundingBoxes);

        List<String> retNames = new ArrayList<>();
        List<Double> retProbs = new ArrayList<>();
        List<BoundingBox> retBB = new ArrayList<>();

        for (int i = 0; i < Math.min(classIds.length, maxBoxes); ++i) {
            int classId = classIds[i];
            double probability = probabilities[i];
            if (classId > 0 && probability > threshold) {
                String className = classes.getOrDefault(classId, "#" + classId);
                float[] box = boundingBoxes.get(i).toFloatArray();
                float yMin = box[0];
                float xMin = box[1];
                float yMax = box[2];
                float xMax = box[3];
                Rectangle rect = new Rectangle(xMin, yMin, xMax - xMin, yMax - yMin);
                retNames.add(className);
                retProbs.add(probability);
                retBB.add(rect);
            }
        }

        return new DetectedObjects(retNames, retProbs, retBB);
    }

    @Override
    public Batchifier getBatchifier() {
        return null;
    }

    @Override
    public void prepare(TranslatorContext ctx) throws Exception {
        Translator.super.prepare(ctx);
    }
}
}
