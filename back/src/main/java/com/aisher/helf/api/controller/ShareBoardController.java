package com.aisher.helf.api.controller;


import com.aisher.helf.api.request.ShareBoardRegisterReq;
import com.aisher.helf.api.request.ShareBoardUpdateReq;
import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.api.response.ShareBoardAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.api.response.ShareBoardFindTopLikeRes;
import com.aisher.helf.api.response.ShareBoardSelectLikeCountRes;
import com.aisher.helf.api.service.DietDiaryService;
import com.aisher.helf.api.service.ShareBoardService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.ShareBoard;
import com.aisher.helf.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.NoSuchElementException;

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
    ShareBoardService shareBoardService;

    @Autowired
    DietDiaryService dietDiaryService;

    // 공유 게시글 생성
    @PostMapping("/register")
    @ApiOperation(value = "게시글 등록", notes = "<strong>공유 식단 일지 정보</strong>를 공유 게시판에 통해 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerShareBoard(
            @RequestBody @ApiParam(value="게시글 등록", required = true) ShareBoardRegisterReq shareBoardRegisterReq) {

        ShareBoard shareBoard = shareBoardService.registerShareBoard(shareBoardRegisterReq);
        if(shareBoard == null) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Bad Request"));
        }

        // 해당 식단 일지 공유 여부 상태 변경
        dietDiaryService.updateDiaryShareStatus(shareBoardRegisterReq.getDiaryNo());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


    /** 공유 게시글 전체 조회 입니다. + pagination
     *  page랑 size랑 sort는 url에 담아서 넘겨줘야 함.
     *  PageableDefault 에 page 는 기본 0이 처음 페이지 시작 / 인자로 받는 page는 1이 맨 처음 페이지 이다.
     *  */
    @ApiOperation(value="공유 게시글 전체 조회(token)", notes="<strong>공유 게시글을 전체 조회를</strong>시켜줍니다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    @GetMapping("/findAll")
    public ResponseEntity<Page<ShareBoardAllRes>> findAllShareBoard(@PageableDefault(page = 0, size =8, sort = "boardNo", direction = Sort.Direction.DESC) Pageable pageable, @ApiIgnore Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();

        System.out.println(pageable.getSort());
        Page<ShareBoard> shareBoards = shareBoardService.findAllShareBoard(pageable);
        Page<ShareBoardAllRes> shareBoardAllRes = shareBoardService.findInfoShareBoard(shareBoards, userId);
        return ResponseEntity.status(200).body(shareBoardAllRes);
    }

    @GetMapping("/find/{boardNo}")
    @ApiOperation(value ="공유 게시글 상세  조회", notes ="해당 boardNo 공유 게시판 상세 정보 출력")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<ShareBoardFindRes>> findShareBoardInfo(@PathVariable Long boardNo) {
        List<ShareBoardFindRes> shareboardInfo = shareBoardService.findByShareBoardId(boardNo);
        return new ResponseEntity<List<ShareBoardFindRes>>(shareboardInfo, HttpStatus.OK);
    }

    @GetMapping("/find/isLike/{boardNo}")
    @ApiOperation(value ="해당 게시글 좋아요 여부 조회 및 총 좋아요 개수 조회(token)", notes ="해당 boardNo 공유 게시판 좋아요 여부 출력 <strong>찜 했을 경우 : true, 찜 안 했을 경우 false <strong>")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<ShareBoardSelectLikeCountRes> findShareBoardIsLikeAndTotalLikeCount(@PathVariable Long boardNo, @ApiIgnore Authentication authentication ) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        ShareBoardSelectLikeCountRes isLike = shareBoardService.checkIsLikeAndTotalLikeCount(boardNo,userId);

        return new ResponseEntity<ShareBoardSelectLikeCountRes>(isLike, HttpStatus.OK);
    }
    @GetMapping("/findAll/like")
    @ApiOperation(value ="공유 게시글중 좋아요 개수가 많은 5개 레코드 조회", notes ="공유 게시글중 좋아요 개수가 많은 5개 레코드 조회")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<ShareBoardFindTopLikeRes>> findShareBoardTopLike() {
        List<ShareBoardFindTopLikeRes> shareboardInfo = shareBoardService.findShareBoardByTopLike();
        return new ResponseEntity<List<ShareBoardFindTopLikeRes>>(shareboardInfo, HttpStatus.OK);
    }

    @PostMapping("/like/{boardNo}")
    @ApiOperation(value="공유 게시판 좋아요(token)", notes="공유 게시글을 좋아요한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
    })
    public ResponseEntity<? extends BaseResponseBody> shareBoardLike(@PathVariable Long boardNo, @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        shareBoardService.setLikeList(userId, boardNo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    // 공유 게시글중 해당 게시글 description 수정
    @ApiOperation(value = "해당 게시글 description 수정 ", notes = "해당 게시글 description 수정 ")
    @PutMapping("/update/description")
    public ResponseEntity<String> updateShareBoardDescription(@RequestBody ShareBoardUpdateReq shareBoardUpdateReq) throws Exception {
        ShareBoard shareBoard;
        try {
            shareBoard = shareBoardService.getShareBoard(shareBoardUpdateReq.getBoardNo());
        }catch(NoSuchElementException E) {
            System.out.println("공유 게시글중 해당 게시글 description 수정 실패");
            return  ResponseEntity.status(500).body("공유 게시글중 해당 게시글 description 수정 실패");
        }
        ShareBoard updateShareBoard = shareBoardService.updateShareBoardDescription(shareBoard,shareBoardUpdateReq);
        System.out.println("공유 게시글중 해당 게시글 description 수정 성공");
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("/remove")
    @ApiOperation(value = "게시글 삭제(param)", notes = "<strong>게시글 번호</strong>를 통해 공유 게시판에서 해당 식단 일지 정보를 삭제한다." +
            "param으로 boardNo와 diaryNo을 넘겨받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteDietDiary(@RequestParam("boardNo") Long boardNo, @RequestParam("diaryNo") int diaryNo) {
        try {
            // 해당 게시글을 공유 게시판에서 삭제
            shareBoardService.deleteShareBoard(boardNo);
            // 해당 식단 일지 공유 여부 상태 변경
            dietDiaryService.updateDiaryShareStatus(diaryNo);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }

    // 내가 기록한 식단이 이미 공유 되어있는지 체크
    @GetMapping("/diaryNoCheck/{diaryNo}")
    @ApiOperation(value = "내가 기록한 식단을 공유 게시판에 이미 공유 되어있는지 체크", notes = "기록한 식단 공유 버튼 클릭 시 공유 게시판에 <strong> [ false : 공유된게 있을경우 ], [ true : 공유된게 없을 경우 ]<strong> ")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
                    @ApiResponse(code = 401, message = "인증 실패"),
                    @ApiResponse(code = 404, message = "사용자 없음"),
                    @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> diaryNoCheck(@PathVariable("diaryNo") int diaryNo) {

        if (shareBoardService.checkDiaryNo(diaryNo) == true) {
            return ResponseEntity.status(200).body(shareBoardService.checkDiaryNo(diaryNo));
        }
        return ResponseEntity.status(200).body(shareBoardService.checkDiaryNo(diaryNo));
    }
}
