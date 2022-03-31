import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from './Button';
import Typography from './Typography';
import productHowItWorks1 from '../../assets/images/productHowItWorks1.svg';
import productHowItWorks2 from '../../assets/images/productHowItWorks2.svg';
import productHowItWorks3 from '../../assets/images/productHowItWorks3.svg';
import {
    fontNormal, 
    fontBold,
    mainButton,
    item,
    number,
    image,
} from './Main.style';

export default function Effect() {
    const history = useHistory();
    const { logInDone, kakaologInDone } = useSelector(state => state.user);

    const handleGetStarted = () => {
        if(logInDone || kakaologInDone) {
            history.push('/mydiet');
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
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.</Box>
                                <Box
                                    component="img"
                                    src={productHowItWorks1}
                                    alt="suitcase"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    Appointment every Wednesday 9am.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2.</Box>
                                <Box
                                    component="img"
                                    src={productHowItWorks2}
                                    alt="graph"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    First come, first served. Our offers are in limited quantities, so be quick.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3.</Box>
                                <Box
                                    component="img"
                                    src={productHowItWorks3}
                                    alt="clock"
                                    sx={image}/>
                                <Typography variant="h5" align="center" style={ fontNormal }>
                                    {'New offers every week. New experiences, new surprises. '}
                                    {'Your Sundays will no longer be alike.'}
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

