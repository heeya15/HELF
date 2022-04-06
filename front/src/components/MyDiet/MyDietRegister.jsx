import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { IMAGE_URL } from "../../utils/https";
import {
  setFoodCheckBox,
  setmyDietWeight,
  MY_DIET_IMAGE_REQUEST,
  MY_DIET_REGISTER_REQUEST,
  FOOD_LIST_REQUEST,
  setFoodName,
} from "../../store/modules/myDiet";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  MenuTitle,
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
  FoodCheckButton,
  foodcheckBox,
  StyledFormGroup,
} from "./MyDietRegister.style";
import { ButtonWrapper, ConfirmButton, CancelButton } from "./MyDiet.style";

export default function MyDietRegister() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { date } = useParams();

  const [dietThumbnail, setDietThumbnail] = useState(
    `${IMAGE_URL}default-image.png`
  );
  const [diaryDate, setDiaryDate] = useState(date + " 00:00:00");
  const [imagePath, setImagePath] = useState(null);
  const [mealTime, setMealTime] = useState("");
  const [description, setDescription] = useState("");

  const { foodName, foods } = useSelector((state) => state.myDiet);
  const mealType = ["아침", "점심", "저녁", "간식"];

  const myDietRegister = {
    imagePath: imagePath,
    diaryDate: diaryDate,
    mealTime: mealTime,
    description: description,
    dietRegisterReqList: foodName,
  };

  useEffect(() => {
    dispatch({ type: FOOD_LIST_REQUEST });
    dispatch(setFoodName([]));
  }, [dispatch]);

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
    else if (myDietRegister.dietRegisterReqList.length === 0)
      alert("이미지를 변경하거나 직접선택을 통해 음식을 선택해주세요.");
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [checkedInputs, setCheckedInputs] = useState([]);
  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const FoodCheckBox = foods.map((food, index) => {
    return (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            id={food}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, food);
            }}
            checked={checkedInputs.includes(food) ? true : false}
          />
        }
        label={
          <p style={{ fontFamily: "KOTRA_GOTHIC", paddingTop: "15px" }}>
            {" "}
            {food}
          </p>
        }
      ></FormControlLabel>
    );
  });

  const foodCheckDone = () => {
    dispatch(setFoodCheckBox(checkedInputs));
    handleClose();
  };

  useEffect(() => {
    setCheckedInputs([]);
    const temp = [];
    foodName.forEach((food) => {
      temp.push(food.foodName);
    });
    setCheckedInputs(temp);
  }, [foodName]);

  return (
    <div>
      <Container>
        <MenuTitle>MY식단 등록</MenuTitle>
        <TotalStyle style={{ marginTop: "2%" }}>
          <Row>
            <Col>
              <ImageThumbnail src={dietThumbnail} alt="이미지"></ImageThumbnail>
              <label className="imageSelect" htmlFor="input-file">
                이미지 선택
              </label>
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
                <FoodCheckButton onClick={handleOpen}>직접선택</FoodCheckButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={foodcheckBox}>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                      style={{ fontFamily: "KOTRA_BOLD-Bold" }}
                    >
                      음식 선택
                    </Typography>
                    <hr />
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      style={{ fontFamily: "KOTRA_BOLD-Bold" }}
                    >
                      해당하는 음식 종류를 선택해주세요.
                    </Typography>
                    <StyledFormGroup
                      style={{
                        overflowX: "hidden",
                        overflowY: "auto",
                        flexWrap: "nowrap",
                      }}
                    >
                      {FoodCheckBox}
                    </StyledFormGroup>
                    <ButtonWrapper>
                      <ConfirmButton onClick={foodCheckDone}>
                        완료
                      </ConfirmButton>
                      <CancelButton onClick={handleClose}>닫기</CancelButton>
                    </ButtonWrapper>
                  </Box>
                </Modal>
                <div
                  style={{
                    fontSize: "15px",
                    color: "grey",
                    fontFamily: "KOTRA_GOTHIC",
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
                      className={
                        parseInt(mealTimeIndex) === index ? "active" : ""
                      }
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
