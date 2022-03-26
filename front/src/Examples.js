import logo from './logo.png';
import './App.css';
import Button from 'react-bootstrap/Button';



function App() {
  return (
    <div className="App">
      <div className='mainPage'>
      <div className='navBar'>
        <div>
        <a href="/#">logo</a>          
        <a href="/#">게시판</a>          
        <a href="/#">MY식단</a>          
        </div>
        <a href="/#">PT 자세교정</a>          
      </div>

      <div className='mainIMG'>
        <img src={ logo } alt="" />  
      </div>
      
      <div className='welcome'>
       <img  src={ logo } alt="" /> 
       <div className='welcomeStart'>
          <h1>우리사이트에 오신것을 환영합니다.</h1> 
          <Button>빠른 시작</Button> 
        </div> 
       <img  src={ logo } alt="" /> 
      </div>

      <hr />

      </div>
    </div>
  );
}

export default App;
