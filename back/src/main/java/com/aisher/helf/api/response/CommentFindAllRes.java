package com.aisher.helf.api.response;
/**
 * 게시글 댓글 전체 조회 API ([GET] /findAll/{board_no}) 요청에 대한 응답값 정의.
 */
public interface CommentFindAllRes {
    int getComment_no();
    String getComment();
    String getCreated_at();
    String getUser_id();
    int getBoard_no();
}