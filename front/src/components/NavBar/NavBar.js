import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
// 컴포넌트 import import SharedBoard from '../SharedBoard/SharedBoard'

import {
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  SET_MENU,
} from "../../store/modules/user";
import {
  SiteLogo,
  NavigationBar,
  NavMenu,
} from './NavBar.style';
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
    <NavigationBar
      collapseOnSelect="collapseOnSelect"
      variant="dark"
    >
      <Container fluid>
        <Link to="/">
          <SiteLogo src={logo} alt="logo image" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {(logInDone || kakaologInDone) && (
            <>
            <NavMenu onClick={handleMyDiet} >
              MY식단
            </NavMenu>
            <NavMenu onClick={handleMyExercise} >
              MY운동
            </NavMenu>
            <NavMenu onClick={handleShareBoard} >
              게시판
            </NavMenu>
            </>
          )}
          </Nav>
          <Nav>
            {logInDone === false && kakaologInDone === false && (
              <NavMenu onClick={handleSignUp} >
                <span>회원가입</span>
              </NavMenu>
            )}
            {logInDone === false && kakaologInDone === false && (
              <NavMenu onClick={handleLogIn} >
                로그인
              </NavMenu>
            )}
            {(logInDone === true || kakaologInDone === true) && (
              <NavMenu onClick={handleMyPage} >
                {" "}
                MY페이지{" "}
              </NavMenu>
            )}
            {(logInDone === true || kakaologInDone === true) && (
              <NavMenu
                
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeMenu("main");
                  LogoutButton();
                }}
              >
                로그아웃
              </NavMenu>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </NavigationBar>
  );
}
