package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.QShareBoard;
import com.aisher.helf.db.entity.ShareBoard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ShareBoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QShareBoard qShareBoard = QShareBoard.shareBoard;

    public Optional<ShareBoard> findShareBoardByBoardNo(Long boardNo){

        ShareBoard shareBoard = jpaQueryFactory
                .select(qShareBoard)
                .from(qShareBoard)
                .where(qShareBoard.boardNo.eq(boardNo))
                .fetchOne();
        if(shareBoard == null) return Optional.empty();

        return Optional.ofNullable(shareBoard);
    }
}
