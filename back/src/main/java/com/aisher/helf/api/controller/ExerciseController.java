package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.ExerciseRegisterReq;
import com.aisher.helf.api.service.ExerciseService;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.Exercise;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "운동 API", tags = {"Exercise"})
@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {
    public static final Logger logger = LoggerFactory.getLogger(FoodController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ExerciseService exerciseService;

    @PostMapping("/register")
    @ApiOperation(value = "운동 등록", notes = "<strong>운동 정보</strong>를 통해 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerExercise(
            @RequestBody @ApiParam(value="음식 등록", required = true) ExerciseRegisterReq exerciseRegisterReq) {

        Exercise exercise = exerciseService.registerExercise(exerciseRegisterReq);
        if(exercise == null) {
            ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


}
