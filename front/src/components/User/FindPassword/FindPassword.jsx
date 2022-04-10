import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FIND_PW_REQUEST, SET_MENU } from '../../../store/modules/user';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppForm from '../SignUp/AppForm';
import {
  subFunction,
  inputTextField,
  LogInButton,
} from '../../../pages/User/LogIn/Login.style';
import Typography from '../../Main/Typography';

const theme = createTheme();

export default function FindPassword() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { findPwDone } = useSelector(state => state.user);

  const findPwButton = (event) => {
    if (id === '') {
      alert('아이디를 입력해주세요');
      event.preventDefault();
    } else if (email === '') {
      alert('이메일을 입력해주세요');
      event.preventDefault();
    } else if (name === '') {
      alert('이름을 입력해주세요');
      event.preventDefault();
    } else {
      dispatch({
        type: FIND_PW_REQUEST,
        data: { email: email, name: name, id:id },
      });
    }
    if(!findPwDone) event.preventDefault();
  };

  const handleLogIn = () => {
    history.push('/login');
  }

  // useEffect(() => {
  //   if (findPwDone) {
  //     dispatch({ 
  //       type: SET_MENU,
  //       data: 'login'
  //     });
  //     history.push('/login');
  //   }
  // }, [ findPwDone ]);
  
  return (
    <AppForm>
      <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    // onKeyPress={ handleKeyPress }
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography variant="h3" gutterBottom marked="center" align="center" style={{ fontFamily: 'KOTRA_BOLD-Bold' }}>
                        FIND<br/>PASSWORD
                    </Typography>
                    <Typography variant="body2" align="center"></Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        onSubmit={ findPwButton }
                        sx={{
                            mt: 3
                        }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="id"
                                    label="Id"
                                    name="id"
                                    style={inputTextField}
                                    onChange={e => {
                                      setId(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    style={inputTextField}
                                    onChange={e => {
                                      setEmail(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    requried
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    style={inputTextField}
                                    onChange={e => {
                                      setName(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <LogInButton
                            type="submit"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}>  
                            FIND PASSWORD
                        </LogInButton>
                        <Grid container spacing={2} style={{ marginTop: '20px'}}>
                          <Grid 
                            item xs={12}
                            style={subFunction}
                            onClick={ handleLogIn }>
                            돌아가기
                          </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </AppForm>
  );
}
