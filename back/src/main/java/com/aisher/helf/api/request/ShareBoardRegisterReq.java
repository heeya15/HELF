package com.aisher.helf.api.request;

import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.entity.ShareBoard;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 공유 게시판에 게시글 API ([POST] /api/shareboard/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@ApiModel("ShareBoardRegisterRequest")
public class ShareBoardRegisterReq {
    @ApiModelProperty(name="식단 일지 번호", example="1")
    private int diaryNo;

    @ApiModelProperty(name="공유 내용", example="this is description....")
    private String description;

    @ApiModelProperty(name="조회수", example="1")
    private int hit;

    @ApiModelProperty(name="식단 일지 번호", example="")
    private LocalDateTime createdAt;

    public ShareBoard toEntity() {
        DietDiary dietDiary = new DietDiary();
        dietDiary.setDiaryNo(diaryNo);

        return ShareBoard.builder()
                .diaryNo(dietDiary)
                .description(description)
                .hit(hit)
                .createdAt(createdAt)
                .build();
    }
}
