package com.aisher.helf.api.request;

import com.aisher.helf.db.entity.DietDiary;
import com.aisher.helf.db.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 식단 일지 등록 API ([POST] /api/dietdiary/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("DietDiaryRegisterRequest")
public class DietDiaryRegisterReq {

    @ApiModelProperty(name = "번호", example="0")
    private int diaryNo;

    @ApiModelProperty(name = "날짜", example="2020-03-14 00:00:00")
    private LocalDateTime diaryDate;

    @ApiModelProperty(name = "시간대 분류", example="아침")
    private String mealTime;

    private String saveImagePath;

    @ApiModelProperty(name = "공유 여부", example="1")
    private Boolean isShared;

    @ApiModelProperty(name = "일지 내용", example="this is description.......")
    private String description;

    private List<DietRegisterReq> dietRegisterReqList;

    // User 테이블과의 관계에서의 참조키 (Foreign Key)
    @ApiModelProperty(name = "유저 id")
    @JsonIgnore
    private String userId;

    public DietDiary toEntity() {
        User user = new User();
        user.setUserId(userId);

        return DietDiary.builder()
                .diaryNo(diaryNo)
                .diaryDate(diaryDate)
                .mealTime(mealTime)
                .imagePath(saveImagePath)
                .isShared(isShared)
                .description(description)
                .userId(user)
                .build();
    }

}