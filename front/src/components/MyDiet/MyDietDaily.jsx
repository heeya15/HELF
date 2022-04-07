import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { IMAGE_URL } from '../../utils/https';
import {
  MY_DIET_DIARY_DAILY_INFO_REQUEST,
  MY_DIET_DIARY_DELETE_REQUEST,
} from '../../store/modules/myDiet';
import { 
  SHARE_BOARD_REGISTER_REQUEST,
  SHARE_BOARD_DELETE_REQUEST,
} from '../../store/modules/shareBoard';
import {
  DietDiaryItemWrapper,
  addButton,
  ShareButton,
  DietDiaryItem,
  TotalKcal,
  shareBox,
  DescriptionArea,
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
  fontNormal,
  MenuTitle,
  SharedButton,
  modalTitle,
} from './MyDiet.style';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSelect } from '@mui/base';


function convertMonth(month) {
  switch(month) {
    case '01': 
      return 'Jan';
    case '02': 
      return 'Feb';
    case '03': 
      return 'Mar';
    case '04': 
      return 'Apr';
    case '05':
      return 'May';
    case '06': 
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09': 
      return 'Sep';
    case '10':
      return 'Oct';
    case '11': 
      return 'Nov';
    case '12':
      return 'Dec';
  }
}

export default function MyDietDaily() {
  const dispatch = useDispatch();
  const date = useParams().date;
  const { myDietDiaryDailyInfo, myDietDiaryDeleteDone } = useSelector(
    (state) => state.myDiet
  );
  const { me } = useSelector(state => state.mypage);
  const { shareBoardDeleteDone } = useSelector(state => state.shareBoard);

  const [open, setOpen] = useState(false);
  const [shareDiaryNo, setShareDiaryNo] = useState('');
  const [shareDescription, setShareDescription] = useState('');

  const handleOpen = (info) => {
    setShareDiaryNo(info.diaryNo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCancelShare = (info) => {
    if(window.confirm('식단 공유를 중지하시겠습니까?')) {
      dispatch({
        type: SHARE_BOARD_DELETE_REQUEST,
        data: {
          diaryNo: info.diaryNo,
        }
      });
      // history.push(`/sharedBoard`);
    } else {
      alert('취소되었습니다.');
    }
  }

  const handleConfirmKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleShareDietDiary();
    }
  }

  var dailyDate = convertMonth(date.substring(5,7)) + ' ' + date.substring(8,10) + ', ' + date.substring(0,4);

  var kcals = 0;
  const kcalList = [];
  const diaryInfoList = [];
  for (let i = 0; i < myDietDiaryDailyInfo.length; i++) {
    var hour = myDietDiaryDailyInfo[i].diaryDate.substring(11, 13);
    var minute = myDietDiaryDailyInfo[i].diaryDate.substring(14, 16);
    const diaryDate = myDietDiaryDailyInfo[i].diaryDate.substring(0, 10);

    var AmPm = hour >= 12 ? 'pm' : 'am';
    hour = (hour % 12) || 12;

    const diaryTime = hour + ':' + minute + ' ' + AmPm;
    const foodList = [...myDietDiaryDailyInfo[i].dietFindResList];
    for (let j = 0; j < foodList.length; j++) {
      kcals += (foodList[j].kcal * (foodList[j].weight/100)) ;
    }

    diaryInfoList.push({
      diaryNo: myDietDiaryDailyInfo[i].diaryNo,
      mealTime: myDietDiaryDailyInfo[i].mealTime,
      diaryDate: diaryDate,
      diaryTime: diaryTime,
      kcal: kcals,
      printKcal: kcals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      description: myDietDiaryDailyInfo[i].description,
      imagePath: myDietDiaryDailyInfo[i].imagePath,
      imageFullPath: `${IMAGE_URL}${myDietDiaryDailyInfo[i].imagePath}`,
      isShared: myDietDiaryDailyInfo[i].isShared,
    });

    kcalList.push(kcals); // 총 합을 위한
  }

  var totalKcal = 0;
  if (kcalList.length > 0) {
    totalKcal = kcalList.reduce((total, currentValue) => {
      return total + currentValue;
    });
    totalKcal = totalKcal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  if(month < userMonth) {
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
  var suggestTotalKcal = bmr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const history = useHistory();
  const goBack = () => {
    history.push('/mydiet');
  };

  const clickAddBtn = () => {
    // 일정 생성 폼에 date 넘겨주기
    history.push(`/mydietregister/${date}`);
  };

  const handleShareDietDiary = () => {
    dispatch({
      type: SHARE_BOARD_REGISTER_REQUEST,
      data: {
        diaryNo: shareDiaryNo,
        shareDescription: shareDescription,
        hit: 0,
        createdAt: '',
      },
    });
    setOpen(false); // 모달 창 닫기
    history.push(`/sharedboard`);
    // 공유게시판 등록 페이지에 diaryNo 넘겨주기
  };

  const clickDeleteBtn = (info) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      dispatch({
        type: MY_DIET_DIARY_DELETE_REQUEST,
        data: { date: info },
      });
      alert('삭제되었습니다');
    } else {
      alert('취소되었습니다.');
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
  }, [ myDietDiaryDeleteDone, shareBoardDeleteDone ]); // 삭제 event가 발생하면 새로 일별 식단 일지 리스트 가져오기

  return (
    <DietDiaryItemWrapper>
      <MenuTitle>{dailyDate} 식단</MenuTitle>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
          <ArrowBackIosOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={() => {
              goBack();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
          <Fab style={ addButton } aria-label="add" onClick={clickAddBtn} >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <div>
        {diaryInfoList.map((info) => (
          <DietDiaryItem key={info.diaryNo}>
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5} style={{ textAlign: 'left' }}>
                  <DiaryImg
                    src={info.imageFullPath}
                    alt='식단 이미지'
                    onClick={() => clickDietDiaryItem(info.diaryNo)}
                  ></DiaryImg>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <DiaryItemWrapper>
                    <DiaryItemLeftWrapper>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <DiaryTitle style={{ marginTop: '10px' }}>{info.mealTime}</DiaryTitle>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ textAlign: 'right', marginTop: '0' }}>
                        <IconButton 
                          aria-label='delete' 
                          size='large'
                          fontSize='inherit'
                          onClick={() => clickDeleteBtn(info)}
                          >
                          <DeleteIcon/>
                        </IconButton>
                        </Grid>
                      </Grid> 
                      <DiaryTime style={fontNormal}>{info.diaryTime}</DiaryTime>
                      <DiaryKcal style={fontNormal}>{info.printKcal} kcal</DiaryKcal>
                      <DiaryDesc style={fontNormal}>{info.description}</DiaryDesc>
                  </DiaryItemLeftWrapper>
                  <DiaryItemRightWrapper>
                    { info.isShared ? 
                      (
                        <SharedButton onClick={() => handleCancelShare(info)}>Shared</SharedButton>
                      ) : (
                      <ShareButton onClick={() => handleOpen(info)}>
                        Share
                      </ShareButton>
                      )
                    }
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'
                    >
                      <Box sx={shareBox} onKeyPress={ handleConfirmKeyPress }>
                        <Typography 
                          id='modal-modal-title' 
                          component='h2'
                          style={ modalTitle }>
                          식단 공유
                        </Typography>
                        <hr />
                        <Typography 
                          id='modal-modal-description' 
                          sx={{ mt: 2 }}
                          style={fontNormal}>
                          식단 공유와 함께 추가 설명을 적어주세요.
                        </Typography>
                        <DescriptionArea
                          maxRows={4}
                          aria-label='maximum height'
                          placeholder='this is description...'
                          onChange={(event) => {
                            setShareDescription(event.target.value);
                          }}
                        />
                        <ButtonWrapper>
                          <CancelButton onClick={ handleClose }>닫기</CancelButton>
                          <ConfirmButton
                            onClick={ handleShareDietDiary }
                          >
                            확인
                          </ConfirmButton>
                        </ButtonWrapper>
                      </Box>
                    </Modal>
                    
                    </DiaryItemRightWrapper>
                  </DiaryItemWrapper>
                </Grid>
              </Grid>
            </Box> 

          </DietDiaryItem>
        ))}
      </div>
      <TotalKcal>Total Kcal : {totalKcal} kcal</TotalKcal>
      <div>({me.userName}님의 하루 권장 섭취 칼로리는 <Bold>{suggestTotalKcal} Kcal</Bold> 입니다.)</div>
    </DietDiaryItemWrapper>
  );
}
