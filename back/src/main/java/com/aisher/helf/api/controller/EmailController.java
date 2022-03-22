package com.aisher.helf.api.controller;

import com.aisher.helf.api.request.UserFindPasswordReq;
import com.aisher.helf.api.service.EmailService;
import com.aisher.helf.api.service.UserService;
import com.aisher.helf.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

/**
 * 이메일 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "이메일  API", tags = { "Email" })
@RestController
@RequestMapping("/api/email")
public class EmailController {
    public static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @PostMapping("/send")
    @ApiOperation(value = "임시비밀번호 전송", notes = "<strong>이메일로 임시비밀번호</strong>를 전송한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<String> sendMail(@RequestBody @ApiParam(value="회원 정보", required = true) UserFindPasswordReq userFindPasswordPostReq) throws MessagingException {
        User user = userService.getUser(userFindPasswordPostReq);
        if(user != null) {
            emailService.sendMail(user);    // 이메일 전송
            return ResponseEntity.status(200).body("Email Sent");
        } else {
            return ResponseEntity.status(404).body("Account Not Found");
        }
    }

    @GetMapping("/emailCheck/{user_email}")
    @ApiOperation(value = "회원 이메일 중복 체크", notes = "회원가입 시 회원 이메일 중복 체크 검사. "
            + "<strong>이메일이 중복: false, 이메일이 중복x : true 리턴시킴 <strong>")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
                    @ApiResponse(code = 401, message = "인증 실패"),
                    @ApiResponse(code = 404, message = "사용자 없음"),
                    @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> emailCheck(@PathVariable("user_email") String user_email) {
        System.out.println(">>>>>>>>>>>>>>>>>>>>> emailChk : " + userService.checkUserEmail(user_email));
        if (userService.checkUserEmail(user_email)==true) { // 이메일 중복이 없다면.
            return ResponseEntity.status(200).body(true);
        } else return ResponseEntity.status(401).body(false);
    }
}
