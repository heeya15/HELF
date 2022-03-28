package com.aisher.helf.api.service;

import com.aisher.helf.api.request.WeightHistoryrRegisterReq;
import com.aisher.helf.api.response.WeightHistoryTenRecordRes;
import com.aisher.helf.db.entity.WeightHistory;

import java.time.LocalDate;
import java.util.List;

public interface WeightHistoryService {
    WeightHistory registerWeightHistory(WeightHistoryrRegisterReq weightHistoryrRegisterReq);

    WeightHistory getUserByUserWeightHistory(String userId, LocalDate createAt);

    boolean deleteByWeightHistory(WeightHistory user);

    List<WeightHistoryTenRecordRes> getTenWeightHistory(String userId);
}
