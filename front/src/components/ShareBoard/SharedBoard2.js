import React, { Component,useEffect, useState } from "react";
import axios from 'axios';
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import './Shardboard.css'
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
import { IMAGE_URL } from "../../utils/https";
import ShareBoardTopLike from "./ShareBoardTopLike";
import Pagination from "react-js-pagination";
import './Pagenation.css'
import { useMediaQuery } from 'react-responsive'
import { Title } from "../MyPage/MyPage.style";
// 박스 내부 CSS
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

function User({ user }) {
  const token = sessionStorage.getItem("jwt");
  const [UserIDCH, setUserIdCh] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}shareboard/find/${user.boardNo}`,
    // `${LOCAL_URL}shareboard/findAll`, 
    {
    headers: { 
      Authorization: `Bearer ${ token }`
    }})
        .then(response => {
          // 나중에 response.data 로 data 가져오기 가능
          setUserIdCh(response.data[0].user_id);
          console.log(response.data)
        }).catch(err => {
          console.log('뭔가 잘못됨')
        });
    }, []);
  return (
    <div className="shardboxMargin">
      <Link  to={`/sharedetail/${user.boardNo}`}  state={{ data: user.boardNo}} className='anc ' >
            <div key={user.boardNo} className="innerboxcolor">
              {/* 이름 적는 곳( 유저 닉네임 적을 것) */}
              <Label style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '200px',
                }}>{UserIDCH}</Label>
              <img
                src={`${IMAGE_URL}${user.imagePath}`}
                // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                alt={user.boardNo}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '200px',
                  height: '200px',
                }}
                >
                  
                </img>
              
              {/* 좋아요 기능 넣는곳 */}
              <Label style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '200px',
                  
                }} className="LabelStyle">{user.description}</Label>
            </div>
            </Link>
    </div>
  );
}

function SharedBoard(props) {
  const token = sessionStorage.getItem("jwt");
  const [shardList, setShardlist] = useState([]);
  console.log('>>>>>>>>>>>>>>>>>>>', shardList);
  const [page, setPage] = useState(1); 
  const perPage = 4; // 한 페이지에 보여줄 공유 게시글 수
  const [totalpage, setTotalPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
      axios.get(
        `${BASE_URL}shareboard/findAll?page=${page}&size=${perPage}`,
          // `${LOCAL_URL}shareboard/findAll`, 
          {
          headers: {
            Authorization: `Bearer ${ token }`
          }
      }).then(response => {
        // 나중에 response.data 로 data 가져오기 가능
        setShardlist(response.data.content);
        setTotalPage(response.data.totalElements);   
        console.log(response.data);
      })
      .catch((err) => {console.log('앙댐;')})
  }, [page, totalpage]);
  
  //  반응형
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }
  return(  
    <div className="boxdiv"> 
      <Desktop>        
        <div >
          <ShareBoardTopLike></ShareBoardTopLike>
          <Title>최신 공유 식단</Title>
          <Masonry columns={4} spacing={2}  style={{margin : 0}} classgName="boxdivcolor">
          {shardList.map((user,index) => (
            <User user={user} key={index} />
          ))}
          </Masonry> 
        </div>
      </Desktop>
      <Tablet>
      <div >
          <ShareBoardTopLike></ShareBoardTopLike>
          <Title>최신 공유 식단</Title>
          <Masonry columns={2} spacing={4} style={{margin : 0}}>
          {shardList.map((user,index) => (
            <User user={user} key={index} />
          ))}
          </Masonry> 
      </div>
      </Tablet>
      <Mobile>
      <div >
          <ShareBoardTopLike></ShareBoardTopLike>
          <Title>최신 공유 식단</Title>
          <Masonry columns={1} spacing={8} style={{margin : 0}}>
          {shardList.map((user,index) => (
            <User user={user} key={index} />
          ))}
          </Masonry> 
        </div>
      </Mobile>
      <Pagination
          activePage={page}
          itemsCountPerPage={perPage}
          totalItemsCount={totalpage} //  총 게시글 수
          pageRangeDisplayed={perPage}  // Paginator 내에서 보여줄 페이지의 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange} />
    </div>
    
      );}; 
  export default SharedBoard

