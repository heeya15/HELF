// import * as tf from '@tensorflow/tfjs';
import * as tmPose from "@teachablemachine/pose";
import React, { useState, useEffect } from "react";
import "./Exercise.css";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { EXERCISE_HISTORY_REGISTER_REQUEST } from "../../store/modules/exerciseHistory";
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";

const style = {
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
};

export default function Exercise() {
  const dispatch = useDispatch();
  const { breakTime } = useParams();
  const { exercise } = useSelector((state) => state.exerciseHistory);
  const now = new Date(); // 현재 날짜 및 시간

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

  const [ URL, setURL ] = useState("");
  const [ currentSet, setCurrentSet ] = useState(1);

  // 모달창 관리 
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ timer, setTimer ] = useState(0);

  let modelURL = URL + "model.json";
  let metadataURL = URL + "metadata.json";
  let model, webcam, ctx, labelContainer, maxPredictions;

  useEffect(() => {
    switch (exercise.type) {
      case 1: // BentOverRow
        // test : 왼 손 들기
        setURL("https://teachablemachine.withgoogle.com/models/tNxgspb7K/");

        // setURL("https://teachablemachine.withgoogle.com/models/eqCo1kx3a/");
        break;
      case 2: // DumbbellCurl
        setURL("https://teachablemachine.withgoogle.com/models/qvMroKavg/");
        break;
      case 3: // FrontRaise
        setURL("https://teachablemachine.withgoogle.com/models/aKluCaORU/");
        break;
      case 4: // Lunge
        setURL("https://teachablemachine.withgoogle.com/models/7zoTQArlc/");
        break;
      case 5: // OverheadPress
        setURL("https://teachablemachine.withgoogle.com/models/QoQ4ty5qS/");
        break;
      case 6: // PushUp
        setURL("https://teachablemachine.withgoogle.com/models/R6Q1RWNar/");
        break;
      case 7: // SideLateralRaise
        setURL("https://teachablemachine.withgoogle.com/models/UuDtip_te/");
        break;
      case 8: // Squat
        setURL("https://teachablemachine.withgoogle.com/models/050JkD2Z0/");
        break;
      // case 9: // StandingSideCrunch
      //   setURL("https://teachablemachine.withgoogle.com/models/S9Mpp7iGf/");
      //   break;
    }
  }, []);

  useEffect(() => {
    modelURL = URL + "model.json";
    metadataURL = URL + "metadata.json";
    console.log(modelURL, metadataURL);
    if (URL !== "") {
      init();
    }
  }, [URL]);

  // squat
  // const URL = "https://teachablemachine.withgoogle.com/models/Pqg6_FBhK/";

  // test : 왼 손 들기
  // const URL = "https://teachablemachine.withgoogle.com/models/tNxgspb7K/";

  // test : 왼 손 어깨 위
  // const URL = "https://teachablemachine.withgoogle.com/models/imAExih7D/";

  // async function setModel() {
  //   switch (exercise.type) {
  //     case 1: //BentOverRow
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/eqCo1kx3a/",
  //       });
  //       break;
  //     case 2: // DumbbellCurl
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/qvMroKavg/",
  //       });
  //       break;
  //     case 3: // FrontRaise
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/aKluCaORU/",
  //       });
  //       break;
  //     case 4: // Lunge
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/7zoTQArlc/",
  //       });
  //       break;
  //     case 5: // OverheadPress
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/QoQ4ty5qS/",
  //       });
  //       break;
  //     case 6: // PushUp
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/R6Q1RWNar/",
  //       });
  //       break;
  //     case 7: // SideLateralRaise
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/UuDtip_te/",
  //       });
  //       break;
  //     case 8: // Squat
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/050JkD2Z0/",
  //       });
  //       break;
  //     case 9: // StandingSideCrunch
  //       this.setState({
  //         URL: "https://teachablemachine.withgoogle.com/models/S9Mpp7iGf/",
  //       });
  //       break;
  //   }
  // };

  async function init() {
    // const modelURL = URL + "model.json";
    // const metadataURL = URL + "metadata.json";
    // console.log(modelURL);
    // console.log(metadataURL);
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    const size = 500;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    console.log(webcam);
    await webcam.play();
    window.requestAnimationFrame(loop);
    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   labelContainer.appendChild(document.createElement("div"));
    // }
  }

  // async function stopVideo() {
  // }

  async function loop(timestamp) {
    // console.log("test")
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }
  var angle = Math.floor((360 / exercise.time) * 10) / 10;
  var progress = 360;
  var status = "wait";
  var countTime = 0;
  var countTotalTime = 0;
  var countSet = 1;
  var soundurl = "";

  const handleExercise = () => {
    console.log(countTotalTime);
    dispatch({
      type: EXERCISE_HISTORY_REGISTER_REQUEST,
      data: {
        count: countTotalTime,
        date: dayjs(now).format("YYYY-MM-DD HH:mm:ss"),
        exerciseNo: exercise.type,
      },
    });
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    if (prediction[0].probability.toFixed(2) > 0.8) {
      if (status == "action") {
        countTime++;
        countTotalTime++;
        soundurl = (countTime % 10) + ".mp3";
        var audio = new Audio(soundurl);
        audio.play().catch((error) => {
          console.log(error);
        });
        console.log(status, countTime, soundurl);
        progress = progress - angle;
        if (progress < 0) {
          progress = 360 - angle;
        }
        $(".progress").css("stroke-dashoffset", progress);
        $("#counter").html(countTime);
        console.log(progress, angle);

        if (countTotalTime == exercise.set * exercise.time) {
          // setTimeout(() => {
          //   alert("운동이 끝났습니다!");w
          // }, 500);
          // alert("운동이 끝났습니다!", 3000)
          handleExercise();
        }

        // 1세트가 끝난 경우
        if (countTime.toString() === exercise.time && countTotalTime < exercise.set * exercise.time) {
          // 세트 수 증가
          countSet++;
          setCurrentSet(countSet);
          
          // 세트 당 카운트 수 reset
          countTime = 0;

          // breaktimer 가동
          if(breakTime>0) {
            var timer = breakTime;
            setTimer(timer);
            setTimeout(() => { webcam.pause() }, 500)   // 화면 정지
            handleOpen(); // 모달창 on

            var timerInterval = setInterval(() => {
              if(timer==0) clearInterval(timerInterval);
              timer--;
              setTimer(timer);
            }, 1000);
            setTimeout(() => { handleClose() }, breakTime*1000)       // 모달 close     
            setTimeout(() => { webcam.play() }, breakTime*1000)          
          }
        }

        
      }
      status = "wait";
    } else if (prediction[1].probability.toFixed(2) > 0.8) {
      status = "action";
    }

    // for (let i = 0; i < maxPredictions; i++) {
    //   const classPrediction =
    //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //   labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  return (
    <div className="myExercise">
      <div className="menuTitle">MY운동</div>
      <Row class="boxWrapper">
        <Col md="2"></Col>
        <Col md="5"
          class="leftBox">
          <div class="leftBox">
            <canvas id="canvas"></canvas>
          </div>
        </Col>
        <Col md="2">
          <div class="exerciseInfo fontBold">
            <div class="exerciseName">{ ExerciseTypeList[exercise.type-1] }</div>
            <div>총 세트 : <span class="fontNormal">{ exercise.set }</span></div>
            <div>세트당 횟수 : <span class="fontNormal">{ exercise.time }</span></div>
          </div>
          <div class="timeInfo">
            <div class="frame">
              <div class="center">
                <div class="headline fontBold">
                  Counter
                </div>
                <div class="currentSet fontNormal">
                  { currentSet } 세트
                </div>
                <div class="circle-big">
                  <div class="text">
                    <span id="counter">0</span>
                    <div class="small">개</div>
                  </div>
                  <svg>
                    <circle class="bg" cx="57" cy="57" r="52" />
                    <circle class="progress" cx="57" cy="57" r="52" />
                  </svg>
                </div>
              </div>
            </div>  
          </div>
        </Col>
      </Row> 
      <div class="buttonWrapper">
        <Button class="exitButton" onClick={ handleExercise }>종료</Button>
      </div>

      {/* <div id="label-container"></div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
            class="fontNormal"
            style={{ marginTop: '20px' }}
            id="modal-modal-title" 
            variant="h6" 
            component="h2">
            쉬는 시간 종료까지
          </Typography> 
          <Typography 
            class="fontBold"
            style={{ fontSize: '70px', marginTop: '30px'}}
            id="modal-modal-description" 
            sx={{ mt: 2 }}>
            { timer } <span class="fontNormal" style={{ fontSize: '20px' }}>초</span>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
