import "./App.css";
import React from "react";
import { Route } from "react-router-dom";

// 컴포넌트 추가
import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
import SharedBoard from "./components/SharedBoard/SharedBoard";
import ShareDetail from "./components/ShardDetail/SharedDetail";
import Main from "./pages/Main/Main";
import SignUp from "./pages/User/SignUp/SignUp";
import LogIn from "./pages/User/LogIn/LogIn";
import MyPage from "./pages/MyPage/MyPage";
import MyDietRegister from "./components/MyDiet/MyDietRegister";
import MyDiet from "./pages/MyDiet/MyDiet";
import Exercise from "./pages/Exercise/Exercise";
import FindPassword from "./components/User/FindPassword/FindPassword";
import MyDietDaily from "./components/MyDiet/MyDietDaily";
import MyDietDetail from "./components/MyDiet/MyDietDetail";
import Nutrition from "./components/MyPage/Statistics/Nutrition";
import withRoot from "./withRoot";
import ExerciseHistory from "./components/MyPage/Statistics/ExerciseHistory";
import AdditionalUserInfo from "./pages/User/LogIn/AdditionalUserInfo";
import ExerciseSetting from "./components/Exercise/ExerciseSetting";

// import Placeholder from 'react-bootstrap/Placeholder';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Main} />
      <Route path="/sharedboard" component={SharedBoard} />
      <Route path="/signup" component={SignUp} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/mydietregister/:date" component={MyDietRegister} />
      <Route path="/login" component={LogIn} />
      <Route path="/mydiet" component={MyDiet} />
      <Route path="/find/password" component={FindPassword} />
      <Route path="/exercise/:breakTime" component={Exercise} />
      <Route path="/dietdiary/:date" component={MyDietDaily} />
      <Route path="/mydietdetail/:date/:diaryNo" component={MyDietDetail} />
      <Route path="/nutrition" component={Nutrition} />
      <Route exact path="/sharedetail/:index" component={ShareDetail} />
      <Route path="/exercisehistory" component={ExerciseHistory} />
      <Route path="/additionalUserInfo" component={AdditionalUserInfo} />
      <Route
        path="/privacy-policy"
        component={() => {
          window.location.replace("https://example.com/1234");
          return null;
        }}
      />
      <Route path="/exercisesetting" component={ExerciseSetting} />
    </div>
  );
}

// export default App;
export default withRoot(App);
