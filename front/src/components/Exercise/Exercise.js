import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import React, { Component }  from 'react';

export default function Exercise() {
  // squat
  // const URL = "https://teachablemachine.withgoogle.com/models/Pqg6_FBhK/"; 
  
  // test : 왼 손 들기
  const URL = "https://teachablemachine.withgoogle.com/models/tNxgspb7K/"; 

  // test : 왼 손 어깨 위
  // const URL = "https://teachablemachine.withgoogle.com/models/imAExih7D/";
  let model, webcam, ctx, labelContainer, maxPredictions;
  
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    console.log(webcam)
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop(timestamp) {
    // console.log("test")
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  var status = "wait"
  var count = 0
  var soundurl = ''

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    
    if (prediction[0].probability.toFixed(2) > 0.80) {
      if (status == "action") {
        count ++
        soundurl = count%10 + '.mp3' 
        var audio = new Audio(soundurl)
        audio.play().catch(error => {
          console.log(error)
        });
        console.log(status, count, soundurl)
      }
      status = "wait"
    } else if (prediction[1].probability.toFixed(2) > 0.80) {
      status = "action"
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
      <div>Teachable Machine Pose Model</div>
      <button type="button" onClick={init}>Start</button>
      <div><canvas id="canvas"></canvas></div>
      <div id="label-container"></div>
    </div>
  ); 
}
