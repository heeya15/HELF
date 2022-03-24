import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from "styled-components";
// import styled from "styled-components";
import './MyDiet.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { MY_DIET_DIARY_LIST_REQUEST, DIARY_DATE_SAVE } from '../../store/modules/myDietRegister'



export default function MyDietDaily() {
    const date = useParams().date;
    const { myDietDiaryDailyInfo } = useSelector(state => state.myDietRegister);
    console.log(">>>>>>>>>>>>> daily dietdiaryinfo: ", myDietDiaryDailyInfo);

    const history = useHistory();
    const goBack = () => {
        history.push('/mydiet');
    }
    return (
        <>
            <h1>{ date }</h1>
            <Button
                onClick={() => {
                    goBack();
                }}>
                back
            </Button>
            {/* <div className="diaryList">
                <Box
                    component="span"
                    sx={{
                    display: 'block',
                    p: 1,
                    m: 1,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    border: '1px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    }}
                >
                    block
                </Box>
            </div> */}
            <div>
                {
                    myDietDiaryDailyInfo.map(info => (
                        <div>
                            {info.mealTime}
                            {info.description}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

const DiaryList = styled.div`
    @media (max-width:425px){
        width: 80%;
        textAlign: 'center'
    }
`