import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
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
    const { logInDone, kakaologInDone } = useSelector((state) => state.user);

    const handleRegister = () => {
        if(logInDone || kakaologInDone) {
            history.push('/mydiet')
        } else {
            history.push('/signup');
        }
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
                {/* Keep an eye on what you eat and how you do your workout. */}
                식단을 관리, 영양 성분 통계와 운동 기록을 확인하여<br/>HELF와 함께 건강한 삶을 시작하세요!
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
                {/* Discover the experience */}
                건강해지러 가기
            </Typography>
        </BannerLayout>
    );
}
