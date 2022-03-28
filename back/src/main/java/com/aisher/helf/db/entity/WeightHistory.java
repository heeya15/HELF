package com.aisher.helf.db.entity;

import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.api.request.WeightHistoryrRegisterReq;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class WeightHistory {
    @EmbeddedId
    private WeightHistoryId weightHistoryId;

    @Column(length = 2000, name = "weight")
    int weight;

    public void updateWeightHistory(WeightHistoryrRegisterReq weightHistoryrRegisterReq) {
       this.weightHistoryId.userId = weightHistoryId.userId;
       this.weightHistoryId.setCreatedAt(weightHistoryrRegisterReq.getCreatedAt());
       this.weight = weightHistoryrRegisterReq.getWeight();
    }
}
