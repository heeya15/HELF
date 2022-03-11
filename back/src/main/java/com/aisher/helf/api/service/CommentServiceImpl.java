package com.aisher.helf.api.service;

import com.aisher.helf.api.request.CommentRegisterReq;
import com.aisher.helf.api.request.CommentUpdateReq;
import com.aisher.helf.api.response.CommentFindAllRes;
import com.aisher.helf.db.entity.Comment;
import com.aisher.helf.db.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;


/**
 *	댓글 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("commentService")
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	/** 댓글을 생성하는 registerComment 입니다. */
	@Override
	@Transactional
	public Comment registerComment(CommentRegisterReq commentReq) {
		Comment comment = commentRepository.save(commentReq.toEntity()); // 댓글 등록 시 댓글 수 증가.
		return comment;
	}

	/** 모든 댓글 정보를 가져오는 findAllByBoardNo 입니다. */
	@Override
	@Transactional
	public List<CommentFindAllRes> findAllByBoardNo(Long boardNo) {
		List<CommentFindAllRes> comments = commentRepository.findAllByBoardNo(boardNo);
		return comments;
	}
	/** 댓글 정보를 댓글 번호로 가져오는 findByCommentNo 입니다. */
	@Override
	public Comment findByCommentNo(int commentNo) {
		Comment comment = commentRepository.findById(commentNo).get();
		return comment;
	}
	/** 댓글 수정을 위한 updateComment 입니다. */
	@Override
	@Transactional
	public Comment updateComment(Comment comment, CommentUpdateReq commentReq) {
		comment.updateComment(commentReq);
		return comment;
	}
	/** 댓글 삭제를 위한 deleteComment 입니다. */
	@Override
	@Transactional
	public void deleteComment(Comment comment) {
		commentRepository.delete(comment);
	}
}
