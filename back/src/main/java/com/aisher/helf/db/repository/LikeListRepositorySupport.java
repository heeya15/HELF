package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.LikeList;
import com.aisher.helf.db.entity.QLikeList;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class LikeListRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLikeList qLikeList = QLikeList.likeList;

    // 좋아요 체크
    public Optional<LikeList> findLikeListByUserIdAndBoardNo(String userId, Long boardNo) {
        LikeList likeList = jpaQueryFactory
                .select(qLikeList)
                .from(qLikeList)
                .where(qLikeList.user.userId.eq(userId).and(qLikeList.shareBoard.boardNo.eq(boardNo)))
                .fetchOne();
        if(likeList == null) return Optional.empty();
        return Optional.ofNullable(likeList);
    }
}
