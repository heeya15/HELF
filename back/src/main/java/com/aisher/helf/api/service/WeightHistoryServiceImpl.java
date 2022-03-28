package com.aisher.helf.api.service;

import com.aisher.helf.api.request.*;
import com.aisher.helf.api.response.WeightHistoryTenRecordRes;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.entity.WeightHistory;
import com.aisher.helf.db.entity.WeightHistoryId;
import com.aisher.helf.db.repository.UserRepository;
import com.aisher.helf.db.repository.UserRepositorySupport;
import com.aisher.helf.db.repository.WeightHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("weightHistoryService")
public class WeightHistoryServiceImpl implements WeightHistoryService {

	@Autowired
	WeightHistoryRepository weightHistoryRepository;

	@Transactional
	@Override
	public WeightHistory registerWeightHistory(WeightHistoryrRegisterReq weightHistoryrRegisterReq) {
		WeightHistory weightHistory;
		WeightHistoryId weightHistoryId = new WeightHistoryId();

		User user = new User();

		LocalDate createAt = weightHistoryrRegisterReq.getCreatedAt();
		String userId = weightHistoryrRegisterReq.getUserId();
		int weight = weightHistoryrRegisterReq.getWeight();
		int count = weightHistoryRepository.findByWeightHistoryCount(userId,createAt);
		System.out.println("현재 유저는 데일리 몸무게 등록했나여?" + count);
		if(count>=1){
			System.out.println("등록되어 있어 여기에 옴 ---> 수정");
			weightHistory= weightHistoryRepository.findByWeightHistory(userId,createAt);
			weightHistory.updateWeightHistory(weightHistoryrRegisterReq);
		}else {
			weightHistory = new WeightHistory();
			System.out.println("등록하지 않아 여기에 옴 ---> 추가");
			user.setUserId(userId);
			weightHistoryId.setCreatedAt(createAt); // 등록일
			weightHistoryId.setUserId(user); // 사용자 아이디 등록

			weightHistory.setWeightHistoryId(weightHistoryId);
			weightHistory.setWeight(weight); // 몸무게
			weightHistoryRepository.save(weightHistory);
		}
		return weightHistory;
	}

	@Override
	public WeightHistory getUserByUserWeightHistory(String userId,LocalDate createAt) {
		WeightHistory weightHistory= weightHistoryRepository.findByWeightHistory(userId,createAt);
		if(weightHistory != null) return weightHistory;
		else return null;
	}

	@Override
	@Transactional
	public boolean deleteByWeightHistory(WeightHistory weightHistory) {
		weightHistoryRepository.delete(weightHistory);
		return true;
	}

	@Override
	public List<WeightHistoryTenRecordRes> getTenWeightHistory(String userId) {
		List<WeightHistoryTenRecordRes> list = weightHistoryRepository.findByTenWeightHistory(userId);
		return list;
	}
}
