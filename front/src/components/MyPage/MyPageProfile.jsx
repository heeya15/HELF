import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  NameInfo,
  BirthdayInfo,
  EmailInfo,
  PhysicalInfo,
  UserInfo,
  ProfileImage,
  center,
  modalTitle,
  modalBody,
  editInput,
} from "./MyPage.style";
import {
  PASSWORD_CONFIRM_REQUEST,
  PASSWORD_CONFIRM_RESET,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_RESET,
  MY_PAGE_REQUEST,
} from "../../store/modules/myPage";
import Grid from '@mui/material/Grid';
import { MdPerson } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Row, Col } from "react-bootstrap";
import profile1 from "../../assets/images/profile1.jpg";
import profile2 from "../../assets/images/profile2.jpg";
import profile3 from "../../assets/images/profile3.jpg";
import profile4 from "../../assets/images/profile4.jpg";

export default function MypageProfile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    me,
    passwordConfirmDone,
    updateUserInfoDone,
  } = useSelector((state) => state.mypage);
  const { kakaologInDone } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");

  // 수정 데이터
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newGender, setNewGender] = useState(false);
  const [newHeight, setNewHeight] = useState(0);
  const [newWeight, setNewWeight] = useState(0);
  const [newBirthday, setNewBirthday] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  // 오류메시지 상태 저장
  const [passwordMessage, setPasswordMessage] = useState("");
  const [heightMessage, setHeightMessage] = useState("");
  const [weightMessage, setWeightMessage] = useState("");
  
  // 유효성 검사
  const [isPassword, setIsPassword] = useState(true);
  const [isHeight, setIsHeight] = useState(true);
  const [isWeight, setIsWeight] = useState(true);
  
  // 프로필 이미지
  var profileImages = [
    profile1,
    profile2,
    profile3,
    profile4,
  ]

  const [ profileImg, setProfileImg ] = useState('');
  
  
  console.log("🍟🍟🍟🍟🍟🍟", profileImg);
  // 모달창 open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordConfirm = () => {
    dispatch({
      type: PASSWORD_CONFIRM_REQUEST,
      data: { password: password },
    });

  };

  const handlePasswordConfirmKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePasswordConfirm();
    }
  };

  const handleClickShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEdit = (event) => {
    if (
      newName === "" ||
      newPassword === "" ||
      newHeight === "" ||
      newWeight === "" ||
      newBirthday === "" ||
      !newBirthday
    ) {
      alert("모든 정보를 입력해주세요.");
      event.preventDefault();
    } else if (!isPassword) {
      alert(passwordMessage);
      event.preventDefault();
    } else if (!isHeight) {
      alert(heightMessage);
      event.preventDefault();
    } else if (!isWeight) {
      alert(weightMessage);
      event.preventDefault();
    } else {
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
        },
      });
    }
  };

  const handleEditCancel = () => {
    dispatch({
      type: PASSWORD_CONFIRM_RESET,
    });
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (event.target.value.length < 8 || event.target.value.length > 12) {
      setPasswordMessage("비밀번호를 8글자 이상 12글자 이하로 입력해주세요.");
      setIsPassword(false);
    } else if (!passwordRegex.test(event.target.value)) {
      setPasswordMessage(
        "비밀번호를 숫자, 영문자, 특수문자 조합으로 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const handleNewGender = (event) => {
    setNewGender(event.target.value);
  };

  const handleNewHeight = (event) => {
    setNewHeight(event.target.value);
    const heightRegex = /^[0-9]+$/;
    if (!heightRegex.test(event.target.value)) {
      setIsHeight(false);
      setHeightMessage("키는 숫자만 입력가능합니다.");
    } else {
      setIsHeight(true);
    }
  };

  const handleNewWeight = (event) => {
    setNewWeight(event.target.value);
    const weightRegex = /^[0-9]+$/;
    if (!weightRegex.test(event.target.value)) {
      setIsWeight(false);
      setWeightMessage("몸무게는 숫자만 입력가능합니다.");
    } else {
      setIsWeight(true);
    }
  };

  const handleNewBirthday = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    setNewBirthday(event.target.value);
  };

  const handleEditKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEdit();
    }
  };
  
  // 유저 정보를 받아왓을때
  useEffect(() => {
    if (me.gender) {
      setGender("여");
    } else {
      setGender("남");
    }

    if (passwordConfirmDone) {
      setOpen(false);
    }

    if (updateUserInfoDone) {
      dispatch({
        type: UPDATE_USER_INFO_RESET,
      });
      dispatch({
        type: MY_PAGE_REQUEST,
      });
    }
    console.log(updateUserInfoDone);
    setNewName(me.userName);
    setNewPassword(password);
    setNewGender(me.gender);
    setNewHeight(me.height);
    setNewWeight(me.weight);
    setNewBirthday(me.birthday);
  }, [me, updateUserInfoDone, passwordConfirmDone]);

  // 페이지 랜더링될 때, 최초 1회 유저 정보 가져오기
  useEffect(() => {
    dispatch({
      type: MY_PAGE_REQUEST,
    });

    const number = Math.floor(Math.random() * 4);  // 1 ~ 13 사이의 숫자 랜덤 생성
    setProfileImg(profileImages[number]);
  }, []);

  return (
    <MyPageProfileWrapper>
      <Row
        style={center}
      >
        <Col md="6"> 
          <ProfileImage src={profile1} />
        </Col>
        {!passwordConfirmDone ? (
          // 기본 마이페이지 유저 profile
        <Col md="6">
          <UserInfo>
            <NameInfo>{me.userName}</NameInfo>
            <BirthdayInfo>🍰 {me.birthday}</BirthdayInfo>
            <EmailInfo>📧 {me.userEmail}</EmailInfo>
            <PhysicalInfo>
              {gender} {me.height}cm {me.weight}kg
            </PhysicalInfo>
            <MyPageProfileButton onClick={handleOpen}>
              정보 수정
            </MyPageProfileButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {kakaologInDone ? (
                <Box sx={editBox}>
                  <Typography
                    id="modal-modal-title"
                    style={modalTitle}
                  >
                    이메일 확인
                  </Typography>
                  <hr />
                  <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    회원 정보 수정을 위해서는 이메일 확인이 필요합니다.
                  </Typography>
                  <ModalBodyWrapper
                    onKeyPress={handlePasswordConfirmKeyPress}
                    style={modalBody}
                  >
                    <span>이메일 : </span>
                    <input
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </ModalBodyWrapper>
                  <hr />
                  <ButtonWrapper>
                    <ConfirmButton onClick={handlePasswordConfirm}>
                      확인
                    </ConfirmButton>
                    <CancelButton onClick={handleClose}>닫기</CancelButton>
                  </ButtonWrapper>
                </Box>
              ) : (
                <Box sx={editBox}>
                  <Typography
                    id="modal-modal-title"
                    style={modalTitle}
                  >
                    비밀번호 확인
                  </Typography>
                  <hr />
                  <Typography 
                    id="modal-modal-description" 
                    sx={{ mt: 1 }}
                    style={modalBody}>
                    회원 정보 수정을 위해서는 비밀번호 확인이 필요합니다.
                  </Typography>
                  <ModalBodyWrapper
                    onKeyPress={handlePasswordConfirmKeyPress}
                    style={modalBody}
                  >
                    <span>비밀번호 : </span>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </ModalBodyWrapper>
                  <hr />
                  <ButtonWrapper>
                    <ConfirmButton onClick={handlePasswordConfirm}>
                      확인
                    </ConfirmButton>
                    <CancelButton onClick={handleClose}>닫기</CancelButton>
                  </ButtonWrapper>
                </Box>
              )}
            </Modal>
          </UserInfo>
        </Col>
        ) : (
          // 유저 profile 수정
        // <Box onKeyPress={handleEditKeyPress}>
          <Col md="6" style={{textAlign: 'left'}}>
            <Row style={{marginTop: '10px'}}>
              <Col md="6">
                <TextField
                  style={editInput}
                  label="Name"
                  id="outlined-size-normal"
                  defaultValue={me.userName}
                  onChange={handleNewName}
                  />
              </Col>
              <Col md="6">
                <TextField
                  style={editInput}
                  label="Birthday"
                  id="outlined-size-normal"
                  defaultValue={me.birthday}
                  onChange={handleNewBirthday}
                />
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              {kakaologInDone === false && (
              <Col md="6">
                <FormControl
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    style={editInput}
                    id="outlined-adornment-password"
                    defaultValue={password}
                    type={showPassword ? "password" : "text"}
                    onChange={handleNewPassword}
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
              </Col>
              )}
              <Col md="6">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={me.gender}
                    onClick={handleNewGender}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="남자"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="여자"
                    />
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col md="6">
              <TextField
                style={editInput}
                label="Height"
                id="outlined-size-normal"
                defaultValue={me.height}
                onChange={handleNewHeight}
              />
              </Col>
              <Col md="6">
              <TextField
                style={editInput}  
                label="Weight"
                id="outlined-size-normal"
                defaultValue={me.weight}
                onChange={handleNewWeight}
              />
              </Col>
            </Row>
            <Row className="justify-content-center" 
              style={{marginTop: '10px'}}>
              <ConfirmButton onClick={handleEdit}>수정</ConfirmButton>
              <CancelButton onClick={handleEditCancel}>취소</CancelButton>
            </Row>
          </Col>  
          // </Box>
        )}
      </Row>
    </MyPageProfileWrapper>
  );
}
