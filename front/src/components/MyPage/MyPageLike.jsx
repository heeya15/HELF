import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  MY_PAGE_LIKE_REQUEST,
  MY_PAGE_LIKE_DELETE_REQUEST,
} from "../../store/modules/myPage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_URL } from "../../utils/https";
import { AiFillHeart } from "react-icons/ai";
import { 
  LikeListStyle,
  Title, 
} from "./MyPage.style";

export default function MyPageLike() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: MY_PAGE_LIKE_REQUEST,
    });
  }, [dispatch]);

  const { myPageLikeList } = useSelector((state) => state.mypage);
  const { likeDeleteState } = useSelector((state) => state.mypage);

  useEffect(() => {
    if (likeDeleteState) {
      dispatch({
        type: MY_PAGE_LIKE_REQUEST,
      });
    }
  }, [likeDeleteState]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const likeDelete = (boardNo, e) => {
    dispatch({
      type: MY_PAGE_LIKE_DELETE_REQUEST,
      data: boardNo,
    });
  };

  const goToShareDetail = (e) => {
    const boardNo = e.target.getAttribute("data");
    history.push(`/sharedetail/${boardNo}`);
  };

  return (
    <div style={{ margin: "5% auto", width: "80%" }}>
      <Title>찜목록</Title>
      {myPageLikeList.length == 0 ? (
        <div>찜한 게시글이 없습니다.</div>
      ) : (
        <Slider {...settings}>
          {myPageLikeList.map((likes, index) => (
            <LikeListStyle key={index}>
              <div className="total">
                <AiFillHeart
                  size="23"
                  className="icon"
                  onClick={(e) => {
                    likeDelete(likes.boardNo, e);
                  }}
                />
              </div>
              <img
                src={`${IMAGE_URL}${likes.imagePath}`}
                alt="좋아요한 공유 이미지"
                data={likes.boardNo}
                onClick={goToShareDetail}
              ></img>
            </LikeListStyle>
          ))}
        </Slider>
      )}
    </div>
  );
}
