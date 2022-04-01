import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { TotalStyle, StartButton } from "./ExerciseSetting.style";
import {
  setExerciseType,
  setExerciseSet,
  setExerciseTime,
} from "../../store/modules/exerciseHistory";
import { ConstructionOutlined } from "@mui/icons-material";

export default function ExerciseSetting() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ExerciseTypeList = [
    "벤트 오버 로우",
    "덤벨컬",
    "프론트 레이즈",
    "런지",
    "오버 헤드 프레스",
    "푸시업",
    "사이드 레터럴 레이즈",
    "스쿼트",
    "스탠딩 사이드 크런치",
  ];
  const { exercise } = useSelector((state) => state.exerciseHistory);

  const TypeSelect = ExerciseTypeList.map((type, index) => {
    return (
      <option key={index} data-index={index}>
        {type}
      </option>
    );
  });

  const exerciseSetting = (e) => {
    if (exercise.set === 0) {
      alert("목표 세트를 정해주세요.");
    } else if (exercise.time === 0) {
      alert("세트별 횟수를 정해주세요.");
    } else {
      history.push(`exercise`);
    }
  };

  const typeChange = (e) => {
    dispatch(setExerciseType(e.target.selectedIndex + 1));
  };

  const setChange = (e) => {
    dispatch(setExerciseSet(e.target.value));
  };

  const timeChange = (e) => {
    dispatch(setExerciseTime(e.target.value));
  };

  return (
    <>
      <TotalStyle>
        <Container>
          <Row style={{ padding: "6% 0" }}>
            <Col>운동</Col>
            <Col>
              <select onChange={typeChange}>{TypeSelect}</select>
            </Col>
          </Row>
          <Row style={{ padding: "1% 0" }}>
            <Col>목표 세트</Col>
            <Col>
              <input type="number" onChange={setChange}></input>
            </Col>
          </Row>
          <Row style={{ padding: "6% 0" }}>
            <Col>세트별 횟수(세트별 시간)</Col>
            <Col>
              <input type="number" onChange={timeChange}></input>
            </Col>
          </Row>
        </Container>
      </TotalStyle>
      <StartButton onClick={exerciseSetting}>START</StartButton>
    </>
  );
}
