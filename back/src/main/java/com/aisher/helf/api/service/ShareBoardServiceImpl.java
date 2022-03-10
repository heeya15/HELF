package com.aisher.helf.api.service;

import com.aisher.helf.api.response.ShareBoardFindAllGetRes;
import com.aisher.helf.api.response.ShareBoardFindGetRes;
import com.aisher.helf.db.repository.ShareBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("shareboardService")
public class ShareBoardServiceImpl implements ShareBoardService {

    @Autowired
    ShareBoardRepository shareboardRepository;
    /** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다.
     * @return*/
    @Override
    public List<ShareBoardFindGetRes> findByShareBoardId(Long board_no) {
        shareboardRepository.updateView(board_no); // 상세 게시글 클릭시 조회수 1 증가.
        List<ShareBoardFindGetRes> shareboard = shareboardRepository.findShareBoard(board_no);
        return shareboard;
    }

    /** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
    @Override
    public List<ShareBoardFindAllGetRes> findAllShareBoard() {
        List<ShareBoardFindAllGetRes> shareboards = shareboardRepository.findAllShareBoard();
        return shareboards;
    }
}
