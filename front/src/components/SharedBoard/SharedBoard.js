import React, { Component } from "react";
import axios from 'axios';

class SharedBoard extends Component {
	constructor(props) {
      super(props);
      const token = sessionStorage.getItem("jwt");
      axios.get("https://j6e102.p.ssafy.io:8080/api/shareboard/findAll", {
            headers: {
              Authorization: `Bearer ${ token }`
            }
        }).then((result)=>{ console.log(result.data) }).catch((err) => {console.log('앙댐;')})
      console.log('Person Instance is created, and initialized');
    }
  
  	render() {
      return (
        <div>SharedBoard 입니다.
    </div>
  );
      ;
    }
} export default SharedBoard
