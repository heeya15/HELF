import React, { Component , useState, useEffect  } from "react";
import axios from 'axios';
import { BASE_URL } from "../../utils/https";
import { IMAGE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
import { div } from "@tensorflow/tfjs";

// match 로 현재 게시물 주소에 대한 정보를 props 로 받아온다
function Detail({ match }) {
  const index = match.params.index.substring(0);
  const token = sessionStorage.getItem("jwt");

    const [allData, setAlldata] = useState([]);
    // const [carbohydrate, setCarbohydrate] = useState([]);
    // const [description, setDescription] = useState([]);
    // const [fat, setFat] = useState([]);
    // const [food_name, setFood_name] = useState([]);
    // const [image_path, setImage_path] = useState([]);
    // const [kcal, setkcal] = useState([]);
    // const [protein, setProtein] = useState([]);
    // const [weight, setWeight] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}shareboard/find/${index}`,
        // `${LOCAL_URL}shareboard/findAll`, 
        {
        headers: {
          Authorization: `Bearer ${ token }`
        }})
            .then(response => {
              // 나중에 response.data 로 data 가져오기 가능
              setAlldata(response.data[0]); 
              // setCarbohydrate(response.data[0].carbohydrate); 
              // setDescription(response.data[0].description); 
              // setFat(response.data[0].fat); 
              // setFood_name(response.data[0].food_name); 
              // setImage_path(response.data[0].image_path); 
              // setkcal(response.data[0].kcal); 
              // setProtein(response.data[0].protein); 
              // setWeight(response.data[0].weight); 
                console.log(response)
            });
    }, []);
  return (
      <div>
        <h3>모든 데이터
        {allData.fat}
        </h3>
        <h3>탄수화물 : {allData.carbohydrate}</h3>
        <h3>지방 : {allData.fat}</h3>
        <h3>단백질 : {allData.protein}</h3>
        <h3>한마디 : {allData.description}</h3>
        <h3>음식이름 : {allData.food_name}</h3>
        <h3>이미지 경로 : {allData.image_path}</h3>
        <h3>칼로리 : {allData.kcal}</h3>
        <h3>무게 : {allData.weight}</h3>
        <img src={`${IMAGE_URL}${allData.image_path}`} alt="" />
        
      </div>

  )}; 
  export default Detail
