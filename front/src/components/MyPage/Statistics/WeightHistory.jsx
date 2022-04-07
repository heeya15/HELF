import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import {
    Title,
    MyPageProfileButton,
    weightEditInput,
    editBox,
    ModalBodyWrapper,
    ButtonWrapper,
    ConfirmButton,
    CancelButton,
    DeleteButton,
    ButtonGroup,
    WeightButton,
    EmptyText,
    modalTitle,
    modalBody,
    fontBold,
    Description,
} from '../MyPage.style';
import {
    WEIGHT_HISTORY_REQUEST,
    SELECT_REGISTER_WEIGHT_HISTORY_REQUEST,
    SELECT_REGISTER_WEIGHT_HISTORY_RESET,
    UPDATE_WEIGHT_HISTORY_REQUEST,
    UPDATE_WEIGHT_HISTORY_RESET,
    DELETE_WEIGHT_HISTORY_REQUEST,
    DELETE_WEIGHT_HISTORY_RESET,
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
                data: temp,
            }
        ]
    };
    const { selectRegisterWeightHistoryInfoDone,updateWeightHistoryInfoDone, deleteWeightHistoryInfoDone } = useSelector(state => state.mypage);
    const { me } = useSelector(state => state.mypage);
    const [createdAt, setDay] = useState('');
    const [weight, setWeight] = useState('');
    
    const RegisterhandleOpen = () => setRegisterOpen(true);
    const RegisterhandleClose = () => setRegisterOpen(false);
    const [Registereopen, setRegisterOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    
    const DeletehandleOpen = () => setDeleteOpen(true);
    const DeletehandleClose = () => setDeleteOpen(false);
    const [Deleteopen, setDeleteOpen] = useState(false);

    const handleDate = (event) => {
        event.target.value = event.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
            .replace(/(\-{1,2})$/g, '');
            setDay(event.target.value);
    };
    

    //몸무게 히스토리 원하는 날짜 몸무게 등록 요청.
    const handleWeightHistoryRegisterConfirm = () => {
        if(createdAt === '' || weight === '') {
            alert('정보를 모두 입력해주세요.')
        } else {
            dispatch({
                type: SELECT_REGISTER_WEIGHT_HISTORY_REQUEST,
                data: {
                    createdAt: createdAt,
                    weight : weight
                }
            });
        }
    };
    const handleWeightHistoryRegisterConfirmKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleWeightHistoryRegisterConfirm();
        }
    };
    // 몸무게 히스토리 원하는 날짜 몸무게 수정 요청.
    const handleWeightHistoryUpdateConfirm = () => {
        if(createdAt === '' || weight === '') {
            alert('정보를 모두 입력해주세요.')
        } else {
            dispatch({
            type: UPDATE_WEIGHT_HISTORY_REQUEST,
                data: {
                    createdAt: createdAt,
                    weight : weight
                }
            });
        }
    };
    const handleWeightHistoryUpdateConfirmKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleWeightHistoryUpdateConfirm();
        }
    };

    // 몸무게 히스토리 원하는 날짜 몸무게 삭제 요청.
    const handleWeightHistoryDeleteConfirm = () => {
        dispatch({
        type: DELETE_WEIGHT_HISTORY_REQUEST,
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
    const weightList = [];
    if (weightHistoryList.length !== 0) {
        for(let i=0; i<weightHistoryList.length; i++) {
            created_at.push(weightHistoryList[i].created_at);
            weightList.push(weightHistoryList[i].weight);
        }
        for(let i=0; i<weightHistoryList.length; i++) {
            datas.labels.push(created_at[i]);  
            temp.push(weightList[i]);
        }
    }
    
    // history 정보를 등록 할 때
    useEffect(() => {   
        if (selectRegisterWeightHistoryInfoDone) {
            setRegisterOpen(false);
            dispatch({
                type: SELECT_REGISTER_WEIGHT_HISTORY_RESET ,
            });
            dispatch({
                type: WEIGHT_HISTORY_REQUEST,
            });
            dispatch({
                type: MY_PAGE_REQUEST,
            });
        } 
    }, [me, selectRegisterWeightHistoryInfoDone]);

    // history 정보를 수정할 때
    useEffect(() => {   
        if (updateWeightHistoryInfoDone) {
            setOpen(false);
            dispatch({
                type: UPDATE_WEIGHT_HISTORY_RESET ,
            });
            dispatch({
                type: WEIGHT_HISTORY_REQUEST,
            });
            dispatch({
                type: MY_PAGE_REQUEST,
            })
        }
    
    }, [me, updateWeightHistoryInfoDone]);

     // 유저 정보를 받아왓을때
    useEffect(() => {
        dispatch({
            type: WEIGHT_HISTORY_REQUEST,
        });
    }, []);

    // history 정보를 삭제할 때
    useEffect(() => {
        if (deleteWeightHistoryInfoDone) {
            setDeleteOpen(false);
            dispatch({
                type: DELETE_WEIGHT_HISTORY_RESET ,
            });
            dispatch({
                type: WEIGHT_HISTORY_REQUEST,
            });
            dispatch({
                type: MY_PAGE_REQUEST,
            });
        }
    }, [ me, deleteWeightHistoryInfoDone]);

    return (
        <div>
            <Title>체중 기록</Title>
            {
                weightHistoryList.length === 0 && 
                <>
                    <EmptyText>지난 체중 통계를 확인하기위해서는<br/>체중을 등록해주세요.</EmptyText>
                </>
            }
            {
                weightHistoryList.length !==0 &&
                <>
                <Chart type='line' data={datas} style={{ marginTop: '100px'}}/>
                <ButtonGroup>
                    <WeightButton
                        onClick={ RegisterhandleOpen }
                        >등록</WeightButton>
                    <Modal
                        open={ Registereopen }
                        onClose={ RegisterhandleClose }
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={ editBox }>
                            <Typography 
                                id='modal-modal-title'
                                style={modalTitle}>
                                체중 등록
                            </Typography>
                            <hr/>
                            <Typography 
                                id='modal-modal-description' 
                                sx={{ mt: 1 }}
                                style={modalBody}>
                                    등록하려는 날짜와 체중 값을 입력해주세요.<br />                     
                            </Typography>
                            <ModalBodyWrapper 
                                style={modalBody}
                                onKeyPress={ handleWeightHistoryRegisterConfirmKeyPress }>
                                <div style={{ marginBottom : '10px' }}>
                                    <span style={fontBold}>날짜 : </span>
                                    <input
                                        required='true'
                                        style={ weightEditInput }
                                        type='input'
                                        id='createdAt'
                                        onChange={ handleDate }
                                    ></input>
                                    <span> ex. 2022-03-30 (숫자만 입력)</span>
                                </div>
                                <div>
                                    <span style={fontBold}>몸무게 : </span>
                                    <input
                                        required='true'
                                        style={ weightEditInput }
                                        type='number'
                                        id='weight'
                                        onChange={e => {
                                        setWeight(e.target.value);
                                        }} 
                                    ></input>
                                    <span> ex. 55</span>
                                </div>
                            </ModalBodyWrapper>
                            <hr/>
                            <ButtonWrapper>
                                <CancelButton onClick={ RegisterhandleClose }>
                                    닫기
                                </CancelButton>
                                <ConfirmButton onClick={ handleWeightHistoryRegisterConfirm }>
                                    등록
                                </ConfirmButton>
                            </ButtonWrapper>
                        </Box>  
                    </Modal>

                    <WeightButton
                        onClick={ handleOpen }
                    >수정</WeightButton>
                    <Modal
                        open={ open }
                        onClose={ handleClose }
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={ editBox }>
                            <Typography 
                                id='modal-modal-title' 
                                style={modalTitle}>
                                체중 수정
                            </Typography>
                            <hr/>
                            <Typography 
                                style={modalBody}
                                id='modal-modal-description' 
                                sx={{ mt: 1 }}>
                                    수정하려는 체중 기록의 날짜와 체중 값을 입력해주세요.
                            </Typography>
                            <ModalBodyWrapper 
                                style={modalBody}
                                onKeyPress={ handleWeightHistoryUpdateConfirmKeyPress }>
                                <div style={{ marginBottom : '10px' }}> 
                                    <span style={fontBold}>날짜 : </span>
                                    <input
                                        style={ weightEditInput }
                                        type='input'
                                        id='createdAt'
                                        onChange={ handleDate }
                                    ></input>
                                    <span> ex. 2022-03-30 (숫자만 입력)</span>
                                </div>
                                <div>
                                    <span style={fontBold}>몸무게 : </span>
                                    <input
                                        style={ weightEditInput }
                                        type='number'
                                        id='weight'
                                        onChange={e => {
                                        setWeight(e.target.value);
                                        }} 
                                    ></input>
                                    <span> ex. 55</span>
                                </div>
                            </ModalBodyWrapper>
                            <hr/>
                            <ButtonWrapper>
                                <CancelButton onClick={ handleClose }>
                                    닫기
                                </CancelButton>
                                <ConfirmButton onClick={ handleWeightHistoryUpdateConfirm }>
                                    수정
                                </ConfirmButton>
                            </ButtonWrapper>
                        </Box>  
                    </Modal>

                    <DeleteButton
                        onClick={ DeletehandleOpen  }
                    >삭제</DeleteButton>
                    <Modal
                        open={ Deleteopen }
                        onClose={ DeletehandleClose  }
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={ editBox }>
                            <Typography 
                                id='modal-modal-title' 
                                style={modalTitle}>
                                체중 삭제
                            </Typography>
                            <hr/>
                            <Typography id='modal-modal-description' sx={{ mt: 1 }}>
                                삭제하려는 체중 기록의 날짜를 입력해주세요.
                            </Typography>
                            <ModalBodyWrapper 
                                style={modalBody}
                                onKeyPress={ handleWeightHistoryDeleteConfirmKeyPress }>
                                <span style={fontBold}>날짜 : </span>
                                <input
                                    style={ weightEditInput }
                                    type='input'
                                    id='birthday'
                                    onChange={ handleDate }
                                    ></input>
                                <span> ex. 2022-03-30 (숫자만 입력)</span>
                            </ModalBodyWrapper>
                            <hr/>
                            <ButtonWrapper>
                                <CancelButton onClick={ DeletehandleClose }>
                                    닫기
                                </CancelButton>
                                <ConfirmButton onClick={ handleWeightHistoryDeleteConfirm }>
                                    삭제
                                </ConfirmButton>
                            </ButtonWrapper>
                        </Box>  
                    </Modal> 
            </ButtonGroup>
            </>
            }
        </div>
    );
}