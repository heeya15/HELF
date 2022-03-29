import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  MyPageIconBlock,
  MyPageProfileWrapper,
  MyPageProfileBlock,
  MyPageProfileButton,
  editBox,
  ModalBodyWrapper,
  ButtonWrapper,
  ConfirmButton,
  CancelButton,
} from './MyPage.style';
import {
  PASSWORD_CONFIRM_REQUEST,
  PASSWORD_CONFIRM_RESET,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_RESET,
  MY_PAGE_REQUEST,
} from '../../store/modules/myPage';
import { MdStar, MdPerson, MdSettings } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { usePickerState } from '@mui/lab/internal/pickers/hooks/usePickerState';

export default function MypageProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { me, passwordConfirmDone, updateUserInfoDone } = useSelector(state => state.mypage);
  const [ password, setPassword ] = useState('');
  const [ open, setOpen ] = useState(false);
  const [ gender, setGender ] = useState('');
  
  // 수정 데이터
  const [ newName, setNewName ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ newGender, setNewGender ] = useState(true);
  const [ newHeight, setNewHeight ] = useState(0);
  const [ newWeight, setNewWeight ] = useState(0);
  const [ newBirthday, setNewBirthday ] = useState();
  const [ showPassword, setShowPassword ] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [email, setEmail] = useState();

  const handlePasswordConfirm = () => {
    dispatch({
      type: PASSWORD_CONFIRM_REQUEST,
      data: { password: password }
    });
  };

  const handlePasswordConfirmKeyPress = (e) => {
    if(e.key === 'Enter') {
      handlePasswordConfirm();
    }
  };
  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log("hi");
      console.log(data);
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.kakao_account.profile.nickname);
    } catch (err) {
      console.log(err);
    }
  };
  
  const [userinfo, setUserInfo] = useState({
    userName: '',
    userPassword: '',
    gender: false,
    height: 0,
    weight: 0,
    birthday: '',
  });

  const handleClickShowPassword = () => {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEdit = () => {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST, 
      data: {
        userId: me.userId,
        userName: newName,
        userPassword: newPassword,
        gender: newGender,
        height: newHeight,
        weight: newWeight,
        birthday: newBirthday,
      }
    });
  };

  const handleEditCancel = () => {
    dispatch ({
      type: PASSWORD_CONFIRM_RESET,
    })
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewGender = (event) => {
    setNewGender(event.target.value);
  };

  const handleNewHeight = (event) => {
    setNewHeight(event.target.value);
  };

  const handleNewWeight = (event) => {
    setNewWeight(event.target.value);
  };

  const handleEditKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleEdit();
    }
  };

  useEffect(() => {
    if(me.gender) {
      setGender('여');
    } else {
      setGender('남');
    }
    if(passwordConfirmDone) {
      setOpen(false);
    }
    if(updateUserInfoDone) {
      dispatch({
        type: UPDATE_USER_INFO_RESET,
      });
      dispatch({
        type: MY_PAGE_REQUEST,
      })
    }
    setNewName(me.userName);
    setNewPassword(password);
    setNewGender(me.gender);
    setNewHeight(me.height);
    setNewWeight(me.weight);
    setNewBirthday(me.birthday);
    getProfile();
  }, [ me, passwordConfirmDone, updateUserInfoDone ]);

  useEffect(() => {
    dispatch({
      type: MY_PAGE_REQUEST,
    });
  }, []);

  return (
    <MyPageProfileWrapper>
      <div>
        <MyPageProfileBlock>
          <div id="profileIcon">
            <MyPageIconBlock>
              { <MdPerson />}
            </MyPageIconBlock>
          </div>
          { !passwordConfirmDone ? 
            // 기본 마이페이지 유저 profile
            <div>
              <div>{me.userName}</div>
              <div>{me.birthday}</div>
              <div>{me.userEmail}</div>
              <div>{gender} {me.height}cm {me.weight}kg</div>
              <MyPageProfileButton
                onClick={ handleOpen }
              >회원 정보 수정</MyPageProfileButton>
              <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={ editBox }>
                  <Typography id="modal-modal-title" variant="h4" component="h2">
                    비밀번호 확인
                  </Typography>
                  <hr/>
                  <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    회원 정보 수정을 위해서는 비밀번호 확인이 필요합니다. 
                  </Typography>
                  <ModalBodyWrapper onKeyPress={ handlePasswordConfirmKeyPress }>
                    <span>비밀번호 : </span>
                    <input
                      id="password"
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                      ></input>
                  </ModalBodyWrapper>
                  <hr/>
                  <ButtonWrapper>
                    <ConfirmButton onClick={ handlePasswordConfirm }>
                      확인
                    </ConfirmButton>
                    <CancelButton onClick={ handleClose }>
                      닫기
                    </CancelButton>
                  </ButtonWrapper>
                </Box>
              </Modal>
            </div>
          :
          // 유저 profile 수정
          <Box sx={{ width: '50ch' }} onKeyPress={ handleEditKeyPress }>
            <div>
              <TextField 
                sx={{ m: 1 }}
                label="Name" 
                id="outlined-size-normal"
                defaultValue={me.userName}
                onChange={ handleNewName }
              />
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  defaultValue={ password }
                  type={showPassword ? 'password' : 'text'}
                  onChange={ handleNewPassword }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={me.gender}
                  onClick={handleNewGender}
                >
                  <FormControlLabel value="false" control={<Radio />} label="남자" />
                  <FormControlLabel value="true" control={<Radio />} label="여자" />
                  
                </RadioGroup>
              </FormControl>
              <TextField 
                sx={{ m: 1 }}
                label="Height"
                id="outlined-size-normal"
                defaultValue={me.height}
                onChange={ handleNewHeight }
                />
              <TextField 
                sx={{ m: 1 }}
                label="Weight" 
                id="outlined-size-normal" 
                defaultValue={me.weight}
                onChange={ handleNewWeight }
              />
            </div>
            <ConfirmButton onClick={ handleEdit }>수정</ConfirmButton>
            <CancelButton onClick={ handleEditCancel }>취소</CancelButton>
          </Box>
          }
        </MyPageProfileBlock>
      </div>
    </MyPageProfileWrapper>
  );
}
