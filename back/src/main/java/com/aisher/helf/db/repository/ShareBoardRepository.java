package com.aisher.helf.db.repository;

import javax.transaction.Transactional;
import com.aisher.helf.api.response.ShareBoardFindAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.db.entity.ShareBoard;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;


// Optional<T>는 null이 올수 있는 값을 감싸는 Wrapper클래스로, 참조하더라도 NPE가 발생하지 않도록 도와준다
// Repository의 정확한 사용은 DAO를 위해 사용하는 어노테이션인데 JpaRepository는 JPA의 구현체라고 할 수 있다.
// 기본적인 CRUD가 정의되어 있는 JpaRepository를 구현하였고 사용자들은 그 구현체를 상속하여 사용하면 되는 것이다.
/**
 * 공유 게시판 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ShareBoardRepository extends JpaRepository<ShareBoard, Long> { // 제네릭 안에 해당 엔티티, 엔티티 PK 자료형을 적어줌

	// 조회 수 증가.
	@Transactional
	@Modifying
	@Query(value ="update share_board set hit = hit + 1 where board_no = :board_no", nativeQuery = true)
	void updateView(@Param("board_no") Long board_no);

	@Query(value="select s.board_no, s.description,s.created_at, fd.diary_no, fd.image_path, d.weight, f.food_name, f.kcal, f.carbohydrate, f.protein, f.fat\n" +
			"from share_board s \n" +
			"join food_diary fd on (s.diary_no = fd.diary_no)\n" +
			"join diet d on (fd.diary_no = d.history_id)\n" +
			"join food f on (f.food_name = d.food_name)\n" +
			"where s.board_no = :board_no "
			,nativeQuery = true)
	List<ShareBoardFindRes> findShareBoard(Long board_no);

	@Query(value="select s.board_no, s.hit, s.created_at, fd.image_path, s.description, s.reply_cnt\n" +
			"from (select c.board_no, sb.hit, sb.created_at, sb.description, sb.diary_no, count(*) as reply_cnt\n" +
			"\t  from comment c join share_board sb on (c.board_no = sb.board_no)\n" +
			"\t  group by c.board_no\n" +
			"\t  order by c.board_no, sb.diary_no) as s\n" +
			"\t join food_diary fd on (s.diary_no = fd.diary_no)"
			,nativeQuery = true)
	List<ShareBoardFindAllRes>findAllShareBoard();
}