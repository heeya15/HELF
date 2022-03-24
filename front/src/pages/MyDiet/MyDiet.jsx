import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import styled from "styled-components";
import './MyDiet.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MY_DIET_DIARY_DAILY_INFO_REQUEST } from '../../store/modules/myDietRegister'

export default function MyDiet(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { myDietDiaryList } =  useSelector(state => state.myDietRegister);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>> myDietDiaryList: ", myDietDiaryList);

    const diaryList = [];

    for(let i=0; i<myDietDiaryList.length; i++) {
        diaryList.push({ title: myDietDiaryList[i].meal_time, date: myDietDiaryList[i].diary_date });
    }

    // console.log(">>>>>>>>>>>>>>>>>>> diaryList: ", diaryList);

    // const openModal = (id) => {
    // }
    
    const registerEvent = (info) => {
    //     alert("clicked!", info.dateStr);
    //     console.log(info.dateStr);
        dispatch({
            type: MY_DIET_DIARY_DAILY_INFO_REQUEST,
            data: { date: info.dateStr }, 
        });
        
        history.push(`/dietdiary/${info.dateStr}`);
    }
    
    const selectedEvent = (info) => {
        console.log(info);
        alert('clicked!!', info.event.title);
        console.log(info.event.title);
        console.log(info.event.startStr);
    }

    
    return (
        <div className="MyDiet">
            <div>
                <FullCalendar
                    // className="calendar"
                    headerToolbar={{
                        start: 'today',
                        center: 'title',
                        end: 'prev,next',
                    }}
                    height='80vh'
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView = "dayGridMonth"
                    locale="ko"
                    events={
                        diaryList
                    }    
                    selectable
                    editable
                    dateClick={ registerEvent }
                    eventClick={ selectedEvent }
                />
                <AddBtn>
                    <Fab color="primary" aria-label="add" variant="extended" onClick = {() => {
                        props.history.push('/MyDietRegister')}}>
                    <AddIcon /><Word>일정추가</Word>
                    </Fab>
                </AddBtn>
            </div>
        </div>
    );
    
}

const AddBtn = styled.div`
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 10;
`

const Word = styled.span`
    @media (max-width:425px){
    display: none
    }
`