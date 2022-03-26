import { React, useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { 
    AuthButton, 
    SignUpButton,
    Message,
    Success,
    Error,
    SignInLink, } from "./SignUp.style"
import { StayPrimaryLandscapeSharp } from '@mui/icons-material';
import { SIGN_UP_REQUEST, ID_CHECK_REQUEST, EMAIL_CHECK_REQUEST } from "../../../store/modules/user";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();

    // 아이디, 비밀번호, 비밀번호 확인, 이름, 이메일 정보
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    // 오류메시지 상태 저장
    const [idMessage, setIdMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("")

    // 유효성 검사
    const [isId, setIsId] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isPasswordCheck, setIsPasswordCheck] = useState("");
    const [isEmail, setIsEmail] = useState("");

    const { signUpDone, idCheckDone, emailCheckDone } = useSelector(state => state.user);
    
    const onIdHandler = (event) => {
        setId(event.target.value)
        if(event.target.value.length < 4 || event.target.value.length > 12) {
            setIdMessage('4글자 이상 12글자 이하로 입력해주세요.');
            setIsId(false);
        // } else if() {

        } else { 
            setIdMessage('')
            setIsId(true);
        }
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value)

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if(event.target.value.length < 8 || event.target.value.length > 12) {
            setPasswordMessage('8글자 이상 12글자 이하로 입력해주세요.');
            setIsPassword(false);
        } else if(!passwordRegex.test(event.target.value)) {
            setPasswordMessage('숫자, 영문자, 특수문자 조합으로 입력해주세요.');
            setIsPassword(false);
        } else {
            setPasswordMessage('');
            setIsPassword(true);
        }
    }
    const onPasswordCheckHandler = (event) => {
        setPasswordCheck(event.target.value)
        if(event.target.value !== password) {
            setPasswordMessage('비밀번호가 일치하지 않습니다.');
            setIsPasswordCheck(false);
        } else {
            setPasswordMessage('');
            setIsPasswordCheck(true);
        }
    }
    const onNameHandler = (event) => {
        setName(event.target.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.target.value)

        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if(!emailRegex.test(event.target.value)){
            setEmailMessage('유효하지 않는 이메일 형식입니다.');
            setIsEmail(false);
        } else {
            setEmailMessage('');
            setIsEmail(true);
        }
    }

    // 아이디 중복 검사
    const idCheck = () => {
        dispatch({
            type: ID_CHECK_REQUEST,
            data: { id: id },
        })
    }

    // 이메일 중복 검사
    const emailCheck = () => {
        dispatch({
            type: EMAIL_CHECK_REQUEST, 
            data: { email: email },
        })
    }

    // 회원가입 버튼
    const signUp = (event) => {
        if(id === '' || password === '' || passwordCheck === '' || name === '' || email === '') {
            alert('모든 정보를 입력해주세요.');
            event.preventDefault();
        } else if(!isId || !isPassword || !isPasswordCheck || !isEmail) {
            alert('유효성 규칙을 확인해주세요.')
        } else if(password !== passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            event.preventDefault();
        } else if(!idCheckDone) {
            alert('아이디 인증이 필요합니다.');
            event.preventDefault();
        } else if(!emailCheckDone) {
            alert('이메일 인증이 필요합니다.');
            event.preventDefault();
        } else {
            dispatch({
                type: SIGN_UP_REQUEST,
                data: {
                    id: id, 
                    password: password, 
                    name: name,
                    email: email,
                },
            });
        }
        // if(signUpDone) history.push('/LogIn');
        if(!signUpDone) event.preventDefault();
    };
    
    useEffect(() => {
        if(signUpDone) {
            history.push('/LogIn');
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography component="h1" variant="h3">
                        회원 가입
                    </Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        onSubmit={signUp}
                        sx={{
                            mt: 3
                        }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    requried="true"
                                    fullWidth
                                    id="id"
                                    label="Id"
                                    name="id"
                                    autoComplete="id"
                                    onChange={onIdHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <AuthButton
                                    onClick={() => {
                                        idCheck();
                                    }}>
                                    인증
                                </AuthButton>
                            </Grid>
                            { (id.length > 0 && idMessage.length > 0 ) && 
                                <Grid item xs={12}>
                                    { isId ? <Success>{ idMessage } </Success> : 
                                    <Error>{ idMessage }</Error>}
                                </Grid>
                            }
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    requried="true"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    response="true"
                                    onChange={onPasswordHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    requried="true"
                                    fullWidth
                                    id="passwordCheck"
                                    label="Password Check"
                                    name="passwordCheck"
                                    onChange={onPasswordCheckHandler}/>
                            </Grid>
                            { (password.length > 0 && passwordMessage.length > 0 ) && 
                                <Grid item xs={12}>
                                    { isPassword ? <Success>{ passwordMessage } </Success> : 
                                    <Error>{ passwordMessage }</Error>}
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    requried="true"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    onChange={onNameHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    requried="true"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={onEmailHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <AuthButton
                                    onClick={() => {
                                        emailCheck();
                                    }}>
                                    인증
                                </AuthButton>
                            </Grid>  
                            { (email.length > 0 && emailMessage.length > 0 ) && 
                                <Grid item xs={12}>
                                    { isEmail ? <Success>{ emailMessage }</Success> : 
                                        <Error>{ emailMessage }</Error>
                                    }
                                </Grid>
                            }         
                        </Grid>
                        <SignUpButton
                            type="submit"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>
                            Sign Up
                        </SignUpButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    <SignInLink>Already have an account? Sign in</SignInLink>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
