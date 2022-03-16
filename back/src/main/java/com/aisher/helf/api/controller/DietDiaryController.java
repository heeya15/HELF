package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.DietDiaryRegisterReq;
import com.aisher.helf.api.response.DietDiaryFindRes;
import com.aisher.helf.api.service.DietDiaryService;
import com.aisher.helf.api.service.S3FileUploadService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.DietDiary;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "식단 일지 API", tags = {"DietDiary"})
@RestController
@RequestMapping("/api/dietdiary")
public class  DietDiaryController {
    public static final Logger logger = LoggerFactory.getLogger(FoodController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    DietDiaryService dietDiaryService;


    @PostMapping("/register")
    @ApiOperation(value = "식단 일지 등록", notes = "<strong>식단 일지</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerFood(
            @RequestPart @ApiParam(value="key", required = true) DietDiaryRegisterReq dietDiaryRegisterReq
            , @RequestPart @ApiParam(value="file") MultipartFile imagePath
            , @ApiIgnore Authentication authentication) {

        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();

        DietDiary dietDiary;
        try {
            dietDiaryRegisterReq.setUserId(userId);
            System.out.println(dietDiaryRegisterReq.getDietRegisterReqList().size());
            System.out.println(dietDiaryRegisterReq);
            dietDiary = dietDiaryService.registerDietDiary(dietDiaryRegisterReq, imagePath);
        } catch (Exception E) {
            E.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/find/{diaryNo}")
    @ApiOperation(value ="식단 일지 정보 조회", notes = "<strong>식단 일지 번호 (diaryNo)</strong>를 이용하여 식단 일지 정보를 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<DietDiaryFindRes> findByDiaryNo(@PathVariable int diaryNo) {

        DietDiaryFindRes dietDiaryFindRes = dietDiaryService.findByDietDiaryNo(diaryNo);
        return new ResponseEntity<DietDiaryFindRes>(dietDiaryFindRes, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{diaryNo}")
    @ApiOperation(value = "식단 일지 정보 삭제", notes = "<strong>식단 일지 번호</strong>을 통해 식단 일지 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteDietDiary(
            @PathVariable("diaryNo") int diaryNo) {
        DietDiary dietDiary;
        try {
            dietDiary = dietDiaryService.findByDiaryNo(diaryNo);
            dietDiaryService.deleteDietDiary(dietDiary);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }

}