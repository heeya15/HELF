package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;
import java.time.LocalDateTime;

/**
 * 해당 공유 게시글 상세 조회 API ([GET] /api/shareboard/find/{board_no}) 요청에 대한 응답값 정의.
 */

@ApiModel("ShareBoardFindGetRes")
public interface ShareBoardFindRes {
	String getUser_name();
	String getUser_id();
	int getBoard_no();
	String getDescription();
	LocalDateTime getCreated_at();
	int getDiary_no ();
	String getImage_path();
	int getWeight();               // 그램 수
	String getFood_name();         // 음식 이름
	int getKcal();                 // 칼로리
	Double getCarbohydrate();      // 탄수화물
	Double getProtein();           // 단백질
	Double getFat();               // 지방
}
