package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ShareBoardRegisterReq;
import com.aisher.helf.api.request.ShareBoardUpdateReq;
import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.api.response.ShareBoardAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.api.response.ShareBoardFindTopLikeRes;
import com.aisher.helf.api.response.ShareBoardSelectLikeCountRes;
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

	/** 공유 게시판에 게시글(식단 일지) 등록 **/
	ShareBoard registerShareBoard(ShareBoardRegisterReq shareBoardRegisterReq);

	/** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다. **/
	List<ShareBoardFindRes> findByShareBoardId(Long boardNo);
	void updateShareBoardHit(Long boardNo);
	/** 공유 게시글중 좋아요가 가장 많은 순서대로 5개 레코드 가져져오는 함수 입니다. **/
	List<ShareBoardFindTopLikeRes> findShareBoardByTopLike();

	/** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
	Page<ShareBoard> findAllShareBoard(Pageable pageable);
	Page<ShareBoardAllRes> findInfoShareBoard(Page<ShareBoard> shareBoards, String userId);

	ShareBoard updateShareBoardDescription(ShareBoard shareBoard,ShareBoardUpdateReq shareBoardUpdateReq);

	/** 공유 게시글을 삭제하는 deleteShareBoard 입니다. **/
	void deleteShareBoard(Long boardNo);

	/** 좋아요 부문 확인하고 세팅하는 메소드 */
	ShareBoard getShareBoard(Long boardNo);
	void setLikeList(String userId, Long boardNo);

	/** 내가 기록한 식단이 이미 공유 되어있는지 diaryNo 체크 **/
	boolean checkDiaryNo(int diaryNo);

	/** 해당 공유 게시글을 현재 로그인한 사용자가 좋아요 했는지 여부 체크 및 해당 게시글 총 좋아요 개수 반환 **/
	ShareBoardSelectLikeCountRes checkIsLikeAndTotalLikeCount(Long boardNo, String userId);
}
