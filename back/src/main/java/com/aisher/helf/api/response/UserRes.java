package com.aisher.helf.api.response;

import com.aisher.helf.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes {
	@ApiModelProperty(name="User ID")
	String userId;

	@ApiModelProperty(name="User name")
	String userName;

	@ApiModelProperty(name="User email")
	String userEmail;

	@ApiModelProperty(name="User gender")
	boolean gender;

	@ApiModelProperty(name="User height")
	int height;

	@ApiModelProperty(name="User weight")
	int weight;

	@ApiModelProperty(name="User birthday")
	LocalDate birthday;

	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserEmail(user.getUserEmail());
		res.setGender(user.isGender());
		res.setHeight(user.getHeight());
		res.setWeight(user.getWeight());
		res.setBirthday(user.getBirthday());
		return res;
	}
}
