package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ExerciseHistoryRegisterReq")
public class ExerciseHistoryRegisterReq {
    @ApiModelProperty(name="운동 번호", example="1")
    Long exerciseNo;

    @ApiModelProperty(name = "날짜", example="2022-03-28 00:00:00")
    String exerciseDate;

    @ApiModelProperty(name="운동 횟수", example="5")
    Long exerciseCount;

    @ApiModelProperty(name="히스토리 번호", example="0")
    Long historyNo;
}
