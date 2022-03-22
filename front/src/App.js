import logo from "./logo.png";
import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Route, Link } from "react-router-dom";

// 컴포넌트 추가
import NavBar from "./components/NavBar/NavBar";
import SharedBoard from "./components/SharedBoard/SharedBoard";
import Main from "./components/Main/Main";
import SignUp from "./pages/User/SignUp/SignUp";
import MyDietRegister from "./components/MyDiet/MyDietRegister";
// import Placeholder from 'react-bootstrap/Placeholder';

function App() {
  return (
    <div className="App">
      {/* NavBar */}
      <NavBar />
      <Route exact path="/" component={Main} />
      <Route path="/SharedBoard" component={SharedBoard} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/MyDietRegister" component={MyDietRegister} />
    </div>
  );
}

export default App;
