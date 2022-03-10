package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

/**
 * 유저 비밀번호 찾기 API ([POST] /api/email/send/{user_email}) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserFindPasswordPostRequest")
public class UserFindPasswordPostReq {

	@ApiModelProperty(name="유저 ID", example="polyjjang")
	private String user_id;

	@ApiModelProperty(name="유저 Name", example="hanpoly")
	private String user_name;

	@ApiModelProperty(name="유저 Email", example="gmldi1357@gmail.com")
	@Email(message = "이메일 형식이 아닙니다.")
	private String user_email;
}
