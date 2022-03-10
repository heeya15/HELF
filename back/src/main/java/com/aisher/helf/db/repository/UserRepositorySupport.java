package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.QUser;
import com.aisher.helf.db.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByUserId(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

//    public Optional<User> findByUserIdAndUserNameAndUserEmail(String userId, String userName, String userEmail) {
//        User user = jpaQueryFactory.select(qUser).from(qUser)
//                .where(qUser.userId.eq(userId)
//                .and(qUser.userName.eq(userName)
//                .and(qUser.userEmail.eq(userEmail))))
//                .fetchOne();
//
//        if(user == null) return Optional.empty();
//        return Optional.ofNullable(user);
//    }



}
