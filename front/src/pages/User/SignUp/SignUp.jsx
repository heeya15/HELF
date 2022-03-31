import React, { useState }  from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { 
    AuthButton, 
    SignUpButton,
    Success,
    Error,
    SignInLink, } from "./SignUp.style"
import AppForm from "../../../components/User/SignUp/AppForm";
import Typography from "../../../components/Main/Typography";
import { SIGN_UP_REQUEST, ID_CHECK_REQUEST, EMAIL_CHECK_REQUEST } from "../../../store/modules/user";



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
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordCheck, setShowPasswordCheck] = useState(true);

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

    const handleClickShowPasswordCheck = () => {
        if(showPasswordCheck) {
            setShowPasswordCheck(false);
        } else {
            setShowPasswordCheck(true);
        }
    };

    const handleMouseDownPasswordCheck = (event) => {
        event.preventDefault();
    };

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

    const handleSignIn = () => {
        history.push("/login");
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

    // 엔터키 회원가입 trigger
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSignUp(e);
        }
    };

    // 회원가입 버튼
    const handleSignUp = (event) => {        
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
    });

    return (
        <AppForm>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    onKeyPress={ handleKeyPress }
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography variant="h3" gutterBottom marked="center" align="center" style={{ fontFamily: 'KOTRA_BOLD-Bold' }}>
                        SIGN UP
                    </Typography>
                    <Typography variant="body2" align="center"></Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        onSubmit={e => {
                            handleSignUp(e);
                        }}
                        sx={{
                            mt: 3
                        }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="id"
                                    label="Id"
                                    name="id"
                                    autoComplete="id"
                                    style={{ backgroundColor: 'white' }}
                                    onChange={onIdHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <AuthButton
                                    type="button"
                                    onClick={ idCheck }>
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
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                    required
                                    id="password"
                                    name="password"
                                    type={ showPassword ? 'password' : 'text'}
                                    style={{ backgroundColor: 'white' }}
                                    onChange={ onPasswordHandler }
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password Check</InputLabel>
                                    <OutlinedInput
                                    required
                                    id="passwordCheck"
                                    name="passwordCheck"
                                    type={ showPasswordCheck ? 'password' : 'text'}
                                    style={{ backgroundColor: 'white' }}
                                    onChange={ onPasswordCheckHandler }
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordCheck}
                                            onMouseDown={handleMouseDownPasswordCheck}
                                            edge="end"
                                        >
                                            { showPasswordCheck ? <VisibilityOff /> : <Visibility /> }
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password Check"
                                    />
                                </FormControl>
                            </Grid>

                            { (password.length > 0 && passwordMessage.length > 0 ) && 
                                <Grid item xs={12}>
                                    { isPassword ? <Success>{ passwordMessage } </Success> : 
                                    <Error>{ passwordMessage }</Error>}
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    style={{ backgroundColor: 'white' }}
                                    onChange={onNameHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    style={{ backgroundColor: 'white' }}
                                    onChange={onEmailHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <AuthButton
                                    type="button"
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
                            SIGN UP
                        </SignUpButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <SignInLink 
                                    style={{ fontFamily: 'KOTRA_GOTHIC' }}
                                    onClick={ handleSignIn }
                                >Already have an account? Sign in</SignInLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </AppForm>
    );
}
