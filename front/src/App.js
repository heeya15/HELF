import logo from './logo.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';



function App() {
  return (
    <div className="App">
      <div className='mainPage'>
      {/* NavBar */}
      <div className='navBar'>
        <div>
        <a href="/#"><img  src={ logo } alt="" /></a>          
        <a href="/#">게시판</a>          
        <a href="/#">MY식단</a>          
        </div>
        <a href="/#">PT 자세교정</a>          
      </div>

      {/*  메인페이지 상단 이미지 */}
      <div className='mainIMG'>
        <img src={ logo } alt="" />  
      </div>
      

      {/*  메인페이지 상단 1 */}
      <div className='welcome'>
       <img  src={ logo } alt="" /> 
       <div className='welcomeStart'>
          <h1>우리사이트에 오신것을 환영합니다.</h1> 
          <Button variant="success">빠른 시작</Button> 
        </div> 
       <img  src={ logo } alt="" /> 
      </div>
      
      <hr/>
      <div className='container'>
        {/* 메인페이지 상단 2 */}
        <div className='welcome2'>
          <h1>우리사이트에 오신것을 환영합니다.</h1> 
          <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>     
        </div>

        <hr />
    
        {/* 메인페이지 상단 3 */}
        <div className='welcome2'>
          <h1>이런 효과를 기대합니다.</h1> 
          <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>     
        </div>
        <hr />

        </div>
      </div>
    </div>
  );
}

export default App;
