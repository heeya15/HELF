package com.aisher.helf.api.request;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor /** Cannot construct instance of~ error를 해결해주었다.  파라미터가 없는 생성자 만들어줌* */ 
public class UserUpdateReq {
	@ApiModelProperty(name = "유저 id")
	private String userId;

	@ApiModelProperty(name = "유저 Password")
	private String userPassword;

	@ApiModelProperty(name = "유저 이름")
	private String userName;

	@ApiModelProperty(name = "유저 성별")
	private boolean gender;

	@ApiModelProperty(name = "유저 키")
	private int height;

	@ApiModelProperty(name = "유저 몸무게")
	private int weight;

	@ApiModelProperty(name = "유저 생년월일")
	private String birthday;
}
