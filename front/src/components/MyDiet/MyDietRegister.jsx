import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { IMAGE_URL } from "../../utils/https";
import {
  setmyDietWeight,
  MY_DIET_IMAGE_REQUEST,
  MY_DIET_REGISTER_REQUEST,
} from "../../store/modules/myDiet";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { Container, Row, Col } from "react-bootstrap";
import {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
} from "./MyDietRegister.style";

export default function MyDietRegister() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { date } = useParams();

  const [dietThumbnail, setDietThumbnail] = useState(
    `${IMAGE_URL}default-image.png`
  );
  const [diaryDate, setDiaryDate] = useState("2022-03-22 00:00:00");
  const [imagePath, setImagePath] = useState(null);
  const [mealTime, setMealTime] = useState("");
  const [description, setDescription] = useState("");

  const { foodName } = useSelector((state) => state.myDiet);
  const mealType = ["아침", "점심", "저녁", "간식"];

  const myDietRegister = {
    imagePath: imagePath,
    diaryDate: diaryDate,
    mealTime: mealTime,
    description: description,
    dietRegisterReqList: foodName,
  };

  const onImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDietThumbnail(URL.createObjectURL(file));
      setImagePath(file);
      dispatch({
        type: MY_DIET_IMAGE_REQUEST,
        data: { imagePath: file },
      });
    }
  };

  const [mealTimeIndex, setMealTimeIndex] = useState(4);
  const onMealTimeHandler = (e) => {
    setMealTimeIndex(e.target.getAttribute("data-index"));
    setMealTime(e.target.value);
  };

  const onDiaryDateHandler = (e) => {
    setDiaryDate(date + dayjs(e).format(" HH:mm:ss"));
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

  const goBack = () => {
    history.push(`/dietdiary/${date}`);
  };

  const { weights } = useSelector((state) => state.myDiet);
  const WeightSelect = weights.map((weight, index) => {
    return (
      <option key={index} value={weight}>
        {weight}g
      </option>
    );
  });

  const onWeightHandler = (e) => {
    const pair = {
      index: e.target.getAttribute("data-index"),
      weight: parseInt(e.target.value),
    };
    dispatch(setmyDietWeight(pair));
  };

  return (
    <div>
      <Container>
        <TotalStyle>
          <Row>
            <Col>
              <ImageThumbnail src={dietThumbnail} alt="이미지"></ImageThumbnail>
              <label htmlFor="input-file">이미지 선택</label>
              <input
                onChange={onImageHandler}
                type="file"
                id="input-file"
                style={{ display: "none" }}
              ></input>
            </Col>
            <Col>
              <RegisterReq>
                <Titles>Food</Titles>
                <div
                  style={{
                    fontSize: "12px",
                    color: "grey",
                  }}
                >
                  음식별 무게를 선택해주세요.
                </div>
                <div>
                  {foodName.map((food, index) => (
                    <div key={index}>
                      {food.foodName}{" "}
                      <select
                        data-index={index}
                        style={{
                          marginTop: "1%",
                          borderRadius: "4px",
                          outline: "0 none",
                          cursor: "pointer",
                        }}
                        onChange={onWeightHandler}
                      >
                        {WeightSelect}
                      </select>
                    </div>
                  ))}
                </div>
                <Titles>Meal Type</Titles>
                <MealTypeButton style={{ display: "flex" }}>
                  {mealType.map((meal, index) => (
                    <button
                      className={mealTimeIndex == index ? "active" : ""}
                      key={index}
                      value={meal}
                      data-index={index}
                      onClick={onMealTimeHandler}
                    >
                      {meal}
                    </button>
                  ))}
                </MealTypeButton>
                <Titles>Meal Time</Titles>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="시간을 선택해주세요"
                    value={myDietRegister.diaryDate}
                    onChange={(newValue) => {
                      onDiaryDateHandler(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Titles>Description</Titles>
                <Description
                  rows="8"
                  onChange={onDescriptionHandler}
                  placeholder="설명을 입력해주세요."
                ></Description>
              </RegisterReq>
            </Col>
          </Row>
        </TotalStyle>
        <RegisterButton onClick={registerMyDietButton}>등록</RegisterButton>
        <BackButton onClick={goBack}>나가기</BackButton>
      </Container>
    </div>
  );
}
