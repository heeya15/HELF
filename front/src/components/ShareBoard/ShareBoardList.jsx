import React, { useEffect, useState } from "react";
import axios from "axios";
// import * as React from 'react';
import "./ShareBoard.css";
import { BASE_URL, IMAGE_URL } from "../../utils/https";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Pagination from "react-js-pagination";
import "./Pagenation.css";
import { useMediaQuery } from "react-responsive";
import { Title } from "../MyPage/MyPage.style";
import { useHistory } from "react-router-dom";

function SharedBoard() {
  const history = useHistory();
  const token = sessionStorage.getItem("jwt");
  const [ShareBoardList, setShareBoardlist] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 4; // 한 페이지에 보여줄 공유 게시글 수
  const [totalpage, setTotalPage] = useState(1);
  const [order, setOrder] = useState("boardNo");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleShareBoardDetail = (boardNo) => {
    history.push(`/sharedetail/${boardNo}`);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}shareboard/findAll?page=${page}&size=${perPage}&sort=${order}%2Cdesc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // 나중에 response.data 로 data 가져오기 가능
        setShareBoardlist(response.data.content);
        setTotalPage(response.data.totalElements);
      })
      .catch((err) => {
      });
  }, [page, totalpage, order]);

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
    <>
      <Title>{order === "boardNo" ? "최신" : "조회"}순 공유 식단</Title>
      <div className="orderButton">
        <button onClick={handleOrder} value="boardNo" className={order === 'boardNo' ? 'selectedButton' : 'unSelectedButton'}>
          최신순
        </button>
        <button onClick={handleOrder} value="hit" className={order === 'boardNo' ? 'unSelectedButton' : 'selectedButton'}>
          조회순
        </button>
      </div>
      <div className="boxdiv">
        <Desktop>
          <ImageList sx={{ position: "static", width: "1000", height: "30%" }}>
            <ImageListItem key="Subheader" cols={4}></ImageListItem>
            {ShareBoardList.map((user) => (
              <ImageListItem
                key={user.imagePath}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <img
                  src={`${IMAGE_URL}${user.imagePath}`}
                  style={{
                    width: "250px",
                    height: "250px",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                  onClick={() => handleShareBoardDetail(user.boardNo)}
                  alt={user.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  style={{
                    fontFamily: "KOTRA_GOTHIC",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  title={"조회수 : " + user.hit}
                  subtitle={user.description}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Desktop>
        <Tablet>
          <ImageList sx={{ position: "static", width: "100", height: "30%" }}>
            <ImageListItem key="Subheader" cols={2}></ImageListItem>
            {ShareBoardList.map((user) => (
              <ImageListItem
                key={user.imagePath}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <img
                  src={`${IMAGE_URL}${user.imagePath}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                  onClick={() => handleShareBoardDetail(user.boardNo)}
                  alt={user.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  style={{
                    fontFamily: "KOTRA_GOTHIC",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  title={"조회수 : " + user.hit}
                  subtitle={user.description}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Tablet>
        <Mobile>
          <ImageList sx={{ position: "static", width: "100", height: "30%" }}>
            <ImageListItem key="Subheader" cols={2}></ImageListItem>
            {ShareBoardList.map((user) => (
              <ImageListItem
                key={user.imagePath}
                style={{ marginLeft: "3px", marginRight: "3px" }}
              >
                <img
                  src={`${IMAGE_URL}${user.imagePath}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                  onClick={() => handleShareBoardDetail(user.boardNo)}
                  alt={user.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  style={{
                    fontFamily: "KOTRA_GOTHIC",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  title={"조회수 : " + user.hit}
                  subtitle={user.description}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Mobile>
        <Pagination
          activePage={page}
          itemsCountPerPage={perPage}
          totalItemsCount={totalpage} //  총 게시글 수
          pageRangeDisplayed={perPage} // Paginator 내에서 보여줄 페이지의 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
export default SharedBoard;
