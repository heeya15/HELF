import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL, IMAGE_URL } from "../../utils/https";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ShareDetail.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Title,
  TotalStyle,
  RegisterReq,
  ListButton,
  UpdateButton,
  DeleteButton,
  Titles,
  Description,
  ImageThumbnail,
  CommentBox,
  CommentHeader,
  CommentBoxBig,
  SendButton,
  CommentTitles,
  CommentWrapper,
  FoodListStyle,
  LikeListStyle,
  CommentUpdateBox,
} from "./ShareDetail.style";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
  SHARE_BOARD_LIKE_REGISTER_REQUEST,
  SHARE_BOARD_UPDATE_REQUEST,
  SHARE_BOARD_DETAIL_SELECT_REQUEST,
  SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST,
  SHARE_BOARD_DELETE_REQUEST,
} from "../../store/modules/shareBoard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { FoodTableTitle } from "../MyDiet/MyDietDetail.style";
// match 로 현재 게시물 주소에 대한 정보를 props 로 받아온다
function Detail({ match }) {
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const index = match.params.index.substring(0);
  const token = sessionStorage.getItem("jwt");

  const [commentData, setComment] = useState([]);
  // const [userData, setUser] = useState([]);
  const [LikeCount, setTotalLikeCount] = useState(0);
  const {
    isLike,
    totalLikeCount,
    shareBoardDetailList,
    detailimagePath,
    detaildescription,
    shareUserId,
    shareDiaryNo,
  } = useSelector((state) => state.shareBoard);
  const { me } = useSelector((state) => state.mypage);

  var [inputDescription, setInputDescription] = useState("");
  const likeDelete = (boardNo, e) => {
    dispatch({
      type: SHARE_BOARD_LIKE_REGISTER_REQUEST,
      data: boardNo,
    });
  };
  const likeRegister = (boardNo) => {
    dispatch({
      type: SHARE_BOARD_LIKE_REGISTER_REQUEST,
      data: boardNo,
    });
  };
  const updateDescriptionHandler = () => {
    setUpdateForm(true);
  };
  // 해당 공유 게시글 Description  수정
  const updateDescription = (description) => {
    dispatch({
      type: SHARE_BOARD_UPDATE_REQUEST,
      data: {
        boardNo: index,
        description: description,
      },
    });
    setUpdateForm(false);
    dispatch({
      type: SHARE_BOARD_DETAIL_SELECT_REQUEST,
      data: index,
    });
  };

  const DescriptionhandleChange = (e) => {
    setInputDescription(e.target.value);
  };

  // 최초 1회 실행
  useEffect(() => {
    dispatch({
      type: SHARE_BOARD_DETAIL_SELECT_REQUEST,
      data: index,
    });
    dispatch({
      type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
      data: index,
    });
    // 조회수 1증가 요청
    dispatch({
      type: SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST,
      data: index,
    });
  }, []);

  useEffect(() => {
    // 좋아요 여부와 좋아요 개수 들고옴.
    dispatch({
      type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
      data: index,
    });
    setTotalLikeCount(totalLikeCount);
    dispatch({
      type: SHARE_BOARD_DETAIL_SELECT_REQUEST,
      data: index,
    });
    setInputDescription(detaildescription);
  }, [totalLikeCount, isLike, detaildescription]);

  //  댓글 가져오기
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}comment/findAll/${index}`,
        // `${LOCAL_URL}shareboard/findAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // 나중에 response.data 로 data 가져오기 가능
        setComment(response.data);
      })
      .catch((err) => {
        history.push(`/sharedBoard`);
      });
  }, [commentData]);

  // 게시판으로 돌아가기
  const goBack = () => {
    history.push(`/sharedBoard`);
  };

  // 공유 게시글 삭제 (공유 해제)
  const boardDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch({
        type: SHARE_BOARD_DELETE_REQUEST,
        data: {
          diaryNo: shareDiaryNo,
        },
      });
      history.push(`/sharedBoard`);
    } else {
      alert("취소되었습니다.");
    }
  };

  //  댓글 관련
  const [Comment, SetComment] = useState("");

  const commentHandler = ({ target: { value } }) => {
    SetComment(value);
  };

  const handleCommentRegisterKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}comment/register`,
        { boardNo: index, comment: Comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        SetComment("");
      });
  };
  const commentDeleteHandler = (commentNo, e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`${BASE_URL}comment/remove/${commentNo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      alert("취소되었습니다.");
    }
  };
  //  댓글 수정
  let [input, setInput] = useState("");
  let [CommentNoinput, setCommentNoinput] = useState("");

  const handleClick = async (commentNo, commentText, e) => {
    setInput(commentText);
    await setCommentNoinput(commentNo);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setInput(" ");
    } else {
      setInput(e.target.value);
    }
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      setInput(e.target.value);
      axios
        .put(
          `${BASE_URL}comment/update`,
          { commentNo: CommentNoinput, comment: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setInput("");
          setCommentNoinput("");
        });
    }
  };

  const FoodList = shareBoardDetailList.map((food, index) => {
    return (
      <div key={index}>
        <FoodTableTitle>
          {food.food_name} {food.weight}g
        </FoodTableTitle>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  칼로리
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  탄수화물
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  단백질
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  지방
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.kcal &&
                    Math.round((food.weight / 100) * food.kcal * 100) / 100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.carbohydrate &&
                    Math.round((food.weight / 100) * food.carbohydrate * 100) /
                      100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.protein &&
                    Math.round((food.weight / 100) * food.protein * 100) / 100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.fat &&
                    Math.round((food.weight / 100) * food.fat * 100) / 100}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  });

  return (
    <div className="bigBox">
      <Container>
        <Title>식단 상세정보</Title>
        <TotalStyle>
          <Row>
            <Col>
              <ImageThumbnail
                src={`${IMAGE_URL}${detailimagePath}`}
                alt="diet diary image"
              ></ImageThumbnail>
            </Col>
            <Col>
              <RegisterReq>
                <Titles>
                  {shareUserId}님의 식단
                  {/* 작성자 == 조회자 이면 수정 버튼 활성화 */}
                  {me.userId === shareUserId && updateForm === false ? (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        updateDescriptionHandler(e);
                      }}
                    >
                      {" "}
                      수정
                    </EditIcon>
                  ) : null}
                  {updateForm === true ? (
                    <UpdateButton
                      onClick={() => {
                        updateDescription(inputDescription);
                      }}
                    >
                      완료
                    </UpdateButton>
                  ) : null}
                </Titles>

                {updateForm === false ? (
                  <Description rows="5" readOnly value={detaildescription} />
                ) : (
                  <Description
                    rows="5"
                    type="text"
                    defaultValue={detaildescription}
                    onChange={DescriptionhandleChange}
                  />
                )}
                <FoodListStyle>
                  {shareBoardDetailList.length !== 0 && FoodList}
                </FoodListStyle>
              </RegisterReq>
              {isLike ? (
                <LikeListStyle>
                  <div className="total">
                    <AiFillHeart
                      size="20"
                      className="iconMargin"
                      onClick={(e) => {
                        likeDelete(index, e);
                      }}
                    />
                    <Titles>{LikeCount}명이 좋아합니다.</Titles>
                  </div>
                </LikeListStyle>
              ) : (
                <LikeListStyle>
                  <div className="total">
                    <AiOutlineHeart
                      size="20"
                      className="iconMargin"
                      onClick={() => {
                        likeRegister(index);
                      }}
                    />
                    <Titles>{LikeCount}명이 좋아합니다.</Titles>
                  </div>
                </LikeListStyle>
              )}
            </Col>
            <div style={{ marginTop: "3%" }}>
              <Titles className="newText"> 댓글</Titles>
              <CommentHeader>
                <CommentWrapper>
                  <CommentBox
                    onKeyPress={handleCommentRegisterKeyPress}
                    placeholder="댓글을 입력하세요."
                    value={Comment}
                    onChange={commentHandler}
                  />
                  <SendButton onClick={submitHandler}>등록</SendButton>
                </CommentWrapper>
              </CommentHeader>
              <CommentBoxBig>
                {/*  댓글 보이기 */}
                <div>
                  {commentData.map((user) => (
                    <div key={user.comment_no}>
                      {me.userId == user.user_id ? (
                        <Row>
                          <Col md="11">
                            <CommentTitles className="newText">
                              {user.user_id} :
                              {input ? (
                                user.comment_no === CommentNoinput ? (
                                  <CommentUpdateBox
                                    type="text"
                                    value={input}
                                    onChange={handleChange}
                                    onKeyDown={handleKeydown}
                                  />
                                ) : (
                                  <span style={{ fontFamily: "KOTRA_GOTHIC" }}>
                                    {" "}
                                    {user.comment}
                                  </span>
                                )
                              ) : (
                                <span style={{ fontFamily: "KOTRA_GOTHIC" }}>
                                  {" "}
                                  {user.comment}
                                </span>
                              )}
                            </CommentTitles>
                          </Col>
                          <Col md="1">
                            {/* 삭제파트 */}
                            <DeleteIcon
                              style={{
                                cursor: "pointer",
                                marginLeft: "5px",
                                float: "right",
                              }}
                              onClick={(e) => {
                                commentDeleteHandler(user.comment_no);
                              }}
                            />
                            {/*  수정파트 */}
                            <EditIcon
                              style={{ cursor: "pointer", float: "right" }}
                              onClick={(e) => {
                                handleClick(user.comment_no, user.comment);
                              }}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <Row>
                          <Col md="11">
                            <CommentTitles className="newText">
                              {user.user_id} :{" "}
                              <span style={{ fontFamily: "KOTRA_GOTHIC" }}>
                                {" "}
                                {user.comment}
                              </span>
                            </CommentTitles>
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))}
                </div>
              </CommentBoxBig>
            </div>
          </Row>
        </TotalStyle>
        <ListButton onClick={goBack}>목록</ListButton>

        {me.userId === shareUserId && updateForm === false ? (
          <DeleteButton onClick={boardDelete}>삭제</DeleteButton>
        ) : null}
      </Container>
    </div>
  );
}
export default Detail;
