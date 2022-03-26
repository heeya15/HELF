package com.aisher.helf.api.service;

import com.aisher.helf.api.request.UserAdditionalInfoRegisterReq;
import com.aisher.helf.api.request.UserFindPasswordReq;
import com.aisher.helf.api.request.UserRegisterReq;
import com.aisher.helf.api.request.UserUpdateReq;
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
	public User registerUser(UserRegisterReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setUserName(userRegisterInfo.getUserName());
		user.setUserEmail(userRegisterInfo.getUserEmail());
		return userRepository.save(user);
	}

	// 회원(유저) 정보 조회
	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		Optional<User> user = userRepositorySupport.findUserByUserId(userId);

		if(user.isPresent()) {
			System.out.println(">>>>>>>>>>>>>>> 유저 정보 : " + user.get());
			return user.get();
		} else {
			return null;
		}
	}

	// 회원 정보 수정 (이름, 비밀번호, 키, 몸무게 수정)
	@Transactional
	@Override
	public void updateUser(UserUpdateReq updateUserDto) {
		User user = userRepositorySupport.findUserByUserId(updateUserDto.getUserId()).get();
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		String password = passwordEncoder.encode(updateUserDto.getUserPassword());
		user.updateUser(updateUserDto, password);
	}

	@Override
	public boolean deleteByUserId(User user) {
		userRepository.delete(user);
		return true;
	}
	@Override
	public boolean checkUserId(String userId) {
		boolean result = userRepositorySupport.findByUserIdEquals(userId);
		return result;
	}

	@Override
	public boolean checkUserEmail(String userEmail) {
		System.out.println("이메일 체크 함수 들어옴??>> "+ userEmail);
		return userRepositorySupport.findByUserEmailEquals(userEmail);
	}

	@Override
	public User getUser(UserFindPasswordReq userFindPasswordPostReq) {
		String userId = userFindPasswordPostReq.getUserId();
		String userName = userFindPasswordPostReq.getUserName();
		String userEmail = userFindPasswordPostReq.getUserEmail();

		Optional<User> user = userRepository.findByUserIdAndUserNameAndUserEmail(userId, userName, userEmail);

		if(user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}

	@Override
	public List<User> findAll() {
		return null;
	}

	@Transactional
	@Override
	public User registerAdditionalUserInfo(UserAdditionalInfoRegisterReq userAdditionalInfoRegisterReq, String userId) {
		User user = userRepositorySupport.findUserByUserId(userId).get();
		user.updateAdditionalUserInfo(userAdditionalInfoRegisterReq.getWeight(), userAdditionalInfoRegisterReq.getHeight(), userAdditionalInfoRegisterReq.isGender());
		return null;
	}
}
