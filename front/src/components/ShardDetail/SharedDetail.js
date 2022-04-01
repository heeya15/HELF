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


// function UserComment({ user }, nowUser) {
//   console.log(user)
//   console.log(nowUser)
//   return (
//     <div >
//             <div key={user.comment_no} >
//               {
//                 nowUser == user.user_id
//                 ?<Titles>{user.user_id} : {user.comment} + 삭제버튼</Titles>
//                 :<Titles>{user.user_id} : {user.comment}+ 삭제버튼</Titles>

//               }
//             </div>
       
//     </div>
//   );
// }





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
    const rate = 100/( allData.protein + allData.carbohydrate + allData.fat)
    var protein = Number(rate * Number(allData.protein))
    var carbohydrate = Number(rate * Number(allData.carbohydrate))
    var fat = Number(rate * Number(allData.fat))
    const myData = [
      { title: "탄수화물", value : Math.round(carbohydrate), color : '#F6CB44' },
      { title: "단백질", value : Math.round(protein), color : '#000000' },
      { title: "지방", value : Math.round(fat), color : '#F6CB44' },
    ];
    
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
                  <Titles>{allData.food_name  }</Titles>
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
                                <button>수정</button>
                                <button>삭제</button>
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
          <ListButton>목록</ListButton>
          {/* 작성자 == 조회자 이면 수정 버튼 활성화 */}
          {
              userData == allData.user_id
              ? <UpdatdButton>수정</UpdatdButton>
              : null
            }
          <BackButton onClick={goBack}>나가기</BackButton>
          </Container>
      
      </div>

  )}; 
  export default Detail
