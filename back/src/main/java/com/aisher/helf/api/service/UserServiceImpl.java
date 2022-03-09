package com.aisher.helf.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aisher.helf.api.request.UserRegisterPostReq;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.repository.UserRepository;
import com.aisher.helf.db.repository.UserRepositorySupport;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUser_id());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUser_password()));
		user.setUserName(userRegisterInfo.getUser_name());
		user.setBirthday(userRegisterInfo.getBirthday());
		user.setUserEmail(userRegisterInfo.getUser_email());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public boolean checkUserId(String userid) {
		return false;
	}

	@Override
	public int checkUserEmail(String userEmail) {
		return 0;
	}

	@Override
	public boolean deleteByUserId(User user) {
		return false;
	}

	@Override
	public List<User> findAll() {
		return null;
	}
}
