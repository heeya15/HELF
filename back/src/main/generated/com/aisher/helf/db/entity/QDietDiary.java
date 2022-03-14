package com.aisher.helf.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDietDiary is a Querydsl query type for DietDiary
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDietDiary extends EntityPathBase<DietDiary> {

    private static final long serialVersionUID = 1779442964L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDietDiary dietDiary = new QDietDiary("dietDiary");

    public final StringPath description = createString("description");

    public final DateTimePath<java.time.LocalDateTime> diaryDate = createDateTime("diaryDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> diaryNo = createNumber("diaryNo", Integer.class);

    public final StringPath imagePath = createString("imagePath");

    public final BooleanPath isShared = createBoolean("isShared");

    public final StringPath mealTime = createString("mealTime");

    public final QUser userId;

    public QDietDiary(String variable) {
        this(DietDiary.class, forVariable(variable), INITS);
    }

    public QDietDiary(Path<? extends DietDiary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDietDiary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDietDiary(PathMetadata metadata, PathInits inits) {
        this(DietDiary.class, metadata, inits);
    }

    public QDietDiary(Class<? extends DietDiary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userId = inits.isInitialized("userId") ? new QUser(forProperty("userId")) : null;
    }

}

