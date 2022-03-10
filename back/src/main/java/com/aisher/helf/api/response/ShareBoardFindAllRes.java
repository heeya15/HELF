package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;

import java.time.LocalDateTime;

/**
 * 해당 공유 게시글 전체 조회 API ([GET] /api/shareboard/findAll) 요청에 대한 응답값 정의.
 */

@ApiModel("ShareBoardFindAllGetRes")
public interface ShareBoardFindAllRes {
	int getBoard_no();
	int getHit();
	LocalDateTime getCreated_at();
	String getImage_path();
	String getDescription();
}
