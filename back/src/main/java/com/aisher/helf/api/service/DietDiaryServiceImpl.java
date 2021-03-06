package com.aisher.helf.api.service;

import ai.djl.aws.s3.S3RepositoryFactory;
import ai.djl.MalformedModelException;
import ai.djl.repository.Repository;
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
import java.text.DecimalFormat;
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
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

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
 * ?????? ?????? ?????? ???????????? ?????? ????????? ?????? ????????? ?????? ??????
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

    public List<String> foodList = null;

    /** ?????? ?????? ????????? ???????????? registerDietDiary ?????????. **/
    @Override
    @Transactional
    public DietDiary registerDietDiary(DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception {
        // ????????? ?????????
        String savingFileName = s3FileUploadService.upload(imagePath);
        dietDiaryRegisterReq.setSaveImagePath(savingFileName);

        // String ????????? ?????? ?????? ???????????? LocalDateTime?????? ????????? ???, DB??? ??????
        LocalDateTime diaryDateTime = LocalDateTime.parse(dietDiaryRegisterReq.getDiaryDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDate diaryDate = LocalDate.parse(dietDiaryRegisterReq.getDiaryDate().substring(0,10), DateTimeFormatter.ISO_DATE);

        // ?????? ?????? table ??? ??????
        DietDiary dietDiary = dietDiaryRepository.save(dietDiaryRegisterReq.toEntity(diaryDateTime));
        int dietDiaryNo = dietDiaryRepository.getDietDiaryNo();     // ?????? ???????????? ?????? ?????? ?????? (dietDiaryNo) ????????????

        // ?????? ?????? ???????????? ????????? ?????? ?????? ?????? ????????? ?????????, ????????????, ?????? ?????????
        double totalCarbohydrate = 0.0;
        double totalProtein = 0.0;
        double totalFat = 0.0;

        DecimalFormat form = new DecimalFormat("#.##");

        // ?????? table ??? ??????
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
//            int foodNo = foodRepository.findFoodName("?????????");
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiaryNo, foodNo));

            // ?????? ?????? ?????? ?????? ??????
            int weight = dietRegisterReqList.get(i).getWeight();
            NutritionRes nutritionRes = foodRepository.findNutrition(foodNo);
            totalCarbohydrate += Double.parseDouble(form.format(nutritionRes.getCarbohydrate() * (weight / 100)));
            totalProtein += Double.parseDouble(form.format(nutritionRes.getProtein() * (weight / 100)));
            totalFat += Double.parseDouble(form.format(nutritionRes.getFat() * (weight / 100)));
        }

        // ?????? ?????? ??????????????? ??????
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

    /** ?????? ?????? ????????? ????????? ???????????? findByDietDiaryNo ?????????. **/
    public DietDiary findByDiaryNo(int dietDiaryNo) {
        return dietDiaryRepository.findById(dietDiaryNo);
    }

    /** ?????? ?????? ????????? ????????? ???????????? findByDietDiaryNo ?????????. **/
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

    /** ?????? ????????? ???????????? ????????? ?????? ?????? ????????? ???????????? findAllFood ?????????. **/
    @Override
    public List<DietDiaryFindRes> findAllByDiaryDate(String date, String userId) {
        // ????????? ????????? ?????? ?????? ?????? ????????????
        List<DietDiary> dietDiaryList = dietDiaryRepository.findByDiaryDateLike(date, userId);

        List<DietDiaryFindRes> dietDiaryFindResList = new ArrayList<DietDiaryFindRes>();
        for(int i=0; i<dietDiaryList.size(); i++) {
            // ?????? ????????? ????????? ?????? ?????? ?????? ?????? ??????
            DietDiaryFindRes dietDiaryFindRes = new DietDiaryFindRes();

            dietDiaryFindRes.setDiaryNo(dietDiaryList.get(i).getDiaryNo());
            dietDiaryFindRes.setImagePath(dietDiaryList.get(i).getImagePath());
            dietDiaryFindRes.setDiaryDate(dietDiaryList.get(i).getDiaryDate());
            dietDiaryFindRes.setMealTime(dietDiaryList.get(i).getMealTime());
            dietDiaryFindRes.setIsShared(dietDiaryList.get(i).getIsShared());
            dietDiaryFindRes.setDescription(dietDiaryList.get(i).getDescription());

            List<DietFindRes> dietFindResList = dietRepository.findAllDiet(dietDiaryList.get(i).getDiaryNo());
            dietDiaryFindRes.setDietFindResList(dietFindResList);

            // ????????? ????????? ?????????????????? ?????? list??? ??????
            dietDiaryFindResList.add(dietDiaryFindRes);
        }
        return dietDiaryFindResList;
    }

    /** ????????? ?????? ?????? ?????? ????????? ???????????? findAllFood ?????????. **/
    @Override
    public List<DietDiaryAllRes> findAllByUserId(String userId) {
        return dietDiaryRepository.findByUserId(userId);
    }

    /** ?????? ?????? ????????? ???????????? updateDietDiary ?????????. **/
    @Override
    public DietDiaryFindRes updateDietDiary(DietDiary dietDiary, DietDiaryRegisterReq dietDiaryRegisterReq, MultipartFile imagePath) throws Exception {
        // ????????? ????????? ?????????
        if(imagePath != null) {
            String savingFileName = s3FileUploadService.upload(imagePath);
            dietDiaryRegisterReq.setSaveImagePath(savingFileName);
        }

        // ?????? ?????? ????????? ??????
        dietDiary.updateDietDiary(dietDiaryRegisterReq);

        // ?????? ?????? ???????????? ????????? ?????? ?????? ?????? ????????? ?????????, ????????????, ?????? ?????????
        double totalCarbohydrate = 10.0;
        double totalProtein = 0.0;
        double totalFat = 0.0;

        DecimalFormat form = new DecimalFormat("#.##");

        // ?????? ????????? ????????? ????????? ?????? ???, ????????? ???????????? ??????
        dietRepository.deleteByDietDiary(dietDiary.getDiaryNo());
        List<DietRegisterReq> dietRegisterReqList = dietDiaryRegisterReq.getDietRegisterReqList();
        for(int i=0; i<dietRegisterReqList.size(); i++) {
            int foodNo = foodRepository.findFoodName(dietRegisterReqList.get(i).getFoodName());
//            int foodNo = 11;
            dietRepository.save(dietRegisterReqList.get(i).toEntity(dietDiary.getDiaryNo(), foodNo));

            // ?????? ?????? ?????? ?????? ??????
            int weight = dietRegisterReqList.get(i).getWeight();
            NutritionRes nutritionRes = foodRepository.findNutrition(foodNo);
            totalCarbohydrate += Double.parseDouble(form.format(nutritionRes.getCarbohydrate() * (weight / 100)));
            totalProtein += Double.parseDouble(form.format(nutritionRes.getProtein() * (weight / 100)));
            totalFat += Double.parseDouble(form.format(nutritionRes.getFat() * (weight / 100)));
        }

        // ?????? ?????? ??????????????? ??????
        String userId = dietDiary.getUserId().getUserId();
        LocalDate diaryDate = LocalDate.parse(dietDiaryRegisterReq.getDiaryDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        int diaryNo = dietDiaryRegisterReq.getDiaryNo();
        nutritionHistoryService.updateNutritionHistory(userId, diaryNo, diaryDate, totalCarbohydrate, totalProtein, totalFat);

        // ????????? ????????? ????????????
        return findByDietDiaryNo(dietDiary.getDiaryNo());
    }

    /** ?????? ?????? ????????? ???????????? deleteDietDiary ?????????. **/
    @Override
    public void deleteDietDiary(DietDiary dietDiary) {
        dietDiaryRepository.delete(dietDiary);
    }

    @Override
    public void updateDiaryShareStatus(int diaryNo) {
        dietDiaryRepository.updateShareStatus(diaryNo);
    }

    /** ????????? ???????????? foodSegmentation ?????????. **/
    @Override
    public DetectedObjects foodSegmentation(MultipartFile imagePath) throws IOException, ModelNotFoundException, MalformedModelException, TranslateException, ModelNotFoundException, MalformedModelException, TranslateException {
        int imageSize = 640;
        foodList = new ArrayList<>();
        Pipeline pipeline = new Pipeline();
        pipeline.add(new Resize(imageSize));
        pipeline.add(new ToTensor());

        Translator<Image, DetectedObjects> translator =  YoloV5Translator
                .builder()
                .setPipeline(pipeline)
                .optSynset(Arrays.asList("chickenbreast","tomato","salmon","steak","salad","egg","cucumber","milk","sweetpotato","rice","natto","tofu","broccoli"))
                .optThreshold(0.5f)
                .build();

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
                "accessKey",
                "secretAccessKey");

        S3Client client = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .region(Region.AP_NORTHEAST_2)
                .build();
        Repository.registerRepositoryFactory(new S3RepositoryFactory(client));
        Criteria<Image, DetectedObjects> criteria = Criteria.builder()
                .setTypes(Image.class, DetectedObjects.class)
                .optModelUrls("s3://helf-bucket/imageDetection")
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
        //????????? ?????? ??????
        List<DetectedObjects.DetectedObject> list = results.items();
        for (DetectedObjects.DetectedObject result : list) {
            String className = result.getClassName();
            System.out.println(className);
            foodsState.put(className, true);
        }
        Map<String, String> foodKname = new HashMap<String, String>() {{
            put("chickenbreast","????????????");
            put("tomato","?????????");
            put("salmon","??????");
            put("steak","??????????????????");
            put("salad","???????????????");
            put("egg","??????");
            put("cucumber","??????");
            put("milk","??????");
            put("sweetpotato","?????????");
            put("rice","???");
            put("natto","??????");
            put("tofu","??????");
            put("broccoli","????????????");
        }};

        foodsState.forEach((key, value)->{
            foodList.add(foodKname.get(key));
        });

        System.out.println(results);

        Path outputDir = Paths.get("src/main/resources/dist/model/result");
        Files.createDirectories(outputDir);



        ImageUtils.drawBoundingBoxes((BufferedImage) img.getWrappedImage(),results);

        //????????? ?????? ????????? ????????? img ??????

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
