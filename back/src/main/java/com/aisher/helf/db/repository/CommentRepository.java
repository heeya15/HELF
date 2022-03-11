package com.aisher.helf.db.repository;

import com.aisher.helf.api.response.CommentFindAllRes;
import com.aisher.helf.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
	
//	 해당 공유 게시글의 모든 댓글 조회
	@Query(value = "select c.comment_no, c.comment, c.created_at, c.user_id, c.board_no\n" +
            "from user u \n" +
            "join comment c on (u.user_id = c.user_id)\n" +
            "join share_board sb on (sb.board_no = c.board_no)\n" +
            "where c.board_no = :boardNo\n" +
            "order by c.comment_no asc;"
            , nativeQuery = true)
	List<CommentFindAllRes> findAllByBoardNo(@Param("boardNo") Long boardNo);
}