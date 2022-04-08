package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;

import java.time.LocalDateTime;

/**
 * 해당 공유 게시글 상세 조회 API ([GET] /api/shareboard/find/{board_no}) 요청에 대한 응답값 정의.
 */

@ApiModel("ShareBoardFindTopLikeRes")
public interface ShareBoardFindTopLikeRes {
	int getBoard_no();
	int getCount(); // 좋아요 수
	String getDescription();
	int getHit();
	int getDiary_no ();
	String getImage_path();		    // 이미지 경로
}
