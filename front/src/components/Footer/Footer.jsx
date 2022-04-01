import * as React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../Main/Typography';
import logo from '../../logo.png';
import {
    footerBackground,
    regualrFontColor,
    fontBold,
    contributor,
    contributors,
    Copyright,
    LogoImage,
} from './Footer.style';

export default function Footer() {
    const handleLogo = () => {
        window.scrollTo(0,0);
    };
    return (
        <Typography
            component="footer"
            style={ footerBackground }
            sx={{
                display: 'flex',
            }}>
            <Container
                sx={{
                    my: 8,
                    display: 'flex'
                }}>
                <Grid container spacing={5}>
                
                    <Grid item xs={12} sm={3}>
                    {/* <Grid item xs={6} sm={4} md={3}> */}
                        <Grid
                            container
                            direction="column"
                            sx={{
                                height: 100,
                                width: 50
                            }}>
                            <LogoImage src={ logo } alt="system logo" onClick={ handleLogo } />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9} style={{ textAlign: 'left' }}>
                        <Typography variant="h6" gutterBottom style={ regualrFontColor }>
                            <span style={ fontBold}>Contributors</span>
                        </Typography>
                        <Grid container spacing={2} style={ contributors }>
                            <Grid item xs={4}>
                                <Link href="https://github.com/heeya15" style={contributor}>김광희</Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link href="https://github.com/" style={contributor}>반형동</Link>
                                </Grid>
                            <Grid item xs={4}>
                                <Link href="https://github.com/onegi95" style={contributor}>손한기</Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link href="https://github.com/sorrow4468" style={contributor}>이정원</Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link href="https://github.com/youngjin98" style={contributor}>최영진</Link>
                                </Grid>
                            <Grid item xs={4}>
                                <Link href="https://github.com/ehhclaire" style={contributor}>한성희</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            { <Copyright>Copyright { ' © '} 2022 by HELF</Copyright>}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
