package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.*;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.querydsl.core.types.Order.ASC;
import static com.querydsl.core.types.Order.DESC;

@Repository
public class ShareBoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QShareBoard qShareBoard = QShareBoard.shareBoard;

    public Page<ShareBoard> findAllShareBoard(Pageable pageable) {
        QueryResults<ShareBoard> shareBoards = jpaQueryFactory
                .select(qShareBoard)
                .from(qShareBoard)
                .orderBy(orderCondition(pageable))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetchResults();
        if(shareBoards == null) return Page.empty();
        return new PageImpl<ShareBoard>(shareBoards.getResults(), pageable, shareBoards.getTotal());
    }

    private OrderSpecifier[] orderCondition(Pageable pageable) {
        PathBuilder<ShareBoard> entityPath = new PathBuilder<>(ShareBoard.class, "shareBoard");
        return pageable.getSort() // (2)
                .stream() // (3)
                .map(order -> new OrderSpecifier(Order.valueOf(order.getDirection().name()), entityPath.get(order.getProperty()))) // (4)
                .toArray(OrderSpecifier[]::new); // (5)
    }

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
