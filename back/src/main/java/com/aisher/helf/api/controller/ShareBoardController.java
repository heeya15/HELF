package com.aisher.helf.api.controller;


import com.aisher.helf.api.request.ShareBoardLikeReq;
import com.aisher.helf.api.response.ShareBoardFindAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.api.service.ShareBoardService;
import com.aisher.helf.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<ShareBoardFindAllRes>> findAllShareBoard(){
        List<ShareBoardFindAllRes> shareboards = shareboardService.findAllShareBoard();
        System.out.println(shareboards.toString());
        return new ResponseEntity<List<ShareBoardFindAllRes>>(shareboards, HttpStatus.OK);
    }
    @GetMapping("/find/{board_no}")
    @ApiOperation(value ="공유 게시글 상세  조회", notes ="해당 Board_no 공유 게시판 상세 정보 출력")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<ShareBoardFindRes>> findShareBoardInfo(@PathVariable Long board_no) {
        List<ShareBoardFindRes> shareboardInfo = shareboardService.findByShareBoardId(board_no);
        return new ResponseEntity<List<ShareBoardFindRes>>(shareboardInfo, HttpStatus.OK);
    }

    @PostMapping("/like")
    @ApiOperation(value="공유 게시판 좋아요", notes="공유 게시글을 좋아요한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
    })
    public ResponseEntity<? extends BaseResponseBody> shareBoardLike(@RequestBody @ApiParam(required = true) ShareBoardLikeReq req) {
        shareboardService.setLikeList(req.getUserId(), req.getBoardNo());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }
}
