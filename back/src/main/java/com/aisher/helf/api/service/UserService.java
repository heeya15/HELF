package com.aisher.helf.api.service;

import com.aisher.helf.api.request.UserRegisterPostReq;
import com.aisher.helf.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
}
