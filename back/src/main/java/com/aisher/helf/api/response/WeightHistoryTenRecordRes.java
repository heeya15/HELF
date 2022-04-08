package com.aisher.helf.api.response;

import io.swagger.annotations.ApiModel;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 해당 유저의 식단 일지 전체 조회 API ([GET]  /api/weight/history/search/ten/weight)) 요청에 대한 응답값 정의.
 */
@ApiModel("WeightHistoryTenRecordResponse")
public interface WeightHistoryTenRecordRes {
    LocalDate getCreated_at();
    String getUser_id();
    int getWeight();
}
