package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.CommentRegisterReq;
import com.aisher.helf.api.request.CommentUpdateReq;
import com.aisher.helf.api.response.CommentFindAllRes;
import com.aisher.helf.api.service.CommentService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.Comment;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * 공유 게시판 댓글 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "공유 게시판 댓글 API", tags = { "Comment" })
@RestController
@RequestMapping("/api/comment")
public class CommentController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	CommentService commentService;
	
	/** 댓글 등록 하기입니다. */
	@PostMapping("/register")
	@ApiOperation(value="댓글 등록 (token)같이 보내줘야함", notes="<strong>댓글을 등록</strong>시켜줍니다. ")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), 
					@ApiResponse(code = 401, message = "인증 실패"),
					@ApiResponse(code = 404, message = "댓글 없음"), 
					@ApiResponse(code = 500, message = "서버 오류")})
	public ResponseEntity CommentRegister(@RequestBody CommentRegisterReq commentReq, @ApiIgnore Authentication authentication)
	{
		UserDetails userDetails = (UserDetails) authentication.getDetails();
		String user_id = userDetails.getUsername();
		
		Comment comment;
		try {
			commentReq.setUserId(user_id);
			comment = commentService.registerComment(commentReq);
		}catch(Exception E) {
			E.printStackTrace();
			return  ResponseEntity.status(500).body("디비 트랜잭션 오류로 인한 생성 실패");
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	/** 댓글 전체 조회 입니다. */
	@ApiOperation(value="해당 게시글에 대한 댓글 전체 조회", notes="<strong>해당 게시글에 대한 댓글 전체 조회를</strong>시켜줍니다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
					@ApiResponse(code = 401, message = "인증 실패"),
					@ApiResponse(code = 404, message = "댓글 없음"),
					@ApiResponse(code = 500, message = "서버 오류")})
	@GetMapping("/findAll/{board_no}")
    public ResponseEntity<List<CommentFindAllRes>> findAllComment(@PathVariable Long boardNo){
        List<CommentFindAllRes> comments = commentService.findAllByBoardNo(boardNo);
        return new ResponseEntity<List<CommentFindAllRes>>(comments,HttpStatus.OK);
    }

	/** 해당 게시글에 달린 댓글 전체 개수 조회 입니다. */
	@ApiOperation(value="해당 게시글 댓글 전체 개수 조회", notes="<strong>해당 게시글 댓글 전체 개수 조회를</strong>시켜줍니다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "댓글 없음"),
			@ApiResponse(code = 500, message = "서버 오류")})
	@GetMapping("/find/{board_no}")
	public ResponseEntity<Integer> findReplyCnt(@PathVariable Long boardNo){
		List<CommentFindAllRes> comments = commentService.findAllByBoardNo(boardNo);
		return new ResponseEntity<Integer>(comments.size(),HttpStatus.OK);
	}

	/** 댓글 수정 입니다. */
	@ApiOperation(value = "댓글 정보 수정 (token)", notes = "댓글 정보 수정.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
					@ApiResponse(code = 401, message = "인증 실패"),
					@ApiResponse(code = 404, message = "댓글 없음"),
					@ApiResponse(code = 500, message = "서버 오류") })
	@PutMapping("/update")
	public ResponseEntity<String> updateComment(@RequestBody CommentUpdateReq commentReq) throws Exception {
		Comment comment;
		try {
			comment = commentService.findByCommentNo(commentReq.getCommentNo());
		}catch(NoSuchElementException E) {
			return  ResponseEntity.status(500).body("해당 댓글이 없어서 댓글 수정 실패");
		}
		Comment updateComment = commentService.updateComment(comment, commentReq);
		return new ResponseEntity<String>(SUCCESS+"\n"+updateComment, HttpStatus.OK);
	}

	/** 댓글 삭제. */
	@ApiOperation(value = "[해당 댓글] 삭제 ", notes = "[해당 댓글] 삭제")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
					@ApiResponse(code = 401, message = "인증 실패"),
					@ApiResponse(code = 404, message = "댓글 없음"),
					@ApiResponse(code = 500, message = "서버 오류")})
	@DeleteMapping("/remove/{commentNo}")
	public ResponseEntity<String> deleteComment(@PathVariable("commentNo") int commentNo) throws Exception {
		Comment comment;
		try {
			comment = commentService.findByCommentNo(commentNo);
			commentService.deleteComment(comment);
		}catch(Exception e ) {
			e.printStackTrace();
			return  ResponseEntity.status(500).body("해당 댓글이 없어 삭제 "+FAIL);
		}
		return ResponseEntity.status(200).body(comment.getCommentNo()+"번 해당 댓글 삭제"+SUCCESS);
	}
}