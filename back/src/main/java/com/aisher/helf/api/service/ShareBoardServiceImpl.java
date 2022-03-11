package com.aisher.helf.api.service;

import com.aisher.helf.api.response.ShareBoardAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.db.entity.FoodDiary;
import com.aisher.helf.db.entity.LikeList;
import com.aisher.helf.db.entity.ShareBoard;
import com.aisher.helf.db.entity.User;
import com.aisher.helf.db.repository.LikeListRepository;
import com.aisher.helf.db.repository.LikeListRepositorySupport;
import com.aisher.helf.db.repository.ShareBoardRepository;
import com.aisher.helf.db.repository.ShareBoardRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("shareboardService")
public class ShareBoardServiceImpl implements ShareBoardService {
    @Autowired
    LikeListRepository likeListRepository;

    @Autowired
    LikeListRepositorySupport likeListRepositorySupport;

    @Autowired
    UserService userService;

    @Autowired
    ShareBoardRepository shareboardRepository;

    @Autowired
    ShareBoardRepositorySupport shareBoardRepositorySupport;
    /** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다.
     * @return*/
    @Override
    public List<ShareBoardFindRes> findByShareBoardId(Long boardNo) {
        shareboardRepository.updateView(boardNo); // 상세 게시글 클릭시 조회수 1 증가.
        List<ShareBoardFindRes> shareboard = shareboardRepository.findShareBoard(boardNo);
        return shareboard;
    }

    /** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
    @Override
    public Page<ShareBoard> findAllShareBoard(Pageable pageable) {
        Page<ShareBoard> shareBoards = shareBoardRepositorySupport.findAllShareBoard(pageable);
        return shareBoards;
    }

    @Override
    public Page<ShareBoardAllRes> findInfoShareBoard(Page<ShareBoard> shareBoards, String userId) {
        List<ShareBoardAllRes> temp = new ArrayList<>();

        Pageable pageable = shareBoards.getPageable();
        long total = shareBoards.getTotalElements();

        for (ShareBoard s : shareBoards.getContent()) {
            ShareBoardAllRes sr = new ShareBoardAllRes();
            FoodDiary foodDiary = s.getDiaryNo();
            sr.setBoardNo(s.getBoardNo());
            sr.setHit(s.getHit());
            sr.setCreatedAt(s.getCreatedAt());
            sr.setDescription(s.getDescription());
            sr.setImagePath(foodDiary.getImagePath());

            LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId, s.getBoardNo()).orElse(null);
            boolean isLike;
            if(likeList == null) isLike = false;
            else isLike = true;
            sr.setLike(isLike);
            temp.add(sr);
        }

        Page<ShareBoardAllRes> res = new PageImpl<ShareBoardAllRes>(temp,pageable,total);
        return res;
    }

    @Override
    public ShareBoard getShareBoard(Long boardNo) {
        ShareBoard shareBoard = shareBoardRepositorySupport.findShareBoardByBoardNo(boardNo).orElse(null);
        return shareBoard;
    }

    @Override
    public boolean getLikeList(String userId, Long boardNo) {
        LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId, boardNo).orElse(null);
        if (likeList != null) return true;
        else return false;
    }

    @Transactional
    @Override
    public void setLikeList(String userId, Long boardNo) {
        ShareBoard shareBoard = getShareBoard(boardNo);

        LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId, boardNo).orElse(null);
        if(likeList != null) {
            likeListRepository.delete(likeList);
        } else {
            User user = userService.getUserByUserId(userId);
            likeList = LikeList.builder().user(user).shareBoard(shareBoard).build();
            likeListRepository.save(likeList);
        }
    }
}
