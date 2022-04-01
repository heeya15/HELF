import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import "./NavBar.css";

// 컴포넌트 import import SharedBoard from '../SharedBoard/SharedBoard'

import {
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  SET_MENU,
} from "../../store/modules/user";
import { useSelector, useDispatch } from "react-redux";
import { MY_PAGE_REQUEST } from "../../store/modules/myPage";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { useHistory } from "react-router-dom";

export default function NavBar2() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logInDone, kakaologInDone } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.mypage);

  useEffect(() => {
    // 만약 토큰이 남아 있다면 or 새로고침 되었을 때 동작하도록 해야함
    if (!logInDone && sessionStorage.length > 0) {
      dispatch({
        type: MY_PAGE_REQUEST,
      });
      dispatch({ type: LOG_IN_SUCCESS });
    }
  }, [dispatch, logInDone]);

  const LogoutButton = () => {
    dispatch({ type: LOG_OUT_REQUEST, data: { memberId: me.memberId } });
  };
  const changeMenu = (m) => {
    dispatch({ type: SET_MENU, data: m });
  };

  const handleShareBoard = () => {
    history.push("/sharedboard");
  };

  const handleMyDiet = () => {
    history.push("/mydiet");
  };

  const handleMyExercise = () => {
    history.push("/exercisesetting");
  };

  const handleSignUp = () => {
    history.push("/signup");
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleMyPage = () => {
    history.push("/mypage");
  };

  return (
    <Navbar
      collapseOnSelect="collapseOnSelect"
      expand="lg"
      className="navBar"
      variant="dark"
    >
      <Container>
        <Link to="/">
          <img className="logo" src={logo} alt="logo image" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleShareBoard} className="anc">
              게시판
            </Nav.Link>
            <Nav.Link onClick={handleMyDiet} className="anc">
              MY식단
            </Nav.Link>
            <Nav.Link onClick={handleMyExercise} className="anc">
              MY운동
            </Nav.Link>
          </Nav>
          <Nav>
            {logInDone === false && kakaologInDone === false && (
              <Nav.Link onClick={handleSignUp} className="anc">
                <span>회원가입</span>
              </Nav.Link>
            )}
            {logInDone === false && kakaologInDone === false && (
              <Nav.Link onClick={handleLogIn} className="anc">
                로그인
              </Nav.Link>
            )}
            {(logInDone === true || kakaologInDone === true) && (
              <Nav.Link onClick={handleMyPage} className="anc">
                {" "}
                MY페이지{" "}
              </Nav.Link>
            )}
            {(logInDone === true || kakaologInDone === true) && (
              <Nav.Link
                className="anc"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeMenu("main");
                  LogoutButton();
                }}
              >
                로그아웃
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
