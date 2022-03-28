package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ExerciseRegisterReq")
public class ExerciseRegisterReq {
    @ApiModelProperty(name="운동 번호", example="1")
    Long exerciseNo;
    @ApiModelProperty(name="운동 종류", example="스트레칭")
    String exerciseName;
}
