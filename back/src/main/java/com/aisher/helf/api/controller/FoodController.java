package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.FoodRegisterReq;
import com.aisher.helf.api.service.FoodService;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.Food;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@Api(value = "음식 API", tags = {"Food"})
@RestController
@RequestMapping("/api/food")
public class FoodController {
    public static final Logger logger = LoggerFactory.getLogger(FoodController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    FoodService foodService;

    @PostMapping("/register")
    @ApiOperation(value = "음식 등록", notes = "<strong>음식 정보</strong>를 통해 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerFood(
            @RequestBody @ApiParam(value="음식 등록", required = true) FoodRegisterReq foodRegisterReq) {

        Food food = foodService.registerFood(foodRegisterReq);
        if(food == null) {
            ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /** 음식 정보 전체 조회 입니다. */
    @GetMapping("/findAll")
    @ApiOperation(value="음식 정보 전체 조회", notes="<strong>저장된 모든 음식정보</strong>를 조회합니다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "댓글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<Food>> findAllFood(){
        List<Food> foods = foodService.findAllFood();
        for(int i=0; i<foods.size(); i++) {
            System.out.println(foods.get(i).toString());
        }
        return new ResponseEntity<List<Food>>(foods, HttpStatus.OK);
    }

    /** 음식 정보 수정입니다. */
    @PutMapping("/update")
    @ApiOperation(value="음식 정보 수정", notes="<strong>해당 음식정보</strong>를 수정합니다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "댓글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> updateFood(@RequestBody @ApiParam(value="음식 수정", required = true) FoodRegisterReq foodRegisterReq) {
        Food food;
        try {
            food = foodService.findByFoodNo(foodRegisterReq.getFoodNo());
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }
        foodService.updateFood(food, foodRegisterReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/remove/{foodNo}")
    @ApiOperation(value = "음식 삭제", notes = "<strong>음식 번호</strong>을 통해 음식 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteFood(
            @PathVariable("foodNo") int foodNo) {
        Food food;
        try {
            food = foodService.findByFoodNo(foodNo);
            foodService.deleteFood(food);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }
}
