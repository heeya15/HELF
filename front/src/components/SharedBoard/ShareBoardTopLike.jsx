import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  SHARE_BOARD_LIKE_REQUEST
} from "../../store/modules/shareBoard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_URL } from "../../utils/https";
// import { AiFillHeart } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import { ShareBoardLikeListStyle } from "../MyPage/MyPage.style";
import './ShardBoardTopLike.css'
import { Title } from "../MyPage/MyPage.style";

export default function MyPageLike() {
  const dispatch = useDispatch();
  const history = useHistory();
  

  const { myPageLikeList } = useSelector((state) => state.mypage);
  const { likeDeleteState } = useSelector((state) => state.mypage);
  const { shareBoardTopLikeList } = useSelector((state) => state.shareBoard);

  useEffect(() => {
    dispatch({
      type: SHARE_BOARD_LIKE_REQUEST,
    });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };


  const goToShareDetail = (e) => {
    const boardNo = e.target.getAttribute("data");
    history.push(`/sharedetail/${boardNo}`);
  };

  return (
    <div style={{ margin: "5% auto", width: "100%" }}>
      <Title>BEST 식단</Title>
      {shareBoardTopLikeList.length == 0 ? (
        <div>찜한 게시글이 없습니다.</div>
      ) : (
        <Row className="grid-container">
            {shareBoardTopLikeList.map((likes, index) => (
              <Col key={index}>
                <ShareBoardLikeListStyle>
                  <img
                    className="box"
                    src={`${IMAGE_URL}${likes.image_path}`}
                    alt="좋아요한 공유 이미지"
                    data={likes.board_no}
                    onClick={goToShareDetail}
                  ></img>
                </ShareBoardLikeListStyle>
              </Col>
            ))}
      </Row>
      )}       
    </div>
  );
}
