import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  setFoodCheckBox,
  setmyDietWeight,
  setMyDietDetailImagePath,
  setDietDetailMealTime,
  setDietDetailDiaryDate,
  setDietDetailDescription,
  setDietDetailDietRegisterReqList,
  setDietDetailThumbnail,
  setFoodName,
  MY_DIET_DETAIL_REQUEST,
  MY_DIET_UPDATE_REQUEST,
  FOOD_LIST_REQUEST,
} from "../../store/modules/myDiet";
import { MY_DIET_IMAGE_REQUEST } from "../../store/modules/myDiet";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  Titles,
  Description,
  ImageThumbnail,
  FoodCheckButton,
  foodcheckBox,
} from "./MyDietRegister.style";
import {
  DetailReq,
  UpdateButton,
  BackButton,
  MealTimeDetail,
  FoodTableTitle,
} from "./MyDietDetail.style";
import { ButtonWrapper, ConfirmButton, CancelButton } from "./MyDiet.style";

export default function MyDietDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { date, diaryNo } = useParams();
  useEffect(() => {
    dispatch({
      type: MY_DIET_DETAIL_REQUEST,
      data: diaryNo,
    });
    dispatch({ type: FOOD_LIST_REQUEST });
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
  const { foodName, foods } = useSelector((state) => state.myDiet);
  const mealType = ["아침", "점심", "저녁", "간식"];

  const { dietDetailThumbnail } = useSelector((state) => state.myDiet);

  const [dietUpdate, setDietUpdate] = useState(false);

  const onImageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      dispatch(setDietDetailThumbnail(URL.createObjectURL(file)));
      dispatch(setMyDietDetailImagePath(file));
      dispatch({
        type: MY_DIET_IMAGE_REQUEST,
        data: { imagePath: file },
      });
      // dispatch(setDietDetailDietRegisterReqList(foodName));
    }
  };

  const [mealTimeIndex, setMealTimeIndex] = useState(4);
  const onMealTimeHandler = (e) => {
    setMealTimeIndex(e.target.getAttribute("data-index"));
    dispatch(setDietDetailMealTime(e.target.value));
  };

  const onDiaryDateHandler = (e) => {
    dispatch(setDietDetailDiaryDate(dayjs(e).format("YYYY-MM-DD HH:mm:ss")));
  };

  const onDescriptionHandler = (e) => {
    dispatch(setDietDetailDescription(e.target.value));
  };

  const dietUpdateStateButton = () => {
    dispatch(setFoodName(myDietDetail.dietFindResList));
    setDietUpdate(true);
  };

  const dietUpdateButton = () => {
    if (myDietUpdate.diaryDate === "") alert("시간을 등록해주세요.");
    else if (myDietUpdate.mealTime === "") alert("시간대를 선택해주세요.");
    else if (myDietUpdate.description === "") alert("설명을 입력해주세요.");
    else if (myDietUpdate.dietRegisterReqList.length === 0)
      alert("이미지를 변경하거나 직접선택을 통해 음식을 선택해주세요.");
    else {
      dispatch({
        type: MY_DIET_UPDATE_REQUEST,
        data: myDietUpdate,
      });
      setDietUpdate(false);
    }
  };

  const goBack = () => {
    history.push(`/dietdiary/${date}`);
  };

  const FoodList = myDietDetail.dietFindResList.map((food, index) => {
    return (
      <div key={index}>
        <FoodTableTitle>
          {food.foodName} {food.weight}g
        </FoodTableTitle>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  칼로리
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  탄수화물
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  단백질
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  style={{ width: "25%" }}
                  align="center"
                >
                  지방
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.kcal &&
                    Math.round((food.weight / 100) * food.kcal * 100) / 100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.carbohydrate &&
                    Math.round((food.weight / 100) * food.carbohydrate * 100) /
                      100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.protein &&
                    Math.round((food.weight / 100) * food.protein * 100) / 100}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {food.fat &&
                    Math.round((food.weight / 100) * food.fat * 100) / 100}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  });

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
      weight: e.target.value,
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

  useEffect(() => {
    dispatch(setDietDetailDietRegisterReqList(foodName));
    setCheckedInputs([]);
    const temp = [];
    foodName.forEach((food) => {
      temp.push(food.foodName);
    });
    setCheckedInputs(temp);
  }, [foodName]);

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
        label={food}
      ></FormControlLabel>
    );
  });

  const foodCheckDone = () => {
    dispatch(setFoodCheckBox(checkedInputs));
    handleClose();
  };

  return (
    <div>
      <Container>
        <TotalStyle>
          <Row>
            <Col>
              <ImageThumbnail
                src={dietDetailThumbnail}
                alt="이미지"
              ></ImageThumbnail>
              {dietUpdate && (
                <div>
                  <label className="imageSelect" htmlFor="input-file">
                    이미지 선택
                  </label>
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
                <RegisterReq>
                  <Titles>Food</Titles>
                  <FoodCheckButton onClick={handleOpen}>
                    직접선택
                  </FoodCheckButton>
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
                      >
                        음식 선택
                      </Typography>
                      <hr />
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        해당하는 음식 종류를 선택해주세요.
                      </Typography>
                      <FormGroup>{FoodCheckBox}</FormGroup>
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
                            overBackgroundColor: "black",
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
                      value={myDietDetail.diaryDate}
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
                    value={myDietDetail.description}
                  ></Description>
                </RegisterReq>
              ) : (
                <DetailReq>
                  <MealTimeDetail>{myDietDetail.mealTime}식단</MealTimeDetail>
                  <p>{myDietDetail.diaryDate.substr(0, 16)}</p>
                  <Titles>Food</Titles>
                  {myDietDetail.dietFindResList.length != 0 && FoodList}
                  <Titles>Description</Titles>
                  <Description
                    rows="8"
                    readOnly
                    value={myDietDetail.description}
                  ></Description>
                </DetailReq>
              )}
            </Col>
          </Row>
        </TotalStyle>
        {dietUpdate ? (
          <RegisterButton onClick={dietUpdateButton}>등록</RegisterButton>
        ) : (
          <UpdateButton onClick={dietUpdateStateButton}>수정</UpdateButton>
        )}
        <BackButton onClick={goBack}>나가기</BackButton>
      </Container>
    </div>
  );
}
