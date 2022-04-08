package com.aisher.helf.db.repository;

import com.aisher.helf.db.entity.LikeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeListRepository extends JpaRepository<LikeList, Integer> {
}
