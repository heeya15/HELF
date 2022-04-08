package com.aisher.helf.api.service;

import com.aisher.helf.db.entity.User;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

/**
 * 임시 비밀번호를 이메일로 전송하기 위한 서비스 인터페이스 정의.
 */
@Service
public interface EmailService {
    String getRandomPassword(int len);      // 임시 비밀번호 생성
    void sendMail(User user) throws MessagingException;   // 임시 비밀번호 메일로 전송
}
