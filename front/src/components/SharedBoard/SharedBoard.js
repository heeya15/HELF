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
  return (
    <div>
      <Link  to={`/sharedetail/${user.boardNo}`}  state={{ data: user.boardNo}} className='anc'>
            <div key={user.boardNo} >
              {/* 이름 적는 곳( 유저 닉네임 적을 것) */}
              <Label>{user.boardNo}</Label>
              <img
                src={`${IMAGE_URL}${user.imagePath}`}
                // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                alt={user.boardNo}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
              />
              {/* 좋아요 기능 넣는곳 */}
              <Label>{user.boardNo}</Label>
            </div>
            </Link>
    </div>
  );
}

function SharedBoard(props) {
  const token = sessionStorage.getItem("jwt");
    const [shardList, setShardlist] = useState([]);
    useEffect(() => {
      axios.get(
        `${BASE_URL}shareboard/findAll?page=0&size=8`,
          // `${LOCAL_URL}shareboard/findAll`, 
          {
          headers: {
            Authorization: `Bearer ${ token }`
          }
      }).then(response => {
        // 나중에 response.data 로 data 가져오기 가능
        setShardlist(response.data.content);
        console.log(response.data.content);
      
      })
      .catch((err) => {console.log('앙댐;')})
    }, []);
    return(
      
      <div className="boxdiv"> 
      <div className="shardbox"> 대충 제목이라는 뜻</div>
      <div>
      <Masonry columns={3} spacing={2}>
      {shardList.map(user => (
        <User user={user} />
      ))}
      </Masonry>

    </div>

          
    </div>
    
      );}; 
  export default SharedBoard

