package com.aisher.helf.db.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.aisher.helf.api.request.CommentUpdateReq;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 댓글 모델 정의.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Comment{
	@Id
	@Column(name = "comment_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int commentNo;  // 댓글 번호
	
	@Column(name = "comment")
	String comment; // 댓글 내용

	@Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
	@UpdateTimestamp 
	LocalDateTime createdAt; // 등록 일자 (최초 생성 및 수정)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_no")
	@OnDelete(action = OnDeleteAction.CASCADE)
	ShareBoard shareboard;  // 게시글 번호
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")	
	@OnDelete(action = OnDeleteAction.CASCADE)
	User user;   // 유저 아이디

	public void updateComment(CommentUpdateReq commentReq) {
		this.comment = commentReq.getComment();
	}

	@Override
	public String toString() {
		return "Comment{" +
				"commentNo=" + commentNo +
				", comment='" + comment + '\'' +
				", createdAt=" + createdAt +
				", shareboard=" + shareboard.getBoardNo() +
				", user=" + user.getUserId() +
				'}';
	}
}