import React, { Component } from "react";
import axios from 'axios';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import './Shardboard.css'
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
import ShardDetail from "../ShardDetail/SharedDetail"

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

// 메인 보드
class SharedBoard extends Component {
	// 초기 랜더링
  constructor(props) {
      super(props);
      const token = sessionStorage.getItem("jwt");
      // 공유 게시물 전부 조회
      axios.get(
          `${BASE_URL}shareboard/findAll`,
            // `${LOCAL_URL}shareboard/findAll`, 
            {
            headers: {
              Authorization: `Bearer ${ token }`
            }
        }).then((result)=>{ console.log(result.data) }).catch((err) => {console.log('앙댐;')})
      console.log('Person Instance is created, and initialized');
    }
  	render() {
      return(
      
      <div className="boxdiv"> 
      <div className="shardbox"> 대충 제목이라는 뜻</div>
        {/* 이미지 페이지 */}
        <Box sx={{ width: 800, minHeight: 829 }}>
          {/* 이미지 갯수 설정 */}
        <Masonry columns={3} spacing={2}>
          {itemData.map((item, index) => (
            //  array 를 박스로 출력, data 를 link 를 통해 전송
            <Link  to={`/sharedetail/${index}`}  state={{ data: index}} className='anc'>
            <div key={index} >
              {/* 이름 적는 곳( 유저 닉네임 적을 것) */}
              <Label>{index + 1}</Label>
              <img
                src={`${item.img}?w=162&auto=format`}
                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
              />
              {/* 좋아요 기능 넣는곳 */}
              <Label>{index + 1}</Label>
            </div>
            </Link>
          ))}
          
        </Masonry>
      </Box>   
          
    </div>
    
      );
    }
} export default SharedBoard


// 데이터 받아와서 이름, 주소 넣기
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    title: 'Snacks',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
    title: 'Tower',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },  
]


