import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyDiet.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MY_DIET_DIARY_LIST_REQUEST,
  MY_DIET_DIARY_DAILY_INFO_REQUEST,
} from "../../store/modules/myDiet";

export default function MyDiet() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { myDietDiaryList } = useSelector((state) => state.myDiet);

  const diaryList = [];

  // console.log(myDietDiaryList);
  for (let i = 0; i < myDietDiaryList.length; i++) {
    var eventColor = "";
    if (myDietDiaryList[i].meal_time === "아침") eventColor = "#FF7043";
    else if (myDietDiaryList[i].meal_time === "점심") eventColor = "#FFB74D";
    else if (myDietDiaryList[i].meal_time === "저녁") eventColor = "#FFAB91";
    else eventColor = "#D7CCC8";
    // if (myDietDiaryList[i].meal_time === "아침") eventColor = "#c94c4c";
    // else if (myDietDiaryList[i].meal_time === "점심") eventColor = "#2B67FF";
    // else if (myDietDiaryList[i].meal_time === "저녁") eventColor = "#35C04D";
    // else eventColor = "#F2E944";

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
    const date = info.event.startStr;
    const diaryNo = info.event.id;
    history.push(`/mydietdetail/${date}/${diaryNo}`);
    // console.log(info.event.id); // 이벤트 상세보기를 위해서 넘겨줄 diary_no
  };

  useEffect(() => {
    dispatch({
      type: MY_DIET_DIARY_LIST_REQUEST,
    });
  }, []);

  return (
    <div className="MyDiet">
      <div className="MenuTitle">
        <span className="MenuTitleLight">MY 식단</span>
      </div>
      <FullCalendar
        // className="calendar"
        headerToolbar={{
          start: "title",
          end: "today,prev,next",
        }}
        height="100vh"
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
    </div>
  );
}
