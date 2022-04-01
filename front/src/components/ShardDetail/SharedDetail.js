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
    const [userData, setUser] = useState([]);

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
              console.log(response) 

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
            setComment(response.data);
          }).catch(err => {
          });
  }, [commentData]);
    
  
    useEffect(() => {
      axios.get(`${BASE_URL}user/find/me`,
      // `${LOCAL_URL}shareboard/findAll`, 
      {
      headers: { 
        Authorization: `Bearer ${ token }`
      }})
          .then(response => {
            // 나중에 response.data 로 data 가져오기 가능
            setUser(response.data.userId) 
            ;
          }).catch(err => {
          });
  }, []);


    const history = useHistory();

    const goBack = () => {
      history.push(`/sharedBoard`);
    };

    const boardDelete =() => {
      axios.delete(`${BASE_URL}shareboard/remove?boardNo=${allData.board_no}&diaryNo=${allData.diary_no}`,
        {
          headers : { 
            Authorization: `Bearer ${ token }`
          }
        }
        )
        .then((res => {
          console.log(res)
          history.push(`/sharedBoard`);
        }))
    }


    //  댓글 관련

    const [Comment, SetComment] = useState("");

    const resetInputField = () => {
      
    };

    const commentHandler  = ({ target: { value } }) => {
      SetComment(value);
    };

    const submitHandler = (e) => {
      e.preventDefault();
      axios.post(`${BASE_URL}comment/register`,
      {boardNo: index,
      comment: Comment},
        {
          headers : { 
            Authorization: `Bearer ${ token }`
          }
        }
        )
        .then((res => {
          console.log(res)
          SetComment("");
        }))
    };
    const commentDeleteHandler = ({ target: { value } }) => {
      axios.delete(`${BASE_URL}comment/remove/${value}`,
        {
          headers : { 
            Authorization: `Bearer ${ token }`
          }
        }
        )
        .then((res => {
          console.log(res)
        }))
    };

  return (
      <div className="bigBox">

        <Container>
          <TotalStyle>
            <Row>
              <Col>
                <ImageThumbnail src={`${IMAGE_URL}${allData.image_path}`} alt="이미지"></ImageThumbnail>
              </Col>
              <Col>
                <RegisterReq>
                  <Titles>{allData.user_id}님의 식단</Titles>
                  <Description
                  >{allData.description}</Description>
                  <Titles>{allData.food_name  } 100g</Titles>
                  <div className="nutBox">
                    <p className="line">칼로리 {allData.kcal}Kcal</p>
                    
                    <p className="line">지방 {allData.fat}g</p>
                    
                    <p className="line">탄수화물 {allData.carbohydrate}g</p>
                    
                    <p className="line">단백질 {allData.protein}g</p>
                  
                  </div>
                  <Titles>댓글</Titles>
                  <CommentBoxBig >
                    <form className="commentBox" onSubmit={submitHandler}>
                      <CommentBox placeholder= '댓글을 입력하세요.' value={Comment} onChange={commentHandler}></CommentBox>
                      <SendButton type="submit" onClick={resetInputField}>등록</SendButton>
                    </form>
                    {/*  댓글 보이기 */}
                    {commentData.map(user => (
              
                        <div key={user.comment_no} >
                          {
                            userData == user.user_id
                            ?<div className="commentDelete">
                              <Titles>{user.user_id} : {user.comment} </Titles>
                              <div className="commentButton">                     
                                {/* <button>수정</button> */}
                                <button value={user.comment_no} onClick={commentDeleteHandler}>삭제</button>
                              </div>
         
                              </div>
                            :<div className="commentDelete"><Titles>{user.user_id} : {user.comment}</Titles></div>
            
                          }
                        </div>
                  
               
                    ))}
                  </CommentBoxBig>
                </RegisterReq>
              </Col>
            </Row>
          </TotalStyle>
          <ListButton onClick={goBack}>목록</ListButton>
          {/* 작성자 == 조회자 이면 수정 버튼 활성화 */}
          {
              userData == allData.user_id
              ? <UpdatdButton>수정</UpdatdButton>
              : null
            }
          <BackButton onClick={boardDelete}>삭제</BackButton>
          </Container>
      
      </div>

  )}; 
  export default Detail
