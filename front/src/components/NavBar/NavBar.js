import React from "react";
import { Route, Link } from 'react-router-dom';
import logo from '../../logo.png';

// 컴포넌트 import
import SharedBoard from '../SharedBoard/SharedBoard'





function NavBar() {
  return (
    <div className='navBar'>
      <div>
        <Link to="/"><img  src={ logo } alt="" /></Link>  
        <Link to="/">게시판</Link>      
        <Link to="/">MY식단</Link>        
        <Route path="/about" component={SharedBoard} />
      </div>
      <Link to="/#">PT 자세교정</Link>          
    </div>
    
  );
}

export default NavBar;



