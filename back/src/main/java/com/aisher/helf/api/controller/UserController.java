package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.UserRegisterPostReq;
import com.aisher.helf.api.request.UserUpdatePutReq;
import com.aisher.helf.api.response.UserGetRes;
import com.aisher.helf.api.service.UserService;
import com.aisher.helf.common.auth.UserDetails;
import com.aisher.helf.common.model.response.BaseResponseBody;
import com.aisher.helf.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.NoSuchElementException;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/user")
public class UserController {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/register/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> registerSignUp(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.registerUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// 회원 정보 조회
	@GetMapping("/find/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserGetRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserGetRes.of(user));
	}

	// 비밀번호 확인
	@PostMapping("/checkPassword")
	@ApiOperation(value = "비밀번호 확인(token)(param)", notes = "유저 정보 수정을 위한 <strong>비밀번호 확인</strong> 한다.<br/> 비밀번호(userPassword)를 입력받는다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<String> checkUserPassword(
			@RequestParam @ApiParam(value="비밀번호 확인", required = true) String userPassword, @ApiIgnore Authentication authentication) {

		UserDetails userDetails = (UserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);

		if(passwordEncoder.matches(userPassword, user.getUserPassword())) {
			return ResponseEntity.status(200).body("Success");
		}
		return ResponseEntity.status(401).body("Invalid Password");
	}

	// 회원 정보 수정 (이름, 비밀번호 수정)
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보 수정")
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody UserUpdatePutReq updateUserDto) throws Exception {
		User user;
		try {
			user = userService.getUserByUserId(updateUserDto.getUser_id());
		}catch(NoSuchElementException E) {
			System.out.println("회원 수정 실패");
			return  ResponseEntity.status(500).body("해당 회원 정보가 없어서 회원 수정 실패");
		}
		userService.updateUser(updateUserDto);
		System.out.println("회원 정보 수정 성공");
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	// 회원탈퇴.
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			        @ApiResponse(code = 401, message = "인증 실패"),
			        @ApiResponse(code = 404, message = "사용자 없음"),
			        @ApiResponse(code = 500, message = "해당 회원 없음")})
	@DeleteMapping("/remove/{user_id}")
	public ResponseEntity<String> deleteUser(@PathVariable("user_id") String id) throws Exception {
		boolean result;
		try {
			User user = userService.getUserByUserId(id);
			result = userService.deleteByUserId(user);
		}catch(NoSuchElementException E) {
			logger.debug("회원 탈퇴 실패");
			return  ResponseEntity.status(500).body("해당 회원 없어서 회원 탈퇴 실패");
		}
		logger.debug("회원 탈퇴 성공");
		return ResponseEntity.status(200).body("회원 탈퇴 성공");
	}
}
