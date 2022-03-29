import { useLocation } from 'react-router-dom';
import React from "react";
import { Link } from 'react-router-dom';
// import Placeholder from 'react-bootstrap/Placeholder';


const Detail = ({ match }) => {
  const data = match.params.index.substring(0); // location으로 데이터에 접근해서 받아온다!
  
  return (
    <div className="ShareDetail">
    <h1>디테일 페이지 입니다.</h1>
    <h2>번호는 {data}입니다.</h2>
    

  </div>
  )}; 
  export default Detail
