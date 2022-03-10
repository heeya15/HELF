package com.aisher.helf.api.service;

import java.util.List;
import com.aisher.helf.api.request.CommentRegisterPostReq;
import com.aisher.helf.api.request.CommentUpdateReq;
import com.aisher.helf.api.response.CommentFindAllRes;
import com.aisher.helf.db.entity.Comment;

/**
 * 스터디 모집 게시판의 게시글에 달리는 댓글 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface CommentService {
	/** 댓글을 생성하는 registerComment 입니다. */
	public Comment registerComment(CommentRegisterPostReq commentReq);
	
	/** 댓글 정보를 댓글 번호로 가져오는 findByCommentNo 입니다. */
	public Comment findByCommentNo(int comment_no);
	
	/** 모든 댓글 정보를 가져오는 findAllByBoardNo 입니다. */
	public List<CommentFindAllRes> findAllByBoardNo(Long board_no);

	/** 댓글 수정을 위한 updateComment 입니다. */
	public Comment updateComment(Comment comment, CommentUpdateReq commentReq);
	
	/** 댓글 삭제를 위한 deleteComment 입니다. */
	public void deleteComment(Comment comment);
}
