package com.aisher.helf.api.service;

import com.aisher.helf.api.request.UserAdditionalInfoRegisterReq;
import com.aisher.helf.api.request.UserFindPasswordReq;
import com.aisher.helf.api.request.UserRegisterReq;
import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.db.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
@Service
public interface UserService {
	User registerUser(UserRegisterReq userRegisterInfo);
	User getUserByUserId(String userId);
	void updateUser(UserUpdateReq updateUserDto);
	boolean checkUserId(String userId);
	boolean checkUserEmail(String userEmail);
	boolean deleteByUserId(User user);
	User getUser(UserFindPasswordReq userFindPasswordPostReq);
	public List<User> findAll();
	User registerAdditionalUserInfo(UserAdditionalInfoRegisterReq userAdditionalInfoRegisterReq, String userId);
}
