import React from "react";
import { Route, Link } from 'react-router-dom';
import logo from '../../logo.png';
import './NavBar.css';

// 컴포넌트 import
import SharedBoard from '../SharedBoard/SharedBoard'





function NavBar() {
  return (
    <div className='navBar'>
      <div>
        <Link to="/"  className='anc'><img className="logo" src={ logo } alt="" /></Link>  
        <Link to="/"  className='anc'>게시판</Link>      
        <Link to="/"  className='anc'>MY식단</Link>        
        <Route path="/about" component={SharedBoard} />
        <Link to="/"  className='anc'>PT 자세교정</Link>          
      </div>
      <div>
        <Link to="/"  className='anc'>회원가입</Link>      
        <Link to="/"  className='anc'>로그인</Link>   
      </div>
    </div>
    
  );
}

export default NavBar;



