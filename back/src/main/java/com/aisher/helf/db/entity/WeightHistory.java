package com.aisher.helf.db.entity;

import com.aisher.helf.api.request.UserUpdateReq;
import com.aisher.helf.api.request.WeightHistoryrRegisterReq;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
       LocalDate createAt = LocalDate.parse(weightHistoryrRegisterReq.getCreatedAt(), DateTimeFormatter.ISO_DATE);
       this.weightHistoryId.setCreatedAt(createAt);
       this.weight = weightHistoryrRegisterReq.getWeight();
    }
}
