import { React, useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { useDispatch } from 'react-redux';
// import { SIGN_UP_REQUEST, ID_CHECK_REQUEST } from "../../"


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    // const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordCheck, setPasswordCheck] = useState("")
    const [Name, setName] = useState("")
    const [BirthDate, setBirthDate] = useState("")
    const [Email, setEmail] = useState("")
    
    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onPasswordCheckHandler = (event) => {
        setPasswordCheck(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onBirthDateHandler = (event) => {
        setBirthDate(event.currentTarget.value)
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    // 아이디 중복 검사
    const IdCheck = () => {
        // dispatch({
        //     type: ID_CHECK_REQUEST,
        //     data: { id: Id },
        // })
    }

    // 회원가입 버튼
    const signUp = (event) => {
        if(Id === '') alert('아이디를 입력해주세요');
        else if(Password === '') alert('비밀번호를 입력해주세요');
        else if(Password !== PasswordCheck) alert('비밀번호가 일치하지 않습니다.');
        else if(Name === '' ) alert('이름을 입력해주세요');
        else if(BirthDate === '') alert('생년월일을 입력해주세요');
        else if(Email === '' ) alert('이메일을 입력해주세요');
        else {
            // dispatch({
            //     type: SIGN_UP_REQUEST,
            //     data: {
            //         userId: Id, 
            //         userPassword: Password, 
            //         userName: Name,
            //         birthday: BirthDate,
            //         userEmail: Email,
            //     },
            // });
        }
        event.preventDefault();
    }

    return (
        // <>
        //     <p>here</p>
        // </>
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
                    {/* <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main'
                        }}>
                        <LockOutlinedIcon/>
                    </Avatar> */}
                    {/* <div className='mainIMG'>
                        <img src={ logo } alt="helf logo" width='150' height='80'/>  
                    </div> */}

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
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={12} sm={9}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="id"
                                    label="Id"
                                    name="id"
                                    autoComplete="id"
                                    onChange={onIdHandler}/>
                            </Grid>
                            <Grid item="item" xs={12} sm={3}>
                                <Button
                                    type="submit"
                                    fullWidth="fullWidth"
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        IdCheck();
                                    }}>
                                    인증
                                </Button>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    onChange={onPasswordHandler}/>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="passwordCheck"
                                    label="Password Check"
                                    name="passwordCheck"
                                    onChange={onPasswordCheckHandler}/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="name"
                                    label="Name"
                                    name="name"
                                    onChange={onNameHandler}/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="birthdate"
                                    label="Birth Date (e.g. 98.01.01)"
                                    name="birthdate"
                                    onChange={onBirthDateHandler}/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <TextField
                                    required="required"
                                    fullWidth="fullWidth"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={onEmailHandler}/>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value = "allowExtraEmails" color = "primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth="fullWidth"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>
                            Sign Up
                        </Button>
                        <Grid container="container" justifyContent="flex-end">
                            <Grid item="item">
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{
                        mt: 5
                    }}/>
            </Container>
        </ThemeProvider>
    );
}
