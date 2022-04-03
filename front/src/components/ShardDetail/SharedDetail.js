import React, { Component , useState, useEffect,useRef  } from "react";
import axios from 'axios';
import { Link, useParams, useHistory } from "react-router-dom";
import { BASE_URL, IMAGE_URL, LOCAL_URL } from "../../utils/https";
import { Button } from "react-bootstrap";
import './SharedDetail.css'
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import deleteBtn from "./deletebutton_87299.png";
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
  SendButton,
  CommentDeleteBtn,
  CommentTitles,
  CommentUpdatdButton
} from "./SharedDetail.style";
import { 
  LikeListStyle,
} from "../MyPage/MyPage.style";
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import {
  MY_PAGE_LIKE_REQUEST,
  MY_PAGE_LIKE_DELETE_REQUEST,
} from "../../store/modules/myPage";
import {
  SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
  SHARE_BOARD_LIKE_REGISTER_REQUEST 
} from "../../store/modules/shareBoard";
import { style } from "@mui/system";


// match 로 현재 게시물 주소에 대한 정보를 props 로 받아온다
function Detail({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const index = match.params.index.substring(0);
    const token = sessionStorage.getItem("jwt");

    const [allData, setAlldata] = useState([]);
    const [commentData, setComment] = useState([]);
    const [userData, setUser] = useState([]);
    const [LikeCount, setTotalLikeCount] = useState(0);
    const { isLike,totalLikeCount } = useSelector((state) => state.shareBoard);
  
   const likeDelete = (boardNo, e) => {
      dispatch({
        type: SHARE_BOARD_LIKE_REGISTER_REQUEST,
        data: boardNo,
      });
  };
  const likeRegister = (boardNo, e) => {
    dispatch({
      type: SHARE_BOARD_LIKE_REGISTER_REQUEST,
      data: boardNo,
    });
  };

  useEffect(() => {
    // 좋아요 여부와 좋아요 개수 들고옴.
      dispatch({
        type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
        data:index
      });
      setTotalLikeCount(totalLikeCount); 
    
      axios.get(`${BASE_URL}shareboard/find/${index}`,
      // `${LOCAL_URL}shareboard/findAll`, 
      {
      headers: { 
        Authorization: `Bearer ${ token }`
      }})
          .then(response => {
            // 나중에 response.data 로 data 가져오기 가능
            setAlldata(response.data[0]); 
            console.log("hi");
            console.log(response) 

          });
  }, [totalLikeCount, isLike]);
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
    const commentDeleteHandler = ( commentNo, e ) => {
      console.log(commentNo); // 뭐임?
      axios.delete(`${BASE_URL}comment/remove/${commentNo}`,
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
      //  댓글 수정
    let [input, setInput] = useState('')
    let [CommentNoinput, setCommentNoinput] = useState('')

    const handleClick= async ( commentNo, commentText, e )=>{
        setInput(commentText)
        await setCommentNoinput(commentNo)

    }

    const handleChange=(e)=>{
      console.log(`진입함`)
      if (e.target.value === ''){ setInput(' ')}
      else{
      setInput(e.target.value)}
    }   
    const handleKeydown=(e)=>{
      if(e.key==='Enter'){
          console.log(`엔터키 눌러짐`)
          setInput(e.target.value)
          console.log(e.value)
          axios.put(`${BASE_URL}comment/update`,
            {commentNo: CommentNoinput,
            comment: input},
              {
                headers : { 
                  Authorization: `Bearer ${ token }`
                }
              }
              )
              .then((res => {
                console.log(res)
                setInput("");
                setCommentNoinput("");
              }))
          };
      }
  

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
                  <Titles>{allData.user_id}님의 식단.
                </Titles>
                  <Description
                  >{allData.description}</Description>
                  <Titles>{allData.food_name  } 100g</Titles>
                  <div className="nutBox">
                    <p className="line">칼로리 {allData.kcal}Kcal</p>
                    
                    <p className="line">지방 {allData.fat}g</p>
                    
                    <p className="line">탄수화물 {allData.carbohydrate}g</p>
                    
                    <p className="line">단백질 {allData.protein}g</p>
                  
                  </div>

                </RegisterReq>
                {isLike ? (
                <LikeListStyle >
                    <div className="total">
                      <AiFillHeart
                        size="20"
                        className="iconMargin"
                        onClick={(e) => {
                          likeDelete(index, e);
                        } } 
                      />
                      <Titles>{LikeCount}명이 좋아합니다.</Titles>
                  </div>
                  
                </LikeListStyle>
              ) : (
                <LikeListStyle >
                  <div className="total">
                  <AiOutlineHeart
                    size="20"
                    className="iconMargin"
                    onClick={(e) => {
                      likeRegister(index, e);
                    } }
                    />
                    <Titles>{LikeCount}명이 좋아합니다.</Titles>
                    </div>
                    
                </LikeListStyle>
                )} 
              </Col>
                <div className="newCommentBox">
                <Titles className="newText">  댓글</Titles>
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
                              <CommentTitles className="newText">{user.user_id} : {user.comment} </CommentTitles>
 
                              {/* 삭제파트 */}
                              <CommentDeleteBtn  className="newText2" onClick={(e) => {
                                  commentDeleteHandler(user.comment_no);
                                }}>삭제</CommentDeleteBtn>
                              
                              {/*  수정파트 */}
                              <CommentUpdatdButton className="newText2" onClick={(e) => {
                                  handleClick(user.comment_no , user.comment);
                                      }} >
                                        {input ?( user.comment_no === CommentNoinput
                                                  ? <input type="text" value={input} onChange={handleChange} onKeyDown= {handleKeydown}
                                              /> 
                                            : `수정`
                                          ): `수정`}
                              </CommentUpdatdButton>
                              </div>
                            :<div className="commentDelete"><CommentTitles>{user.user_id} : {user.comment}</CommentTitles></div>
                          }
                        </div>      
                    ))}
                  </CommentBoxBig>
                  </div>
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
