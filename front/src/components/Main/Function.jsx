import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import productCurvyLines from '../../assets/images/productCurvyLines.png';
import productValues1 from '../../assets/images/productValues1.svg';
import productValues2 from '../../assets/images/productValues2.svg';
import productValues3 from '../../assets/images/productValues3.svg';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5
};

export default function Function() {
    return (
        <Box
            style={{ backgroundColor : '#ebfceb' }}
            component="section"
            sx={{
                display: 'flex',
                overflow: 'hidden',
            }}>
            <Container
                sx={{
                    mt: 15,
                    mb: 30,
                    display: 'flex',
                    position: 'relative'
                }}>
                <Box
                    component="img"
                    src={productCurvyLines}
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180
                    }}/>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={productValues1}
                                alt="suitcase"
                                sx={{
                                    height: 55
                                }}/>
                            <Typography
                                variant="h6"
                                sx={{
                                    my: 5
                                }}>
                                The best luxury hotels
                            </Typography>
                            <Typography variant="h5">
                                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}

                                {', go for a mini-vacation just a few subway stops away from your home.'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={productValues2}
                                alt="graph"
                                sx={{
                                    height: 55
                                }}/>
                            <Typography
                                variant="h6"
                                sx={{
                                    my: 5
                                }}>
                                New experiences
                            </Typography>
                            <Typography variant="h5">
                                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}

                                {'your Sundays will not be alike.'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={productValues3}
                                alt="clock"
                                sx={{
                                    height: 55
                                }}/>
                            <Typography
                                variant="h6"
                                sx={{
                                    my: 5
                                }}>
                                Exclusive rates
                            </Typography>
                            <Typography variant="h5">
                                {'By registering, you will access specially negotiated rates '}
                                {'that you will not find anywhere else.'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

