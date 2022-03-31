import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { WEIGHT_HISTORY_REQUEST } from '../../../store/modules/myPage';
import { useDispatch, useSelector } from 'react-redux';
import {
    Title,
    MyPageProfileButton,
    editBox,
    ModalBodyWrapper,
    ButtonWrapper,
    ConfirmButton,
    CancelButton,
} from '../MyPage.style';
import {
    UPDATE_WEIGHT_HISTORY_REQUEST,
    UPDATE_WEIGHT_HISTORY_RESET,
    MY_PAGE_REQUEST
  } from '../../../store/modules/myPage';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export default function WeightHistory() {
    var temp = [];
    const datas = {
        labels: [],
        datasets: [
          {
            label: '체중(kg)',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp
          }
        ]
    };
    const { updateWeightHistoryInfoDone } = useSelector(state => state.mypage);
    const { me } = useSelector(state => state.mypage);
    const [password, setPassword] = useState('');
    const [createdAt, setDay] = useState('');
    const [Weight, setWeight] = useState('');
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    
    const DeletehandleOpen = () => setDeleteOpen(true);
    const DeletehandleClose = () => setDeleteOpen(false);
    const [Deleteopen, setDeleteOpen] = useState(false);

    // 몸무게 히스토리 원하는 날짜 몸무게 수정 요청.
    const handleWeightHistoryUpdateConfirm = () => {
        dispatch({
          type: UPDATE_WEIGHT_HISTORY_REQUEST,
            data: {
                createdAt: createdAt,
                weight : Weight
            }
        });
    };
    const handleWeightHistoryUpdateConfirmKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleWeightHistoryUpdateConfirm();
        }
    };

    // 몸무게 히스토리 원하는 날짜 몸무게 삭제 요청.
    const handleWeightHistoryDeleteConfirm = () => {
        dispatch({
          type: UPDATE_WEIGHT_HISTORY_REQUEST,
            data: {
                createdAt: createdAt,
            }
        });
    };
    const handleWeightHistoryDeleteConfirmKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleWeightHistoryDeleteConfirm();
        }
    };
    const dispatch = useDispatch();
    const { weightHistoryList } = useSelector(state => state.mypage);
    const created_at = [];
    const weight = [];
    if (weightHistoryList.length !== 0) {
        for(let i=0; i<weightHistoryList.length; i++) {
            created_at.push(weightHistoryList[i].created_at);
            weight.push(weightHistoryList[i].weight);
        }
        for(let i=0; i<weightHistoryList.length; i++) {
            datas.labels.push(created_at[i]);  
            temp.push(weight[i]);
        }
    }
    
     // 유저 정보를 받아왓을때
    useEffect(() => {
        
        if (updateWeightHistoryInfoDone) {
            setOpen(false);
            dispatch({
                type: UPDATE_WEIGHT_HISTORY_RESET ,
            });
            dispatch({
                type: MY_PAGE_REQUEST,
            })
        }
    
     }, [ me, updateWeightHistoryInfoDone]);
    useEffect(() => {
        dispatch({
            type: WEIGHT_HISTORY_REQUEST,
        });
    }, []);

   
    return (
        <div>
        {
            weightHistoryList.length === 0 && 
            <>
                <Title>가장 최근에 몸무게를 기록한 정보 상위 10개 History</Title>
                <div>나의 가장 최근 몸무게 History 차트를 보려면 몸무게 정보를 등록해주세요.</div>
            </>
        }
        {
            weightHistoryList.length !==0 &&
            <>
                    <Title>가장 최근 몸무게를 기록한 정보 상위 10개 History</Title>
                    <MyPageProfileButton
                        onClick={ handleOpen }
                    >몸무게 History 수정</MyPageProfileButton>
                    <Modal
                        open={ open }
                        onClose={ handleClose }
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                      <Box sx={ editBox }>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                             몸무게 History 수정
                        </Typography>
                        <hr/>
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                몸무게 History 수정을 위해서는<br/>
                                해당 날짜와, 수정할 몸무게 값이 필요합니다.
                        </Typography>
                        <ModalBodyWrapper onKeyPress={ handleWeightHistoryUpdateConfirmKeyPress }>
                            <span>날짜 : </span>
                            <input
                                type="input"
                                id="password"
                                onChange={e => {
                                setDay(e.target.value);
                                }}
                            ></input>
                            <span> ex) 2022-03-30</span>
                        </ModalBodyWrapper>
                        <ModalBodyWrapper onKeyPress={ handleWeightHistoryUpdateConfirmKeyPress }>
                            <span>몸무게 : </span>
                            <input
                                type="number"
                                id="password"
                                onChange={e => {
                                setWeight(e.target.value);
                                }} 
                            ></input>
                            <span> ex) 55</span>
                        </ModalBodyWrapper>
                        <hr/>
                        <ButtonWrapper>
                            <ConfirmButton onClick={ handleWeightHistoryUpdateConfirm }>
                            수정
                            </ConfirmButton>
                            <CancelButton onClick={ handleClose }>
                            닫기
                            </CancelButton>
                        </ButtonWrapper>
                      </Box>  
                    </Modal>

                    <MyPageProfileButton
                        onClick={ DeletehandleOpen  }
                    >몸무게 History 삭제</MyPageProfileButton>
                    <Modal
                        open={ Deleteopen }
                        onClose={ DeletehandleClose  }
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                      <Box sx={ editBox }>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            몸무게 History 삭제
                        </Typography>
                        <hr/>
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                            몸무게 History 삭제를 위해서는 해당 날짜의 값이 필요합니다. 
                        </Typography>
                        <ModalBodyWrapper onKeyPress={ handleWeightHistoryDeleteConfirmKeyPress }>
                            <span>날짜 : </span>
                            <input
                                type="input"
                                id="password"
                                onChange={e => {
                                setDay(e.target.value);
                                }}
                            ></input>
                            <span> ex) 2022-03-30</span>
                        </ModalBodyWrapper>
                        <hr/>
                        <ButtonWrapper>
                            <ConfirmButton onClick={ handleWeightHistoryDeleteConfirm }>
                            삭제
                            </ConfirmButton>
                            <CancelButton onClick={ DeletehandleClose }>
                            닫기
                            </CancelButton>
                        </ButtonWrapper>
                      </Box>  
                    </Modal> 
                <Chart type="line" data={datas} />
            </>
        }
        </div>
     );
}
