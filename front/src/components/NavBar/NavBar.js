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
} from '../../store/modules/user';
import {
  DrawerListRow,
} from './Navbar.style';
import { useSelector, useDispatch } from 'react-redux';
import { MY_PAGE_REQUEST } from '../../store/modules/myPage';
export default function NavBar() {
  const dispatch = useDispatch();
  const { logInDone, kakaologInDone } = useSelector(state => state.user);
  const { me } = useSelector(state => state.mypage);

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
  const changeMenu = m => {
    dispatch({ type: SET_MENU, data: m });
  };
  return (
    <div className='navBar'>
      <div>
        <Link to="/"  className='anc'><img className="logo" src={ logo } alt="" /></Link>  
        <Link to="/sharedboard"  className='anc'>게시판</Link>      
        <Link to="/mydiet"  className='anc'>MY식단</Link>        
        <Link to="/exercise"  className='anc'>PT 자세교정</Link>          
      </div>
      <div>
      {(logInDone ===false && kakaologInDone === false) &&
        <Link to="/signup"  className='anc'>회원가입</Link>      
        }
      {(logInDone ===false && kakaologInDone === false) &&
        <Link to="/login" className='anc'>로그인</Link>  
      }
      {(logInDone ===true || kakaologInDone === true) &&
        <Link to="/mypage" className="anc"> mypage </Link>
        }
      {(logInDone === true || kakaologInDone === true) &&
          <DrawerListRow
            style={{ cursor: 'pointer' }}
            onClick={() => {
              changeMenu('main');
              LogoutButton();
            }}
          >
            Logout
          </DrawerListRow>
        }
      </div>
    </div>
  );
}



