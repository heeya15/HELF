import kakaoimage from '../../../img/kakao_login_medium_narrow.png';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route,Link } from 'react-router-dom';
import { Layout, Wrapper } from '../../../style/variables';
import { LOG_IN_REQUEST, KAKAO_LOG_IN_REQUEST} from '../../../store/modules/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  LoginBlock,
  LoginContent,
  LoginContentRow,
  LoginHeader,
} from './Login.style';
import { useHistory } from 'react-router';
import { kakaoLogin, kakaoLogout } from '../../../store/apis/kakaoUser';
export default function LogIn() {
  const dispatch = useDispatch(); // 해당 store에 함수에 해당하는 인자로 요청 가능.
  const { logInDone,kakaologInDone } = useSelector((state) => state.user);
  
  const history = useHistory();
  const [kakaoAT , setkakaoAT] = useState('');
  const [id, SetId] = useState('');
  const [pw, SetPw] = useState('');
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleLogIn = (event) => {
      if (id === '') {
          alert('아이디를 입력하세요');
      } else if (pw === '') {
          alert('패스워드를 입력하세요');
      } else {
          dispatch({
            type: LOG_IN_REQUEST,
            data: { id: id, pw: pw },
          });
        }
    };
   
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleLogIn();
    }
  };

  const handleVisibleIcon = () => {
    console.log(">>>>>>>>>>>>>>> icon : ", visible);
    if(visible === true) {
      setInputType("password");
      setVisible(false);
    } else {
      setInputType("text");
      setVisible(true);
    }
  }
  
  const onSocialLogin = () => {
    dispatch({
      type: KAKAO_LOG_IN_REQUEST
    });
  };
  // const kakaoLogoutHandler = () => {
  //     dispatch(kakaoLogout(kakaoAT, localAT))
  // };
  useEffect(() => {
    if (logInDone) {
      history.push('/');
    } else if (kakaologInDone) {
      history.push('/');
    }
  }, [logInDone, kakaologInDone, history]);
  return (
    <Layout>
      <Wrapper>
        <LoginBlock>
          <LoginHeader>
            <div id="title">LOGIN</div>
            <div id="word">당신의 건강을 챙겨보실래요?</div>
          </LoginHeader>
          
          <LoginContent onKeyPress={ handleKeyPress }>
            <LoginContentRow>
              <input
                id="id"
                type="text"
                placeholder="id"
                onChange={e => {
                  SetId(e.target.value);
                }} // 해당 id가 바뀔때 마다 id 변수에 문자열로 저장.
              />
            </LoginContentRow>
            <LoginContentRow>
              <input
                type={ inputType }
                placeholder="password"
                onChange={e => {
                  SetPw(e.target.value);
                }}
              />
              { visible === true ? <VisibilityIcon onClick={ handleVisibleIcon }></VisibilityIcon> : 
                                  <VisibilityOffIcon onClick={ handleVisibleIcon }></VisibilityOffIcon>
              }
            </LoginContentRow>
            <LoginContentRow>
              <button
                id="loginButton"
                onClick={ handleLogIn }
                >로그인
              </button>
            </LoginContentRow>
            <LoginContentRow>
              <div id="footer">
                <p>아직 회원이 아니신가요?</p>
                <br />
                <Link
                  to="/signup"
                  style={{ color: 'gray' }}       
                >
                  회원가입
                </Link>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link
                  to="/find/password"
                  style={{ color: 'gray' }}
                >
                  비밀번호 찾기
                </Link>
              </div>
            </LoginContentRow>
            <LoginContentRow>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <div id="footer">
              <img
                  src={kakaoimage}
                   onClick={ onSocialLogin }
                   alt='카카오로그인 이미지 버튼'
              />
              </div>
            </LoginContentRow>
          </LoginContent>

        </LoginBlock>
      </Wrapper>
    </Layout>
  );
}
