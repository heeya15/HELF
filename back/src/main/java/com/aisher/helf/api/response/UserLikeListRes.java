package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserLikeListRes")
public class UserLikeListRes {
    @ApiModelProperty(name="UserLikeList likeNo")
    Long likeNo;

    @ApiModelProperty(name="UserLikeList boardNo")
    Long boardNo;

    @ApiModelProperty(name="UserLikeList diaryNo")
    int diaryNo;

    @ApiModelProperty(name="UserLikeList imagePath")
    String imagePath;
}
