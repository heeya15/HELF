// import * as tf from '@tensorflow/tfjs';
import * as tmPose from "@teachablemachine/pose";
import React, { Component, useState, useEffect } from "react";
import "./Exercise.css";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

export default function Exercise() {
  const { exercise } = useSelector((state) => state.exerciseHistory);

  const [URL, setURL] = useState("");

  let modelURL = URL + "model.json";
  let metadataURL = URL + "metadata.json";
  let model, webcam, ctx, labelContainer, maxPredictions;

  useEffect(() => {
    switch (exercise.type) {
      case 1: // BentOverRow
        // test : 왼 손 들기
        // setURL("https://teachablemachine.withgoogle.com/models/tNxgspb7K/");
        
        setURL("https://teachablemachine.withgoogle.com/models/eqCo1kx3a/");
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
      case 9: // StandingSideCrunch
        setURL("https://teachablemachine.withgoogle.com/models/S9Mpp7iGf/");
        break;
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
    const size = 400;
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
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop(timestamp) {
    // console.log("test")
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }
  var angle = Math.floor((360/(exercise.time))*10) / 10;
  var progress = 360;
  var status = "wait";
  var count = 0;
  var soundurl = "";

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    if (prediction[0].probability.toFixed(2) > 0.8) {
      if (status == "action") {
        count++;
        soundurl = (count % 10) + ".mp3";
        var audio = new Audio(soundurl);
        audio.play().catch((error) => {
          console.log(error);
        });
        console.log(status, count, soundurl);
        progress = progress - angle;
        if (progress < 0) {
          progress = 360 - angle;
        }
        $(".progress").css("stroke-dashoffset", progress);
        $("#counter").html(count);
        console.log(progress, angle)
      }
      status = "wait";
    } else if (prediction[1].probability.toFixed(2) > 0.8) {
      status = "action";
    }

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

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
    <div>
      <h2>컴포넌트 입니다</h2>
      <div class="frame">
        <div class="center">
          <div class="headline">
            {/* <div class="small">Test</div> */}
            Counter
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
      <h1>인공지능(AI) Fitness Trainer</h1>
      {/* <button class="btn btn-primary" type="button" onclick={init()}>
        Start
      </button> */}
      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div id="label-container"></div>
    </div>
  );
}
