import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMAGE_URL } from "../../utils/https";
import Box from "@mui/material/Box";
import {
  setMyDietDetailImagePath,
  setDietDetailMealTime,
  setDietDetailDiaryDate,
  setDietDetailDescription,
  setDietDetailDietRegisterReqList,
  MY_DIET_DETAIL_REQUEST,
  MY_DIET_UPDATE_REQUEST,
} from "../../store/modules/MyDiet";
import { MY_DIET_IMAGE_REQUEST } from "../../store/modules/myDiet";
import { Row, Col } from "react-bootstrap";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";

export default function MyDietDetail() {
  const dispatch = useDispatch();
  const { diaryNo } = useParams();
  useEffect(() => {
    dispatch({
      type: MY_DIET_DETAIL_REQUEST,
      data: diaryNo,
    });
  }, [dispatch, diaryNo]);

  const { myDietDetail } = useSelector((state) => state.myDiet);
  const myDietUpdate = {
    description: myDietDetail.description,
    diaryDate: dayjs(myDietDetail.diaryDate).format("YYYY-MM-DD HH:mm:ss"),
    dietRegisterReqList: myDietDetail.dietFindResList,
    imagePath: myDietDetail.imagePath,
    mealTime: myDietDetail.mealTime,
    diaryNo: myDietDetail.diaryNo,
    isShared: myDietDetail.isShared,
    saveImagePath: myDietDetail.imagePath,
  };
  const { foodName } = useSelector((state) => state.myDiet);
  const mealType = ["아침", "점심", "저녁", "간식"];

  const [dietDetailThumbnail, setDietDetailThumbnail] = useState(
    `${IMAGE_URL}${myDietDetail.imagePath}`
  );
  const [dietUpdate, setDietUpdate] = useState(false);

  const onImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDietDetailThumbnail(URL.createObjectURL(file));
      dispatch(setMyDietDetailImagePath(file));
      dispatch({
        type: MY_DIET_IMAGE_REQUEST,
        data: { imagePath: file },
      });
      dispatch(setDietDetailDietRegisterReqList(foodName));
    }
  };

  const onMealTimeHandler = (e) => {
    dispatch(setDietDetailMealTime(e.target.value));
  };

  const onDiaryDateHandler = (e) => {
    dispatch(setDietDetailDiaryDate(dayjs(e).format("YYYY-MM-DD HH:mm:ss")));
  };

  const onDescriptionHandler = (e) => {
    dispatch(setDietDetailDescription(e.target.value));
  };

  const dietUpdateStateButton = () => {
    setDietUpdate(true);
  };

  const dietUpdateButton = () => {
    dispatch({
      type: MY_DIET_UPDATE_REQUEST,
      data: myDietUpdate,
    });
    setDietUpdate(false);
  };

  const FoodList = myDietDetail.dietFindResList.map((food, index) => {
    return (
      <div key={index}>
        <p>{food.food_name}</p>
        <p>{food.kcal}</p>
        <p>{food.carbohydrate}</p>
        <p>{food.protein}</p>
        <p>{food.fat}</p>
        <p>{food.weight}</p>
      </div>
    );
  });

  return (
    <div>
      <Box>
        <Row>
          <Col>
            <img src={dietDetailThumbnail} alt="이미지"></img>
            {dietUpdate && (
              <div>
                <label htmlFor="input-file">이미지</label>
                <input
                  onChange={onImageHandler}
                  type="file"
                  id="input-file"
                  style={{ display: "none" }}
                ></input>
              </div>
            )}
          </Col>
          <Col>
            {dietUpdate ? (
              <div>
                <div>
                  {FoodList}
                  {mealType.map((meal, index) => (
                    <button
                      key={index}
                      value={meal}
                      onClick={onMealTimeHandler}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Basic example"
                    value={myDietDetail.diaryDate}
                    onChange={(newValue) => {
                      onDiaryDateHandler(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <textarea
                  onChange={onDescriptionHandler}
                  value={myDietDetail.description}
                ></textarea>
              </div>
            ) : (
              <div>
                <p>{myDietDetail.mealTime}식단</p>
                <p>{myDietDetail.diaryDate}</p>
                {FoodList}
                <p>설명</p>
                <textarea readOnly value={myDietDetail.description}></textarea>
              </div>
            )}
          </Col>
        </Row>
        {dietUpdate ? (
          <button onClick={dietUpdateButton}>등록</button>
        ) : (
          <button onClick={dietUpdateStateButton}>수정</button>
        )}
        <button>나가기</button>
      </Box>
    </div>
  );
}
