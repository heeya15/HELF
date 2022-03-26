package com.aisher.helf.api.service;

import com.aisher.helf.api.response.ShareBoardAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.db.entity.ShareBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *	공유 게시판 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
@Service
public interface ShareBoardService {

	/** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다.
	 * @return*/
	public List<ShareBoardFindRes> findByShareBoardId(Long boardNo);

	/** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
	Page<ShareBoard> findAllShareBoard(Pageable pageable);
	Page<ShareBoardAllRes> findInfoShareBoard(Page<ShareBoard> shareBoards, String userId);

	/** 좋아요 부문 확인하고 세팅하는 메소드 */
	ShareBoard getShareBoard(Long boardNo);
	void setLikeList(String userId, Long boardNo);
}
