package com.aisher.helf.api.service;

import com.aisher.helf.api.request.UserRegisterPostReq;
import com.aisher.helf.api.request.UserUpdatePutReq;
import com.aisher.helf.db.entity.User;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User registerUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	void updateUser(UserUpdatePutReq updateUserDto);
	boolean checkUserId(String userid);
	int checkUserEmail(String userEmail);
	boolean deleteByUserId(User user);
	public List<User> findAll();
}
