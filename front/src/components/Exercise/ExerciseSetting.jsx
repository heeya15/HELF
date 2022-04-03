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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    // "스탠딩 사이드 크런치",
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
    if (e.target.value < 1) {
      alert("세트 수가 너무 적습니다.")
      e.target.value = 0
    } else {
      dispatch(setExerciseSet(e.target.value));
    }
  };

  const timeChange = (e) => {
    if (e.target.value < 1) {      
      alert("세트별 횟수가 너무 적습니다.")
      e.target.value = 0
    } else {
    dispatch(setExerciseTime(e.target.value));
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>  
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
                    <input type="number" placeholder="0" onChange={setChange}></input>
                  </Col>
                </Row>
                <Row style={{ padding: "6% 0" }}>
                  <Col>세트별 횟수(세트별 시간)</Col>
                  <Col>
                    <input type="number" placeholder="0" onChange={timeChange}></input>
                  </Col>
                </Row>
              </Container>
            </TotalStyle>
            <StartButton onClick={exerciseSetting}>START</StartButton>

          </Box>
        </Modal>
      </div>

      
    </>
  );
}
