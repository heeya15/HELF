package com.aisher.helf.api.controller;

import com.aisher.helf.api.response.DietDiaryFindRes;
import com.aisher.helf.api.response.NutritionHistoryFindRes;
import com.aisher.helf.api.response.NutritionHistoryRes;
import com.aisher.helf.api.service.NutritionHistoryService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.db.entity.NutritionHistory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "영양 정보 히스토리 API", tags = {"NutritionHistory"})
@RestController
@RequestMapping("/api/nutritionhistory")
public class NutritionHistoryController {
    public static final Logger logger = LoggerFactory.getLogger(NutritionHistoryController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    NutritionHistoryService nutritionHistoryService;

    @GetMapping("/find")
    @ApiOperation(value ="식단 일지 정보 조회(token)", notes = "유저의 <strong>일별 섭취 영양 성분 정보</strong>를 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<NutritionHistoryFindRes>> findNutritionHistory(@ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();

        List<NutritionHistoryFindRes> nutritionHistoryList = nutritionHistoryService.findAllNutritionHistoryByUserId(userId);
        for(int i=0; i<nutritionHistoryList.size(); i++) {
            System.out.print(nutritionHistoryList.get(i) + " ");
        }
        System.out.println();
        return new ResponseEntity<List<NutritionHistoryFindRes>>(nutritionHistoryList, HttpStatus.OK);
    }
}
