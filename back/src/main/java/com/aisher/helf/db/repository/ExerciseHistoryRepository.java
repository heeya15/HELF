package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.ExerciseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Long> {
}
