import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../utils/https";
import {
  MY_DIET_IMAGE_REQUEST,
  MY_DIET_REGISTER_REQUEST,
} from "../../store/modules/myDietRegister";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

export default function MyDietRegister() {
  const dispatch = useDispatch();

  const [dietThumbnail, setDietThumbnail] = useState(
    `${IMAGE_URL}default-image.png`
  );
  const [diaryDate, setDiaryDate] = useState("2022-03-22 00:00:00");
  const [imagePath, setImagePath] = useState(null);
  const [mealTime, setMealTime] = useState("");
  const [description, setDescription] = useState("");

  const { foodName } = useSelector((state) => state.myDietRegister);
  const mealType = ["아침", "점심", "저녁", "간식"];

  const myDietRegister = {
    imagePath: imagePath,
    diaryDate: diaryDate,
    mealTime: mealTime,
    description: description,
    dietRegisterReqList: [],
  };

  const onImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDietThumbnail(URL.createObjectURL(file));
      setImagePath(file);
      console.log(myDietRegister);
      // dispatch({
      //   type: MY_DIET_IMAGE_REQUEST,
      //   data: { imagePath: file },
      // });
    }
  };

  const onMealTimeHandler = (e) => {
    setMealTime(e.target.value);
  };

  const onDiaryDateHandler = (e) => {
    setDiaryDate(dayjs(e).format("YYYY-MM-DD HH:mm:ss"));
  };

  const onDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const registerMyDietButton = () => {
    if (myDietRegister.imagePath === "") alert("이미지를 등록해주세요.");
    else if (myDietRegister.diaryDate === "") alert("시간을 등록해주세요.");
    else if (myDietRegister.mealTime === "") alert("시간대를 선택해주세요.");
    else if (myDietRegister.description === "") alert("설명을 입력해주세요.");
    else {
      dispatch({
        type: MY_DIET_REGISTER_REQUEST,
        data: myDietRegister,
      });
    }
  };

  return (
    <div>
      <img src={dietThumbnail} alt="이미지"></img>
      <label htmlFor="input-file">이미지</label>
      <input
        onChange={onImageHandler}
        type="file"
        id="input-file"
        style={{ display: "none" }}
      ></input>
      <div>
        {mealType.map((meal, index) => (
          <button key={index} value={meal} onClick={onMealTimeHandler}>
            {meal}
          </button>
        ))}
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Basic example"
          value={myDietRegister.diaryDate}
          onChange={(newValue) => {
            onDiaryDateHandler(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <textarea onChange={onDescriptionHandler}></textarea>
      <button onClick={registerMyDietButton}>등록</button>
    </div>
  );
}
