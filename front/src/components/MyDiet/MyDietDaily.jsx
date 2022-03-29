import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { TextareaAutosize } from "@mui/material";
import { IMAGE_URL } from "../../utils/https";
import {
  MY_DIET_DIARY_DAILY_INFO_REQUEST,
  MY_DIET_DIARY_DELETE_REQUEST,
  MY_DIET_DIARY_DELETE_SUCCESS,
} from "../../store/modules/myDiet";
import { SHARE_BOARD_REGISTER_REQUEST } from "../../store/modules/shareBoard";

// import styled from "styled-components";
import {
  DietDiaryItemWrapper,
  AddButton,
  ShareButton,
  DiaryList,
  DietDiaryItem,
  TotalKcal,
  DeleteButton,
  shareBox,
  descriptionArea,
  ButtonWrapper,
  ConfirmButton,
  CancelButton,
  Bold,
  DiaryItemWrapper,
  DiaryItemLeftWrapper,
  DiaryItemRightWrapper,
  DiaryImg,
  DiaryTitle,
  DiaryTime,
  DiaryKcal,
  DiaryDesc,
} from "./MyDiet.style";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { MY_DIET_DIARY_LIST_REQUEST, DIARY_DATE_SAVE } from '../../store/modules/myDiet'

export default function MyDietDaily() {
  const dispatch = useDispatch();
  const date = useParams().date;
  const { myDietDiaryDailyInfo, myDietDiaryDeleteDone } = useSelector(
    (state) => state.myDiet
  );
  const { me } = useSelector(state => state.mypage);

  const [open, setOpen] = useState(false);
  const [shareDescription, setShareDescription] = useState("");
  const handleOpen = (diaryNo) => {
    setOpen(true);
    // clickShareBtn(diaryNo);
  };
  const handleClose = () => setOpen(false);
  console.log(">>>>>>>>>>>>>>>> user : ", me);

  const kcals = [];
  const kcalList = [];
  const diaryInfoList = [];
  for (let i = 0; i < myDietDiaryDailyInfo.length; i++) {
    const hour = myDietDiaryDailyInfo[i].diaryDate.substring(11, 13);
    const diaryDate = myDietDiaryDailyInfo[i].diaryDate.substring(0, 10);
    const diaryTime =
      myDietDiaryDailyInfo[i].diaryDate.substring(11, 16) +
      " " +
      (hour < 12 ? "AM" : "PM");
    const foodList = [...myDietDiaryDailyInfo[i].dietFindResList];
    for (let j = 0; j < foodList.length; j++) {
      kcals.push(foodList[j].weight * foodList[j].kcal);
    }

    // 각 식사시간대별 kcal 누적합 구하기
    const sumKcal = kcals.reduce((sum, currValue) => {
      return sum + currValue;
    });

    diaryInfoList.push({
      diaryNo: myDietDiaryDailyInfo[i].diaryNo,
      mealTime: myDietDiaryDailyInfo[i].mealTime,
      diaryDate: diaryDate,
      diaryTime: diaryTime,
      kcal: sumKcal,
      printKcal: sumKcal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      description: myDietDiaryDailyInfo[i].description,
      imagePath: myDietDiaryDailyInfo[i].imagePath,
      imageFullPath: `${IMAGE_URL}${myDietDiaryDailyInfo[i].imagePath}`,
      isShared: myDietDiaryDailyInfo[i].isShared,
    });

    kcalList.push(sumKcal); // 총 합을 위한
  }

  var totalKcal = 0;
  if (kcalList.length > 0) {
    totalKcal = kcalList.reduce((total, currentValue) => {
      return total + currentValue;
    });
    totalKcal = totalKcal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const now = new Date();   // 현재 날짜 및 시간
  const year = now.getFullYear(); // 연도
  const month = now.getMonth();   // 월
  const day = now.getDate();      // 일
  const userYear = me.birthday.substring(0, 4);
  const userMonth = me.birthday.substring(5, 7);
  const userDay = me.birthday.substring(9, 10);

  // 유저 만 나이 구하기
  var age = 0;
  if(month < userYear) {
    age = year - userYear - 1;
  } else if(month == userYear) {
    if(day < userDay) {
      age = year - userYear - 1;
    }
  }

  // 유저 기초대사량 구하기 (Mifflin-St Jeor Equation)
  var bmr = 0;
  if(!me.gender) { // 남성인 경우
      bmr = (me.weight * 10 + me.height * 6.25 - 5 * age + 5);
  } else {         // 여성인 경우
      bmr = (me.weight * 10 + me.height * 6.25 - 5 * age - 161);
  }

  // 하루 필요 에너지
  // 1. 활동이 적은 경우 1.2
  // 2. 적당한 활동이 있는 경우 1.35 (v)
  // 3. 운동 선수나 하루종일 몸을 사용하는 일을 하는 경우 1.5
  bmr = Math.round(bmr * 1.35);
  var suggestTotalKcal = bmr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const history = useHistory();
  const goBack = () => {
    history.push("/mydiet");
  };

  const clickAddBtn = () => {
    // 일정 생성 폼에 date 넘겨주기
    console.log(date);
    history.push(`/mydietregister/${date}`);
  };

  const handleShareDietDiary = (diaryNo) => {
    console.log(diaryNo);
    dispatch({
      type: SHARE_BOARD_REGISTER_REQUEST,
      data: {
        diaryNo: diaryNo,
        shareDescription: shareDescription,
        hit: 0,
        createdAt: "",
      },
    });
    setOpen(false); // 모달 창 닫기
    history.push(`/sharedboard`);
    // 공유게시판 등록 페이지에 diaryNo 넘겨주기
  };

  const clickDeleteBtn = (info) => {
    if(window.confirm("정말 삭제합니까?")) {
      dispatch({
        type: MY_DIET_DIARY_DELETE_REQUEST,
        data: { date: info },
      });
      alert("삭제되었습니다");
    } else {
      alert("취소합니다.");
    }
  };

  const clickDietDiaryItem = (diaryNo) => {
    history.push(`/mydietdetail/${date}/${diaryNo}`);
  };

  useEffect(() => {
    dispatch({
      type: MY_DIET_DIARY_DAILY_INFO_REQUEST,
      data: { date: date },
    });
  }, [myDietDiaryDeleteDone]); // 삭제 event가 발생하면 새로 일별 식단 일지 리스트 가져오기

  return (
    <DietDiaryItemWrapper>
      <h1>{date}</h1>
      <Button
        onClick={() => {
          goBack();
        }}
      >
        back
      </Button>
      <div>
        <AddButton onClick={clickAddBtn}>
          <AddIcon />
        </AddButton>
      </div>
      <div>
        {diaryInfoList.map((info) => (
          <DietDiaryItem key={info.diaryNo}>
            <Box sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DiaryImg
                    src={info.imageFullPath}
                    alt="식단 이미지"
                    onClick={() => clickDietDiaryItem(info.diaryNo)}
                  ></DiaryImg>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DiaryItemWrapper>
                    <DiaryItemLeftWrapper>
                      <DiaryTitle>{info.mealTime}</DiaryTitle>
                      <DiaryTime>{info.diaryTime}</DiaryTime>
                      <DiaryKcal>{info.printKcal} kcal</DiaryKcal>
                      <DiaryDesc>{info.description}</DiaryDesc>
                  </DiaryItemLeftWrapper>
                  <DiaryItemRightWrapper>
                    <ShareButton onClick={() => handleOpen(info.diaryNo)}>
                      Share
                    </ShareButton>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={shareBox}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                          식단 공유
                        </Typography>
                        <hr />
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          식단 공유와 함께 추가 설명을 적어주세요.
                        </Typography>
                        <TextareaAutosize
                          maxRows={4}
                          aria-label="maximum height"
                          placeholder="this is description..."
                          style={descriptionArea}
                          onChange={(event) => {
                            setShareDescription(event.target.value);
                          }}
                        />
                        <ButtonWrapper>
                          <ConfirmButton
                            onClick={() => handleShareDietDiary(info.diaryNo)}
                          >
                            확인
                          </ConfirmButton>
                          <CancelButton onClick={() => handleClose}>닫기</CancelButton>
                        </ButtonWrapper>
                      </Box>
                    </Modal>
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon
                        fontSize="inherit"
                        onClick={() => clickDeleteBtn(info)}
                      />
                    </IconButton>
                    </DiaryItemRightWrapper>
                  </DiaryItemWrapper>
                </Grid>
              </Grid>
            </Box> 

          </DietDiaryItem>
        ))}
      </div>
      <TotalKcal>Total Kcal : {totalKcal} kcal</TotalKcal>
      <div>({me.userId}님의 하루 권장 섭취 칼로리는 <Bold>{suggestTotalKcal} Kcal</Bold> 입니다.)</div>
    </DietDiaryItemWrapper>
  );
}
