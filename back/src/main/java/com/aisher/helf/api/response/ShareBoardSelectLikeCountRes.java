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
@ApiModel("ShareBoardSelectLikeCountRes")
public class ShareBoardSelectLikeCountRes {

    @ApiModelProperty(name = "해당 게시글 총 좋아요 개수")
    private int TotalLikeCount;

    @ApiModelProperty(name = "해당 사용자가 해당 게시글 좋아요 여부")
    private boolean isLike;
}
