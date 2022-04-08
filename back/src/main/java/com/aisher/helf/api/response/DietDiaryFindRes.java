package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel("DietDiaryFindRes")
public class DietDiaryFindRes {

    @ApiModelProperty(name = "번호")
    private int diaryNo;

    @ApiModelProperty(name = "날짜")
    private LocalDateTime diaryDate;

    @ApiModelProperty(name = "시간대 분류")
    private String mealTime;

    @ApiModelProperty(name = "이미지 경로")
    private String imagePath;

    @ApiModelProperty(name = "공유 여부")
    private Boolean isShared;

    @ApiModelProperty(name = "일지 내용")
    private String description;

    @ApiModelProperty(name = "식단 리스트")
    private List<DietFindRes> dietFindResList;

}
