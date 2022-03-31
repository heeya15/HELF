import styled from 'styled-components';

const footerBackground = { 
    backgroundColor : '#121319',
    color: '#fff',
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark'
    }
};

const regualrFontColor = {
    color: '#fff',
};


const fontBold = {
    fontFamily: 'KOTRA_BOLD-Bold',
}

const fontNormal = {
    fontFamily: 'KOTRA_GOTHIC',
}

const contributor = {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#fff',
};

const contributors = {
    fontFamily: 'KOTRA_GOTHIC',
    fontSize: '20px',
}

const Copyright = styled.span`
    color: 	#414a4c;
    fontFamily: 'KOTRA_GOTHIC',
`;

const LogoImage = styled.img`
    width: 200px;
    height: 180px;
    cursor: pointer;
`;

export {
    footerBackground,
    iconStyle,
    regualrFontColor,
    fontBold,
    fontNormal,
    contributor,
    contributors,
    Copyright,
    LogoImage,
}
