import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import Typography from './Typography';
import BannerLayout from './BannerLayout';
import bannerImg from '../../assets/images/banner.jpg';
import {
    fontNormal, 
    fontBold,
    mainButton,
} from './Main.style';


export default function Banner() {
    const history = useHistory();

    const handleRegister = () => {
        history.push('/signup');
    }

    return (
        <BannerLayout
            sxBackground={{
                backgroundImage: `url(${bannerImg})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center'
            }}>
            <img
                style={{
                    display: 'none'
                }}
                src={bannerImg}
                alt="increase priority"/>
            <Typography color="inherit" align="center" variant="h2" marked="center" style={fontBold}>
                START HEALTHY LIFE
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                style={ fontNormal }
                sx={{
                    mb: 4,
                    mt: {
                        sx: 4,
                        sm: 10
                    }
                }}>
                Keep an eye on what you eat and how you do your workout.
            </Typography>
            <Button
                variant="contained"
                size="large"
                component="a"
                style={ mainButton }
                sx={{
                    minWidth: 200
                }}
                onClick={ handleRegister }
                >
                Register
            </Button>
            <Typography
                variant="body2"
                color="inherit"
                style={ fontNormal }
                sx={{
                    mt: 2
                }}>
                Discover the experience
            </Typography>
        </BannerLayout>
    );
}
