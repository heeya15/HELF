package com.aisher.helf.common.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.aisher.helf.api.service.UserService;
import com.aisher.helf.db.entity.User;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@RequiredArgsConstructor
@Component
public class UserDetailService implements UserDetailsService{

	private final UserService userService;
	
    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    		User user = userService.getUserByUserId(username);
    		if(user != null) {
    			UserDetails userDetails = new UserDetails(user);
    			return userDetails;
    		}
    		return null;
    }
}
