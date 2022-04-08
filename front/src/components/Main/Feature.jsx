import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from './Button';
import Typography from './Typography';
import feature1 from '../../assets/images/feature1.svg';
import feature2 from '../../assets/images/feature2.svg';
import feature3 from '../../assets/images/feature3.svg';
import {
    fontNormal, 
    fontBold,
    mainButton,
    item,
    number,
    image,
} from './Main.style';

export default function Feature() {
    const history = useHistory();
    const { logInDone, kakaologInDone } = useSelector(state => state.user);

    const handleGetStarted = () => {
        if(logInDone || kakaologInDone) {
            history.push('/exercisesetting');
        } else {
            history.push('/login');
        }
    }

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                overflow: 'hidden'
            }}>
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Box
                    component="img"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7
                    }}/>
                <Typography
                    variant="h4"
                    marked="center"
                    component="h2"
                    style={ fontBold }
                    sx={{
                        mb: 14
                    }}>
                    Features We Have
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Box
                                    component="img"
                                    src={feature1}
                                    alt="suitcase"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    AI 음식 사진 인식을 통한<br/> 간편한 식단 일지 작성
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component="img"
                                    src={feature2}
                                    alt="graph"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    AI 운동 개수 카운팅과 <br/> 자동 운동 기록 작성
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component="img"
                                    src={feature3}
                                    alt="clock"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    식단을 공유를 통한 지루한 식단 루틴 탈출
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button
                    size="large"
                    variant="contained"
                    component="a"
                    sx={{
                        mt: 8
                    }}
                    style={ mainButton }
                    onClick={ handleGetStarted }
                    >
                    Get started
                </Button>
            </Container>
        </Box>
    );
}

