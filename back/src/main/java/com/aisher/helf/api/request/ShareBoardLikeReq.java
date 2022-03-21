package com.aisher.helf.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ShareBoardLikeReq")
public class ShareBoardLikeReq {
    @ApiModelProperty(name="사용자 id", example="user_id")
    private String userId;
    @ApiModelProperty(name="공유 게시글 번호", example="board_no")
    private long boardNo;
}
