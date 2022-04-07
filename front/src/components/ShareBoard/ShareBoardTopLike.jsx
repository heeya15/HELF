import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { SHARE_BOARD_LIKE_REQUEST } from "../../store/modules/shareBoard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_URL } from "../../utils/https";
// import { AiFillHeart } from "react-icons/ai";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Title } from "../MyPage/MyPage.style";
import {
  BestDietWrapper,
  ImageBox,
  BoardImage,
  imageDesc,
} from "./ShareBoardTopLike.style";

export default function MyPageLike() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { shareBoardTopLikeList } = useSelector((state) => state.shareBoard);

  useEffect(() => {
    dispatch({
      type: SHARE_BOARD_LIKE_REQUEST,
    });
  }, []);

  // 게시글 상세 보기
  const handleShareBoardDetail = (boardNo) => {
    history.push(`/sharedetail/${boardNo}`);
  };

  //  반응형
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  return (
    <div style={{ margin: "3% auto", width: "90%" }}>
      <Title>🏆 BEST 식단 🏆</Title>
      {shareBoardTopLikeList.length == 0 ? (
        <div>BEST 식단 게시글이 없습니다.</div>
      ) : (
        // <BestDietWrapper>
        //   <Row style={center}>
        //     {shareBoardTopLikeList.map((likes, index) => (
        //       <Col key={index}>
        //         <ShareBoardLikeListStyle>
        //           <img
        //             src={`${IMAGE_URL}${likes.image_path}`}
        //             alt="좋아요한 공유 이미지"
        //             data={likes.board_no}
        //             onClick={goToShareDetail}
        //           ></img>
        //         </ShareBoardLikeListStyle>
        //       </Col>
        //     ))}
        //   </Row>
        <>
          <Desktop>
            <BestDietWrapper>
              <ImageBox>
                <ImageList sx={{ height: "40%" }}>
                  <ImageListItem key="Subheader" cols={4}></ImageListItem>
                  {shareBoardTopLikeList.map((likes) => (
                    <ImageListItem
                      key={likes.imagePath}
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      <BoardImage
                        src={`${IMAGE_URL}${likes.image_path}`}
                        onClick={() => handleShareBoardDetail(likes.board_no)}
                        alt={likes.description}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        style={imageDesc}
                        title={"조회수 : " + likes.hit}
                        subtitle={likes.description}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </ImageBox>
            </BestDietWrapper>
          </Desktop>
          <Tablet>
            <BestDietWrapper>
              <ImageBox>
                <ImageList sx={{ height: "50%" }}>
                  <ImageListItem key="Subheader" cols={4}></ImageListItem>
                  {shareBoardTopLikeList.map((likes) => (
                    <ImageListItem
                      key={likes.imagePath}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                    >
                      <BoardImage
                        src={`${IMAGE_URL}${likes.image_path}`}
                        onClick={() => handleShareBoardDetail(likes.board_no)}
                        alt={likes.description}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        style={imageDesc}
                        title={"조회수 : " + likes.hit}
                        subtitle={likes.description}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </ImageBox>
            </BestDietWrapper>
          </Tablet>
          <Mobile>
            <BestDietWrapper>
              <ImageBox>
                <ImageList sx={{ height: "40%" }}>
                  <ImageListItem key="Subheader" cols={2}></ImageListItem>
                  {shareBoardTopLikeList.map((likes) => (
                    <ImageListItem
                      key={likes.imagePath}
                      style={{ marginLeft: "3px", marginRight: "3px" }}
                    >
                      <BoardImage
                        src={`${IMAGE_URL}${likes.image_path}`}
                        onClick={() => handleShareBoardDetail(likes.board_no)}
                        alt={likes.description}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        style={imageDesc}
                        title={"조회수 : " + likes.hit}
                        subtitle={likes.description}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </ImageBox>
            </BestDietWrapper>
          </Mobile>
        </>
      )}
    </div>
  );
}
