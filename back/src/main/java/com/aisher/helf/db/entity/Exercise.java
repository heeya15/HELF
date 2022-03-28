package com.aisher.helf.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Exercise {
    @Id
    @Column(name = "exercise_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long exerciseNo;

    @Column(name ="exercise_name", length=20)
    String exerciseName;

}
