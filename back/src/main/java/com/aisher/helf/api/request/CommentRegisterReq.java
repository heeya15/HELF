package com.aisher.helf.api.request;

import com.aisher.helf.db.entity.Comment;
import com.aisher.helf.db.entity.ShareBoard;
import com.aisher.helf.db.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRegisterReq {

	@ApiModelProperty(name = "댓글 내용", example="insert comment content.....")
	private String comment;

	// User 테이블과의 관계에서의 참조키 (Foreign Key)
	@ApiModelProperty(name = "유저 id")
	@JsonIgnore
	private String userId;
	
	//ShareBoard 테이블과의 관계에서의 참조키 (Foreign Key)
	@ApiModelProperty(name = "게시글 no")
	private Long boardNo;
	
	public Comment toEntity() {
		User user = new User();
		user.setUserId(userId);
		
		ShareBoard board = new ShareBoard();
		board.setBoardNo(boardNo);
		
		return Comment.builder()
				.comment(comment)
				.user(user)
				.shareboard(board)
				.build();
	}
}