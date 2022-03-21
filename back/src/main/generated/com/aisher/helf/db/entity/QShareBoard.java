package com.aisher.helf.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShareBoard is a Querydsl query type for ShareBoard
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QShareBoard extends EntityPathBase<ShareBoard> {

    private static final long serialVersionUID = -1059259902L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShareBoard shareBoard = new QShareBoard("shareBoard");

    public final NumberPath<Long> boardNo = createNumber("boardNo", Long.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final QDietDiary diaryNo;

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    public final ListPath<Comment, QComment> replies = this.<Comment, QComment>createList("replies", Comment.class, QComment.class, PathInits.DIRECT2);

    public QShareBoard(String variable) {
        this(ShareBoard.class, forVariable(variable), INITS);
    }

    public QShareBoard(Path<? extends ShareBoard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShareBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShareBoard(PathMetadata metadata, PathInits inits) {
        this(ShareBoard.class, metadata, inits);
    }

    public QShareBoard(Class<? extends ShareBoard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.diaryNo = inits.isInitialized("diaryNo") ? new QDietDiary(forProperty("diaryNo"), inits.get("diaryNo")) : null;
    }

}

