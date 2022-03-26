package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.UserAdditionalInfoRegisterReq;
import com.aisher.helf.api.request.UserRegisterReq;
import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.api.response.UserRes;
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
	PasswordEncoder passwordEncoder;

	@Autowired
	UserService userService;

	// 회원 가입
	@PostMapping("/register/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다." +
			"아이디는 숫자나 문자를 사용하여 4 ~ 12 자리로 구성된다." +
			"비밀번호는 숫자, 문자, 특수기호를 조합하여 8 ~ 12 자리로 구성된다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> registerSignUp(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterReq registerInfo) {
		
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
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
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
	public ResponseEntity<String> updateUser(@RequestBody UserUpdateReq updateUserDto) throws Exception {
		User user;
		try {
			user = userService.getUserByUserId(updateUserDto.getUserId());
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
	@DeleteMapping("/remove/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId) throws Exception {
		boolean result;
		try {
			User user = userService.getUserByUserId(userId);
			result = userService.deleteByUserId(user);
		}catch(NoSuchElementException E) {
			logger.debug("회원 탈퇴 실패");
			return  ResponseEntity.status(500).body("해당 회원 없어서 회원 탈퇴 실패");
		}
		logger.debug("회원 탈퇴 성공");
		return ResponseEntity.status(200).body("회원 탈퇴 성공");
	}

	// 아이디 중복 체크
	@GetMapping("/idCheck/{userId}")
	@ApiOperation(value = "회원 아이디 중복 체크", notes = "회원가입 시 회원 아이디 중복 체크 검사 - <strong> true : 중복 없음 , false : 중복 있음<strong> ")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> idCheck(@PathVariable("userId") String userId) {
		System.out.println(userService.checkUserId(userId));
		if (userService.checkUserId(userId) == true) {
			System.out.println("id 중복이 없다");
			return ResponseEntity.status(200).body(userService.checkUserId(userId));
		} else System.out.println("id 중복이 있다.");
		return ResponseEntity.status(401).body(userService.checkUserId(userId));
	}

	// 이메일 중복 체크
	@GetMapping("/emailCheck/{userEmail}")
	@ApiOperation(value = "회원 이메일 중복 체크", notes = "회원가입 시 회원 이메일 중복 체크 검사. "
			+ "<strong>이메일이 중복: false, 이메일이 중복x : true 리턴시킴 <strong>")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> emailCheck(@PathVariable("userEmail") String userEmail) {
		System.out.println(">>>>>>>>>>>>>>>>>>>>> emailChk : " + userService.checkUserEmail(userEmail));
		if (userService.checkUserEmail(userEmail)==true) { // 이메일 중복이 없다면.
			return ResponseEntity.status(200).body(true);
		} else return ResponseEntity.status(401).body(false);
	}

	// 추가 유저 정보 등록
	@PostMapping("/register/AdditionalInfo")
	@ApiOperation(value = "추가 유저 정보 등록(token)", notes = "통계를 위한 <strong>추가적인 유저 정보를 등록</strong> 한다." +
			"성별은 남자면 false, 여자면 true 의 값을 넣는다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> registerSignUp(@RequestBody UserAdditionalInfoRegisterReq userAdditionalInfoRegisterReq, @ApiIgnore Authentication authentication) {
		UserDetails userDetails = (UserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();

		User user;
		try {
			user = userService.getUserByUserId(userId);
		}catch(NoSuchElementException E) {
			return  ResponseEntity.status(500).body(BaseResponseBody.of(500, "Bad Request"));
		}
		userService.registerAdditionalUserInfo(userAdditionalInfoRegisterReq, userId);
		System.out.println("추가 정보 등록 성공");

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
}
