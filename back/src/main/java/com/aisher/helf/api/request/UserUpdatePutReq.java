package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor /** Cannot construct instance of~ error를 해결해주었다.  파라미터가 없는 생성자 만들어줌* */ 
public class UserUpdatePutReq {
	@ApiModelProperty(name = "유저 id")
	private String user_id;

	@ApiModelProperty(name = "유저 Password")
	private String user_password;

	@ApiModelProperty(name = "유저 이름")
	private String user_name;
}
