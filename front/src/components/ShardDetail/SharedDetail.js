import React, { Component , useState, useEffect  } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { BASE_URL, IMAGE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
import { div } from "@tensorflow/tfjs";
import { Button } from "react-bootstrap";
import './SharedDetail.css'
import { Container, Row, Col } from "react-bootstrap";
import { VictoryPie } from "victory-pie";
import { PieChart } from "react-minimal-pie-chart";
import {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  ListButton,
  UpdatdButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
  CommentBox,
  CommentBoxBig,
  SendButton
} from "./SharedDetail.style";








// match 로 현재 게시물 주소에 대한 정보를 props 로 받아온다
function Detail({ match }) {
  const index = match.params.index.substring(0);
  const token = sessionStorage.getItem("jwt");

    const [allData, setAlldata] = useState([]);
    const [commentData, setComment] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}shareboard/find/${index}`,
        // `${LOCAL_URL}shareboard/findAll`, 
        {
        headers: { 
          Authorization: `Bearer ${ token }`
        }})
            .then(response => {
              // 나중에 response.data 로 data 가져오기 가능
              setAlldata(response.data[0]); 
            });
    }, []);
    useEffect(() => {
      axios.get(`${BASE_URL}comment/findAll/${index}`,
      // `${LOCAL_URL}shareboard/findAll`, 
      {
      headers: { 
        Authorization: `Bearer ${ token }`
      }})
          .then(response => {
            // 나중에 response.data 로 data 가져오기 가능
            setComment(response);
            console.log(response) 

          });
  }, []);
    const history = useHistory();

    const goBack = () => {
      history.push(`/sharedBoard`);
    };
    const rate = 100/( allData.protein + allData.carbohydrate + allData.fat)
    var protein = Number(rate * Number(allData.protein))
    var carbohydrate = Number(rate * Number(allData.carbohydrate))
    var fat = Number(rate * Number(allData.fat))
    const myData = [
      { title: "탄수화물", value : Math.round(carbohydrate), color : '#F6CB44' },
      { title: "단백질", value : Math.round(protein), color : '#000000' },
      { title: "지방", value : Math.round(fat), color : '#F6CB44' },
    ];
    console.log(typeof(myData[0].y))
    console.log(typeof(myData[1].y))
  return (
      <div className="bigBox">
        {/* <div className="detailBox">
          <img src={`${IMAGE_URL}${allData.image_path}`} alt="" />
          <div>
            <h3>탄수화물 : {allData.carbohydrate}</h3>
            <h3>지방 : {allData.fat}</h3>
            <h3>단백질 : {allData.protein}</h3>
            <h3>한마디 : {allData.description}</h3>
            <h3>음식이름 : {allData.food_name}</h3>
            <h3>이미지 경로 : {allData.image_path}</h3>
            <h3>칼로리 : {allData.kcal}</h3>
            <h3>무게 : {allData.weight}</h3>
            <div className="buttons">
              <Button>하이</Button>
              <Button>바이</Button>
              <Button>자이</Button>
            </div>
            
          </div>
        </div> */}

<Container>
        <TotalStyle>
          <Row>
            <Col>
              <ImageThumbnail src={`${IMAGE_URL}${allData.image_path}`} alt="이미지"></ImageThumbnail>
            </Col>
            <Col>
              <RegisterReq>
                <Titles>님의 식단</Titles>
                <Description
                >{allData.description}</Description>
                <Titles>{allData.food_name  }</Titles>
                <div className="nutBox">
                  <p className="line">칼로리 {allData.kcal}Kcal</p>
                  
                  <p className="line">지방 {allData.fat}g</p>
                  
                  <p className="line">탄수화물 {allData.carbohydrate}g</p>
                  
                  <p className="line">단백질 {allData.protein}g</p>
                
                </div>
                <Titles>댓글</Titles>
                <CommentBoxBig >
                  <div className="commentBox">
                    <CommentBox placeholder= '댓글을 입력하세요.'></CommentBox>
                    <SendButton>등록</SendButton>

                  </div>
                </CommentBoxBig>
              </RegisterReq>
            </Col>
          </Row>
        </TotalStyle>
        <ListButton>목록</ListButton>
        <UpdatdButton>수정</UpdatdButton>
        <BackButton onClick={goBack}>나가기</BackButton>
      </Container>
      
      </div>

  )}; 
  export default Detail
