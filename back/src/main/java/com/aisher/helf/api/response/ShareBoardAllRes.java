package com.aisher.helf.api.response;

import com.aisher.helf.db.entity.FoodDiary;
import com.aisher.helf.db.entity.ShareBoard;
import com.aisher.helf.db.repository.LikeListRepositorySupport;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.*;

@Data
@ApiModel("ShareBoardAllRes")
public class ShareBoardAllRes {
    @Autowired
    private LikeListRepositorySupport likeListRepositorySupport;
    
    @ApiModelProperty(name="ShareBoard boardNo")
    Long boardNo;
    @ApiModelProperty(name="ShareBoard hit")
    int hit;
    @ApiModelProperty(name="ShareBoard createdAt")
    LocalDateTime createdAt;
    @ApiModelProperty(name="ShareBoard description")
    String description;
    @ApiModelProperty(name="FoodDiary imagePath")
    String imagePath;
    @ApiModelProperty(name="LikeList isLike")
    boolean isLike;

    public static Page<ShareBoardAllRes> of(Page<ShareBoard> shareBoards) {
        List<ShareBoardAllRes> temp = new ArrayList<>();

        Pageable pageable = shareBoards.getPageable();
        long total = shareBoards.getTotalElements();

        for (ShareBoard s : shareBoards.getContent()) {
            ShareBoardAllRes sr = new ShareBoardAllRes();
            FoodDiary foodDiary = s.getDiaryNo();

            sr.setImagePath(foodDiary.getImagePath());

            temp.add(sr);
        }

        Page<ShareBoardAllRes> res = new PageImpl<ShareBoardAllRes>(temp,pageable,total);
        return res;
    }
}
