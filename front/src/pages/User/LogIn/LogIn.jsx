import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route,Link } from 'react-router-dom';
import { Layout, Wrapper } from '../../../style/variables';
import { LOG_IN_REQUEST} from '../../../store/modules/user';
import {
  LoginBlock,
  LoginContent,
  LoginContentRow,
  LoginHeader,
} from './Login.style';
import { useHistory } from 'react-router';
export default function SharedBoard() {
  const dispatch = useDispatch(); // 해당 store에 함수에 해당하는 인자로 요청 가능.
  const { logInDone } = useSelector((state) => state.user);
  const history = useHistory();
    const [id, SetId] = useState('');
    const [pw, SetPw] = useState('');
    const LoginButton = () => {
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
      (logInDone === false) && history.push("/")   
  };
  return (
    <Layout>
      <Wrapper>
       <LoginBlock>
          <LoginHeader>
            <div id="title">LOGIN</div>
            <div id="word">당신의 건강을 챙겨보실래요?</div>
          </LoginHeader>
          
          <LoginContent>
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
                type="password"
                placeholder="password"
                onChange={e => {
                  SetPw(e.target.value);
                }}
              />
            </LoginContentRow>
            <LoginContentRow>
              <button id="login-button" onClick={() => LoginButton()}>
                로그인
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
          </LoginContent>

        </LoginBlock>
      </Wrapper>
    </Layout>
  );
}
