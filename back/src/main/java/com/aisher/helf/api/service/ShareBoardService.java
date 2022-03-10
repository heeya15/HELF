package com.aisher.helf.api.service;

import com.aisher.helf.api.response.ShareBoardFindAllGetRes;
import com.aisher.helf.api.response.ShareBoardFindGetRes;
import com.aisher.helf.db.entity.ShareBoard;
import java.util.List;

/**
 *	공유 게시판 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ShareBoardService {

	/** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다.
	 * @return*/
	public List<ShareBoardFindGetRes> findByShareBoardId(Long board_no);

	/** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
	public List<ShareBoardFindAllGetRes> findAllShareBoard();
}
