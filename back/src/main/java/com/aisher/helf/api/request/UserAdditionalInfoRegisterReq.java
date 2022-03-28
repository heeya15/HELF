package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.DateTime;

import java.time.LocalDate;

/**
 * 유저 추가 정보 입력 API ([POST] /api/user) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("UserAdditionalInfoRegisterReq")
public class UserAdditionalInfoRegisterReq {
	@ApiModelProperty(name="유저 weight", example="60")
	private int weight;

	@ApiModelProperty(name="유저 height", example="160")
	private int height;

	@ApiModelProperty(name="유저 gender", example="0")
	private boolean gender;

	@ApiModelProperty(name="유저 생년월일", example="0")
	private String birthday;
}
