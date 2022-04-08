package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;;
import java.time.LocalDate;

/**
 * 사용자 daily 체중 등록 API ([POST] /api/weight/history/register/weight) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("WeightHistoryrRegisterReq")
public class WeightHistoryrRegisterReq {

	@ApiModelProperty(name="등록 날짜", example="")
	private String createdAt;

	@ApiModelProperty(name="유저 ID", example="ssafy")
	private String userId;

	@ApiModelProperty(name="유저 몸무게", example="58")
	private int weight;
}
