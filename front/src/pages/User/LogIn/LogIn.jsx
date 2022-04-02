import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import { Layout, Wrapper } from "../../../style/variables";
import {
  LOG_IN_REQUEST,
  KAKAO_LOG_IN_REQUEST,
} from "../../../store/modules/user";
import TextField from "@mui/material/TextField";
import AppForm from "../../../components/User/SignUp/AppForm";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "../../../components/Main/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  LoginBlock,
  LoginContent,
  LoginContentRow,
  LoginHeader,
  LogInButton,
  kakaoButton,
  SignUpLink,
  subFunction,
  inputTextField,
  horizontalCenter,
} from "./Login.style";
import { useHistory } from "react-router";
import kakaoimage from "../../../assets/images/kakao_login_medium_narrow.png";

const theme = createTheme();

export default function LogIn() {
  const CLIENT_ID = "596cd5eb9b29a6f68439ecb9a70599cf";
  const REDIRECT_URI = "http://localhost:3000/login";
  const dispatch = useDispatch(); // 해당 store에 함수에 해당하는 인자로 요청 가능.
  const { logInDone, kakaologInDone } = useSelector((state) => state.user);
  const { me, meStateDone } = useSelector((state) => state.mypage);

  const history = useHistory();
  const [kakaoAT, setkakaoAT] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogIn = (event) => {
    if (id === "") {
      alert("아이디를 입력하세요");
      event.preventDefault();
    } else if (pw === "") {
      alert("패스워드를 입력하세요");
      event.preventDefault();
    } else {
      dispatch({
        type: LOG_IN_REQUEST,
        data: { id: id, pw: pw },
      });
    }
    if (!logInDone && !kakaologInDone) {
      event.preventDefault();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogIn(e);
    }
  };

  const handleSignUp = () => {
    history.push("/signup");
  };

  const handleFindPassword = () => {
    history.push("/find/password");
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
  const { Kakao } = window;
  const [ac, setAc] = useState("");
  const onSocialLogin = () => {
    Kakao.Auth.login({
      // 카카오 로그인 화면 팝업으로 띄우고
      success: function(authObj) {
        setAc(authObj.access_token);
        let socialAC = `Bearer ${ac}`;
        // console.log("hi");
        // console.log(socialAC);
        Kakao.Auth.setAccessToken(authObj.access_token);
        dispatch({
          type: KAKAO_LOG_IN_REQUEST,
        });
      },
      fail: function(err) {},
    });
  };

  useEffect(() => {
    if (logInDone || kakaologInDone) {
      if (meStateDone) {
        if (me.weight === 0 && me.height === 0 && !me.birthday) {
          history.push("/additionalUserInfo");
        } else {
          history.push("/");
        }
      }
    }
  }, [me, kakaologInDone, logInDone, meStateDone]);

  return (
    <AppForm>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            onKeyPress={handleKeyPress}
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
              style={{ fontFamily: "KOTRA_BOLD-Bold" }}
            >
              LOG IN
            </Typography>
            <Typography variant="body2" align="center"></Typography>
            <Box
              component="form"
              noValidate="noValidate"
              onSubmit={(e) => {
                handleLogIn(e);
              }}
              sx={{
                mt: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    requried="true"
                    fullWidth
                    id="id"
                    label="Id"
                    name="id"
                    autoComplete="id"
                    style={inputTextField}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="pw"
                      name="pw"
                      type={showPassword ? "password" : "text"}
                      style={inputTextField}
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
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
                </Grid>
              </Grid>
              <LogInButton
                type="submit"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                LOG IN
              </LogInButton>
              <Grid container justifyContent="flex-end">
                <Grid item style={horizontalCenter}>
                  <SignUpLink onClick={handleSignUp}>
                    Don't have an account? Sign up now!
                  </SignUpLink>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "20px" }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={subFunction}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={subFunction}
                  onClick={handleFindPassword}
                >
                  Find Password
                </Grid>
                <Grid item xs={12} style={kakaoButton}>
                  <img
                    src={kakaoimage}
                    onClick={onSocialLogin}
                    alt="kakao login button"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </AppForm>
    // <Layout>
    //   <Wrapper>
    //     <LoginBlock>
    //       <LoginHeader>
    //         <div id="title">LOGIN</div>
    //         <div id="word">당신의 건강을 챙겨보실래요?</div>
    //       </LoginHeader>

    //       <LoginContent onKeyPress={ handleKeyPress }>
    //         <LoginContentRow>
    //           <input
    //             id="id"
    //             type="text"
    //             placeholder="id"
    //             onChange={e => {
    //               SetId(e.target.value);
    //             }} // 해당 id가 바뀔때 마다 id 변수에 문자열로 저장.
    //           />
    //         </LoginContentRow>
    //         <LoginContentRow>
    //           <input
    //             type={ inputType }
    //             placeholder="password"
    //             onChange={e => {
    //               SetPw(e.target.value);
    //             }}
    //           />
    //           { visible === true ? <VisibilityIcon onClick={ handleVisibleIcon }></VisibilityIcon> :
    //                               <VisibilityOffIcon onClick={ handleVisibleIcon }></VisibilityOffIcon>
    //           }
    //         </LoginContentRow>
    //         <LoginContentRow>
    //           <button
    //             id="loginButton"
    //             onClick={ handleLogIn }
    //             >로그인
    //           </button>
    //         </LoginContentRow>
    //         <LoginContentRow>
    //           <div id="footer">
    //             <p>아직 회원이 아니신가요?</p>
    //             <br />
    //             <Link
    //               to="/signup"
    //               style={{ color: 'gray' }}
    //             >
    //               회원가입
    //             </Link>
    //             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    //             <Link
    //               to="/find/password"
    //               style={{ color: 'gray' }}
    //             >
    //               비밀번호 찾기
    //             </Link>
    //           </div>
    //         </LoginContentRow>
    //         <LoginContentRow>
    //         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    //           <div id="footer">
    //           <img
    //               src={kakaoimage}
    //               onClick={ onSocialLogin }
    //               alt='카카오로그인 이미지 버튼'
    //           />
    //           </div>
    //         </LoginContentRow>
    //       </LoginContent>

    //     </LoginBlock>
    //   </Wrapper>
    // </Layout>
  );
}
