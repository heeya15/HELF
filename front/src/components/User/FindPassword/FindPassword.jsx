import React, { useEffect, useState } from 'react';
import { Layout, Wrapper } from '../../../style/variables';
import {
  FindPwBlock,
  FindPwContent,
  FindPwContentRow,
  FindPwHeader,
} from './FindPassword.style';
import { useDispatch, useSelector } from 'react-redux';
import { FIND_PW_REQUEST, SET_MENU } from '../../../store/modules/user';
import { useHistory } from 'react-router';

export default function FindPassword() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const findPwButton = () => {
    
    if (id === '') {
      alert('아이디를 입력해주세요');
    } else if (email === '') {
      alert('이메일을 입력해주세요');
    } else if (name === '') {
      alert('이름을 입력해주세요');
    } else {
      dispatch({
        type: FIND_PW_REQUEST,
        data: { email: email, name: name, id:id },
      });
    }
  };
  const { findPwDone } = useSelector(state => state.user);

  useEffect(() => {
    if (findPwDone) {
      dispatch({ type: SET_MENU, data: 'login' });
      history.push('/login');
    }
  }, [dispatch, findPwDone, history]);
  
  return (
    <Layout>
      <Wrapper>
        <FindPwBlock>
          <FindPwHeader>
            <div id="title">비밀번호 찾기</div>
            <div id="word">
              회원정보에 등록된 정보로 비밀번호를 찾을 수 있습니다.
            </div>
          </FindPwHeader>
          <FindPwContent>
            <FindPwContentRow>
                <input
                  type="text"
                  placeholder="id"
                  id="id"
                  onChange={e => {
                    setId(e.target.value);
                  }}
                />
              </FindPwContentRow>
              <FindPwContentRow>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </FindPwContentRow>
            
           
            <FindPwContentRow>
              <input
                type="text"
                placeholder="Name"
                id="name"
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </FindPwContentRow>
            <FindPwContentRow>
              <button onClick={() => findPwButton()}>찾기</button>
            </FindPwContentRow>
          </FindPwContent>
        </FindPwBlock>
      </Wrapper>
    </Layout>
  );
}
