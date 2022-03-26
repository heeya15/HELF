package com.aisher.helf.api.service;

import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service("emailService")
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // 랜덤 비밀번호 생성
    @Override
    public String getRandomPassword(int len) {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                , 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'
                , 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b'
                , 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'
                , 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$'
                , '%', '^', '&' };


        int idx = 0; StringBuffer sb = new StringBuffer();
        System.out.println("charSet.length :::: "+charSet.length);

        for (int i = 0; i < len; i++) {
            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를 int로 추출 (소숫점제거)
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    // 임시 비밀번호 메일로 전송
    @Override
    public void sendMail(User user) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        String code = getRandomPassword(8);     //  임시 비밀번호 생성

        // 새로운 임시 비밀번호로 유저 정보 업데이트
        user.setUserPassword(passwordEncoder.encode(code));
        userRepository.save(user);

        // 메일 내용 작성
        String msg = "";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">임시 비밀번호 확인</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 제공받은 임시 비밀번호로 다시 로그인 해주세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += code;
        msg += "</td></tr></tbody></table></div>";
        msg += "<a href=\"#\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">HELF Clone Technologies, Inc</a>";
//        msg += "<a href=\"https://slack.com\" style=\"text-decoration: none; color: #434245;\" rel=\"noreferrer noopener\" target=\"_blank\">COSMOS Clone Technologies, Inc</a>";

        // 수신자 설정
        message.addRecipients(MimeMessage.RecipientType.TO, user.getUserEmail());

        // 메일 제목
        message.setSubject("[HELF] 임시 비밀번호 안내 이메일입니다.");

        // 메일 내용
        message.setText(msg, "utf-8", "html"); //내용

        javaMailSender.send(message);
    }
}
