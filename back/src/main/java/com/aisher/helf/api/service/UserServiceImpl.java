package com.aisher.helf.api.service;

import com.aisher.helf.api.request.UserFindPasswordPostReq;
import com.aisher.helf.api.request.UserRegisterPostReq;
import com.aisher.helf.api.request.UserUpdatePutReq;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.repository.UserRepository;
import com.aisher.helf.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
	public User registerUser(UserRegisterPostReq userRegisterInfo) {
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
	@Transactional
	@Override
	public void updateUser(UserUpdatePutReq updateUserDto) {
		System.out.println("수정 들어옴?");
		User user = userRepositorySupport.findUserByUserId(updateUserDto.getUser_id()).get();
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		String password = passwordEncoder.encode(updateUserDto.getUser_password());
		user.updateUser(updateUserDto.getUser_name(),password);
	}

	@Override
	public boolean deleteByUserId(User user) {
		userRepository.delete(user);
		return true;
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
	public User getUser(UserFindPasswordPostReq userFindPasswordPostReq) {
		String userId = userFindPasswordPostReq.getUser_id();
		String userName = userFindPasswordPostReq.getUser_name();
		String userEmail = userFindPasswordPostReq.getUser_email();

		Optional<User> user = userRepository.findByUserIdAndUserNameAndUserEmail(userId, userName, userEmail);

		if(user.isPresent()) {
			return userRepository.findByUserIdAndUserNameAndUserEmail(userId, userName, userEmail).get();
		} else {
			return null;
		}
	}

	@Override
	public List<User> findAll() {
		return null;
	}
}
