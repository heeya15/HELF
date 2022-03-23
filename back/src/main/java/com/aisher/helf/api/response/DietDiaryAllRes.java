package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
/**
 * 해당 유저의 식단 일지 전체 조회 API ([GET] /api/dietdiary/findAll) 요청에 대한 응답값 정의.
 */
@ApiModel("DietDiaryAllResponse")
public interface DietDiaryAllRes {
    int getDiary_no();
    LocalDate getDiary_date();
    String getMeal_time();
    String getImage_path();
    Boolean getIs_shared();
    String getDescription();
}
