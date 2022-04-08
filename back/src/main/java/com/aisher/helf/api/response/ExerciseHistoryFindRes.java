package com.aisher.helf.api.response;

import com.aisher.helf.db.repository.ExerciseRepositorySupport;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Data
@ApiModel("ExerciseHistoryFindRes")
public class ExerciseHistoryFindRes {
    @Autowired
    private ExerciseRepositorySupport exerciseRepositorySupport;

    @ApiModelProperty(name="ExerciseHistory historyNo")
    Long historyNo;
    @ApiModelProperty(name="ExerciseHistory exerciseCount")
    Long exerciseCount;
    @ApiModelProperty(name="ExerciseHistory exerciseName")
    String exerciseName;
    @ApiModelProperty(name="ExerciseHistory exerciseDate")
    LocalDateTime exerciseDate;

}
