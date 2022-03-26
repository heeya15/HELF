import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";
import "./MyDiet.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MY_DIET_DIARY_LIST_REQUEST,
  MY_DIET_DIARY_DAILY_INFO_REQUEST,
} from "../../store/modules/myDiet";

export default function MyDiet(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { myDietDiaryList } = useSelector((state) => state.myDiet);

  const diaryList = [];
  const diaryInfoList = [];

  console.log(myDietDiaryList);
  for (let i = 0; i < myDietDiaryList.length; i++) {
    var eventColor = "";
    if (myDietDiaryList[i].meal_time === "아침") eventColor = "#c94c4c";
    else if (myDietDiaryList[i].meal_time === "점심") eventColor = "#2B67FF";
    else if (myDietDiaryList[i].meal_time === "저녁") eventColor = "#35C04D";
    else eventColor = "#F2E944";

    diaryList.push({
      id: myDietDiaryList[i].diary_no,
      title: myDietDiaryList[i].meal_time,
      date: myDietDiaryList[i].diary_date.substring(0, 10),
      extendedProps: {
        time: myDietDiaryList[i].diary_date.substring(11, 16),
      },
      color: eventColor,
    });
  }

  const clickDate = (info) => {
    dispatch({
      type: MY_DIET_DIARY_DAILY_INFO_REQUEST,
      data: { date: info.dateStr },
    });

    history.push(`/dietdiary/${info.dateStr}`);
  };

  const selectedEvent = (info) => {
    console.log(info.event.id); // 이벤트 상세보기를 위해서 넘겨줄 diary_no
  };

  useEffect(() => {
    dispatch({
      type: MY_DIET_DIARY_LIST_REQUEST,
    });
  }, []);

  return (
    <div className="MyDiet">
      <div>
        <FullCalendar
          // className="calendar"
          headerToolbar={{
            start: "today",
            center: "title",
            end: "prev,next",
          }}
          height="80vh"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventOrder="time"
          // locale="ko"
          events={diaryList}
          selectable
          // editable
          dayMaxEvents
          dateClick={clickDate}
          eventClick={selectedEvent}
        />
        {/* <AddBtn>
                    <Fab color="primary" aria-label="add" variant="extended" onClick = {() => {
                        props.history.push('/mydietregister')}}>
                    <AddIcon /><Word>일정추가</Word>
                    </Fab>
                </AddBtn> */}
      </div>
    </div>
  );
}

const AddBtn = styled.div`
  position: fixed;
  right: 10px;
  bottom: 100px;
  z-index: 10;
`;

const Word = styled.span`
  @media (max-width: 425px) {
    display: none;
  }
`;
