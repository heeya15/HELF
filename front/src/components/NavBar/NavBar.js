import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import './NavBar.css';

// 컴포넌트 import
// import SharedBoard from '../SharedBoard/SharedBoard'

import {
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  SET_MENU,
} from '../../store/modules/member';
import {
  NavbarWrapper,
  CenterMenu,
  NavbarMain,
  LeftMenu,
  RightMenu,
  DrawerListRow,
  NavbarSubBlock,
  SubMenu,
  MenuBlock,
} from './Navbar.style';
import { useSelector, useDispatch } from 'react-redux';

export default function NavBar() {
  const dispatch = useDispatch();
  // const { logInDone, menu } = useSelector(state => state.member);
  // const { me } = useSelector(state => state.mypage); // 0: 비로그인, 4: 스타, 3:사용자, 2: 관계자 ,1:관리자
  // const [open, setOpen] = useState(false);
  // const LogoutButton = () => {
  //   dispatch({ type: LOG_OUT_REQUEST, data: { memberId: me.memberId } });
  // };
  const changeMenu = m => {
    dispatch({ type: SET_MENU, data: m });
  };
  return (
    <div className='navBar'>
      <div>
        <Link to="/"  className='anc'><img className="logo" src={ logo } alt="" /></Link>  
        <Link to="/SharedBoard"  className='anc'>게시판</Link>      
        <Link to="/"  className='anc'>MY식단</Link>        
        <Link to="/"  className='anc'>PT 자세교정</Link>          
      </div>
      <div>
        <Link to="/SignUp"  className='anc'>회원가입</Link>      
        <Link to="/LogIn" className='anc'>로그인</Link>  
        <MenuBlock
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    changeMenu('main');
                    // LogoutButton();
                  }}
                >
                  Logout
       </MenuBlock>
      </div>
    </div>
  );
}



