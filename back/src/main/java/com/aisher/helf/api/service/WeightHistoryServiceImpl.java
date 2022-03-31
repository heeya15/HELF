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
	UserRepositorySupport userRepositorySupport;

	@Autowired
	WeightHistoryRepository weightHistoryRepository;

	@Transactional
	@Override
	public WeightHistory registerWeightHistory(WeightHistoryrRegisterReq weightHistoryrRegisterReq) {
		WeightHistory weightHistory;
		WeightHistoryId weightHistoryId = new WeightHistoryId();

		User user = new User();

		LocalDate createAt = LocalDate.parse(weightHistoryrRegisterReq.getCreatedAt(), DateTimeFormatter.ISO_DATE);
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

	@Transactional
	@Override
	public void updateWeightHistory(WeightHistoryrRegisterReq registerInfo) {
		LocalDate createAt = LocalDate.parse(registerInfo.getCreatedAt(), DateTimeFormatter.ISO_DATE);
		String userId = registerInfo.getUserId();
		WeightHistory weightHistory= weightHistoryRepository.findByWeightHistory(userId,createAt);
		weightHistory.updateWeightHistory(registerInfo);
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
		// 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
		LocalDate now = LocalDate.now();
		System.out.println("오늘 날짜 "+ now);
		System.out.println(weightHistory.getWeightHistoryId().getCreatedAt());
		if(weightHistory.getWeightHistoryId().getCreatedAt().equals(now)){ // 현재 날짜를 삭제하려 한다면
			System.out.println("오늘 날짜 삭제하는경우 ");
			String userId = weightHistory.getWeightHistoryId().getUserId().getUserId();
			System.out.println("내아뒤는"+userId);
			weightHistoryRepository.delete(weightHistory); // 먼저 해당 정보를 삭제하고
			// 해당 유저 정보 찾고 가장 최근에 등록한 몸무게로 user 정보 몸무게 수정.
			User user = userRepositorySupport.findUserByUserId(userId).get();
			WeightHistory TopWeightHistory= weightHistoryRepository.findByTopWeightHistory(userId);
			user.updateWeight(TopWeightHistory.getWeight());
			return true;
		}else {
			System.out.println("오늘 날짜 삭제하는게 아닌경우");
			weightHistoryRepository.delete(weightHistory);
			return true;
		}
	}

	@Override
	public List<WeightHistoryTenRecordRes> getTenWeightHistory(String userId) {
		List<WeightHistoryTenRecordRes> list = weightHistoryRepository.findByTenWeightHistory(userId);
		return list;
	}
}
