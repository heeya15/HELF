package com.aisher.helf.api.service;

import com.aisher.helf.api.request.ShareBoardRegisterReq;
import com.aisher.helf.api.response.ShareBoardAllRes;
import com.aisher.helf.api.response.ShareBoardFindRes;
import com.aisher.helf.api.response.ShareBoardFindTopLikeRes;
import com.aisher.helf.db.entity.DietDiary;
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

    /** 공유 게시판에 게시글(식단 일지) 등록 **/
    @Transactional
    @Override
    public ShareBoard registerShareBoard(ShareBoardRegisterReq shareBoardRegisterReq) {
        ShareBoard shareBoard = shareboardRepository.save(shareBoardRegisterReq.toEntity());
        return shareBoard;
    }

    /** 공유 게시글 하나의 정보를 가져오는(상세보기) findByBoardId 입니다. **/
    @Override
    public List<ShareBoardFindRes> findByShareBoardId(Long boardNo) {
        shareboardRepository.updateView(boardNo); // 상세 게시글 클릭시 조회수 1 증가.
        List<ShareBoardFindRes> shareboard = shareboardRepository.findShareBoard(boardNo);
        return shareboard;
    }

    @Override
    public List<ShareBoardFindTopLikeRes> findShareBoardByTopLike() {
        List<ShareBoardFindTopLikeRes> shareboard = shareboardRepository.findShareBoardByTopLike();
        return shareboard;
    }

    /** 모든 공유 게시글의 정보를 가져오는 findAllBoard 입니다. (목록 부분에 사용)*/
    @Override
    public Page<ShareBoard> findAllShareBoard(Pageable pageable) {
        Page<ShareBoard> shareBoards = shareBoardRepositorySupport.findAllShareBoard(pageable);
        return shareBoards;
    }

    @Override
    public void deleteShareBoard(Long boardNo) {
        shareboardRepository.deleteById(boardNo);
    }

    @Override
    public Page<ShareBoardAllRes> findInfoShareBoard(Page<ShareBoard> shareBoards, String userId) {
        List<ShareBoardAllRes> temp = new ArrayList<>();

        Pageable pageable = shareBoards.getPageable();
        long total = shareBoards.getTotalElements();

        for (ShareBoard s : shareBoards.getContent()) {
            ShareBoardAllRes sr = new ShareBoardAllRes();
            DietDiary dietDiary = s.getDiaryNo();
            sr.setBoardNo(s.getBoardNo());
            sr.setHit(s.getHit());
            sr.setCreatedAt(s.getCreatedAt());
            sr.setDescription(s.getDescription());
            sr.setImagePath(dietDiary.getImagePath());

            LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId, s.getBoardNo()).orElse(null);
            boolean isLike;
            if(likeList == null) isLike = false; // 찜 목록 리스트 값이 null이면
            else isLike = true;
            sr.setLike(isLike);
            temp.add(sr);
        }

        Page<ShareBoardAllRes> res = new PageImpl<ShareBoardAllRes>(temp,pageable,total);
        return res;
    }

    /** 해당 공유 게시글 번호에 대한 [ 게시글 정보 들고와서 ] 반환 하는 메서드**/
    @Override
    public ShareBoard getShareBoard(Long boardNo) {
        ShareBoard shareBoard = shareBoardRepositorySupport.findShareBoardByBoardNo(boardNo).orElse(null);
        return shareBoard;
    }

    /** 해당 공유 게시글을 좋아요 버튼을 처음 누르면 찜 목록 테이블에 추가되고, 다시 좋아요 버튼을 누르면 삭제 시켜줌.   **/
    @Transactional
    @Override
    public void setLikeList(String userId, Long boardNo) {
        ShareBoard shareBoard = getShareBoard(boardNo); // 해당 게시글 번호에 대한 게시글 정보를 가져와서 객체에 저장.

        LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId, boardNo).orElse(null);
        if(likeList != null) {
            likeListRepository.delete(likeList);
        } else {
            User user = userService.getUserByUserId(userId);
            likeList = LikeList.builder()
                       .user(user)
                       .shareBoard(shareBoard)
                       .build();
            likeListRepository.save(likeList);
        }
    }

    @Override
    public boolean checkDiaryNo(int diaryNo) {
        return shareBoardRepositorySupport.findByDiaryNoEquals(diaryNo);
    }

    @Override
    public boolean checkIsLike(Long boardNo, String userId) {
        LikeList likeList = likeListRepositorySupport.findLikeListByUserIdAndBoardNo(userId,boardNo).orElse(null);
        boolean isLike;
        if(likeList == null) isLike = false; // 찜 목록 리스트 값이 null이면
        else isLike = true;
        return isLike;
    }
}
