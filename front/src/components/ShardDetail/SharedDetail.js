import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
// import Placeholder from 'react-bootstrap/Placeholder';


const Detail = ({ match }) => {
  const data = match.params.index.substring(0); // location으로 데이터에 접근해서 받아온다!
  const token = sessionStorage.getItem("jwt");
  axios.get(
    `${BASE_URL}shareboard/find/${data}`,
      // `${LOCAL_URL}shareboard/findAll`, 
      {
      headers: {
        Authorization: `Bearer ${ token }`
      }
  }).then((result)=>{ console.log(result.data) }).catch((err) => {console.log('앙댐;')})
  console.log('Person Instance is created, and initialized');
  return (
    <div className="ShareDetail">
      <h1>디테일 페이지 입니다.</h1>
      <h2>번호는 {data}입니다.</h2>
      <h2>번호는 {data}입니다.</h2>
      <h2>번호는 {data}입니다.</h2>
      <h2>번호는 {data}입니다.</h2>
    

    </div>
  )}; 
  export default Detail
