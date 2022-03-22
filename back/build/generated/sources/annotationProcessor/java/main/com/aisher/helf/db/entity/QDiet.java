package com.aisher.helf.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiet is a Querydsl query type for Diet
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDiet extends EntityPathBase<Diet> {

    private static final long serialVersionUID = -264213521L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiet diet = new QDiet("diet");

    public final QDietDiary diaryNo;

    public final NumberPath<Integer> dietNo = createNumber("dietNo", Integer.class);

    public final QFood foodNo;

    public final NumberPath<Integer> weight = createNumber("weight", Integer.class);

    public QDiet(String variable) {
        this(Diet.class, forVariable(variable), INITS);
    }

    public QDiet(Path<? extends Diet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiet(PathMetadata metadata, PathInits inits) {
        this(Diet.class, metadata, inits);
    }

    public QDiet(Class<? extends Diet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.diaryNo = inits.isInitialized("diaryNo") ? new QDietDiary(forProperty("diaryNo"), inits.get("diaryNo")) : null;
        this.foodNo = inits.isInitialized("foodNo") ? new QFood(forProperty("foodNo")) : null;
    }

}

