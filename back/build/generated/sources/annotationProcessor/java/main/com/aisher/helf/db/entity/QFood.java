package com.aisher.helf.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QFood is a Querydsl query type for Food
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFood extends EntityPathBase<Food> {

    private static final long serialVersionUID = -264147879L;

    public static final QFood food = new QFood("food");

    public final NumberPath<java.math.BigDecimal> carbohydrate = createNumber("carbohydrate", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> fat = createNumber("fat", java.math.BigDecimal.class);

    public final StringPath foodName = createString("foodName");

    public final NumberPath<Integer> foodNo = createNumber("foodNo", Integer.class);

    public final NumberPath<Integer> kcal = createNumber("kcal", Integer.class);

    public final NumberPath<java.math.BigDecimal> protein = createNumber("protein", java.math.BigDecimal.class);

    public QFood(String variable) {
        super(Food.class, forVariable(variable));
    }

    public QFood(Path<? extends Food> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFood(PathMetadata metadata) {
        super(Food.class, metadata);
    }

}

