import React, { Component , useState, useEffect  } from "react";
import axios from 'axios';
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";
import { div } from "@tensorflow/tfjs";

// match 로 현재 게시물 주소에 대한 정보를 props 로 받아온다
function Detail({ match }) {
  const index = match.params.index.substring(0);
  console.log(index)
  const token = sessionStorage.getItem("jwt");

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}shareboard/find/${index}`,
        // `${LOCAL_URL}shareboard/findAll`, 
        {
        headers: {
          Authorization: `Bearer ${ token }`
        }})
            .then(response => {
              // 나중에 response.data 로 data 가져오기 가능
                setUsers(response.status ); 
                console.log(response)
            });
    }, []);
  return (
      <div>{users}</div>
  )}; 
  export default Detail
