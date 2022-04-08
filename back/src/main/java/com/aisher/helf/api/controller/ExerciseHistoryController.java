package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.ExerciseHistoryRegisterReq;
import com.aisher.helf.api.response.ExerciseHistoryFindRes;
import com.aisher.helf.api.service.ExerciseHistoryService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.ExerciseHistory;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "운동 히스토리 API", tags = {"ExerciseHistory"})
@RestController
@RequestMapping("/api/exerciseHistory")
public class ExerciseHistoryController {
    public static final Logger logger = LoggerFactory.getLogger(FoodController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ExerciseHistoryService exerciseHistoryService;

    @PostMapping("/register")
    @ApiOperation(value = "운동 통계 등록", notes = "<strong>운동 통계</strong>를 통해 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerExerciseHistory(
            @RequestBody @ApiParam(value="운동 통계 등록", required = true) ExerciseHistoryRegisterReq exerciseHistoryRegisterReq, @ApiIgnore Authentication authentication) {

        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();

        ExerciseHistory exerciseHistory = exerciseHistoryService.registerExerciseHistory(exerciseHistoryRegisterReq, userId);
        if(exerciseHistory == null) {
            ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/findAll/{year}")
    @ApiOperation(value = "해당 년도의 운동 기록 전체 조회", notes = "<strong>원하는 년도에 해당하는 운동 기록</strong>을 전체 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ExerciseHistoryFindRes>> findAllByExerciseDateYear(
            @PathVariable("year") String year, @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        List<ExerciseHistoryFindRes> exerciseHistoryFindResList = exerciseHistoryService.findAllExerciseHistoryByYear(year, userId);

        return new ResponseEntity<List<ExerciseHistoryFindRes>>(exerciseHistoryFindResList, HttpStatus.OK);
    }
}
