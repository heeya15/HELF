package com.aisher.helf.api.controller;


import com.aisher.helf.api.response.ShareBoardFindAllGetRes;
import com.aisher.helf.api.response.ShareBoardFindGetRes;
import com.aisher.helf.api.service.ShareBoardService;
import com.aisher.helf.db.entity.ShareBoard;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 스터디 모집 게시판 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "스터디 모집 게시판 API", tags = { "ShareBoard" })
@RestController
@RequestMapping("/api/shareboard")
public class ShareBoardController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ShareBoardService shareboardService;

    /** 공유 게시글 전체 조회 입니다. */
    @ApiOperation(value="공유 게시글 전체 조회", notes="<strong>공유 게시글을 전체 조회를</strong>시켜줍니다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    @GetMapping("/findAll")
    public ResponseEntity<List<ShareBoardFindAllGetRes>> findAllShareBoard(){
        List<ShareBoardFindAllGetRes> shareboards = shareboardService.findAllShareBoard();
        System.out.println(shareboards.toString());
        return new ResponseEntity<List<ShareBoardFindAllGetRes>>(shareboards, HttpStatus.OK);
    }
    @GetMapping("/find/{board_no}")
    @ApiOperation(value ="공유 게시글 상세  조회", notes ="해당 Board_no 공유 게시판 상세 정보 출력")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<ShareBoardFindGetRes>> findShareBoardInfo(@PathVariable Long board_no) {
        List<ShareBoardFindGetRes> shareboardInfo = shareboardService.findByShareBoardId(board_no);
        return new ResponseEntity<List<ShareBoardFindGetRes>>(shareboardInfo, HttpStatus.OK);
    }
}
