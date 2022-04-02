import styled from 'styled-components';

const BannerWrapper = styled.div`
    height: 100%;;
    width: 100%;
`;  
    
const FunctionWrapper = styled.div`
    background-color: #2E7D32;
    padding: 60px 0px;
`;
    
const EffectWrapper = styled.div`
    margin: 50px 0px;
    padding: 20px 0px;
`;

const SubTitle = styled.div`
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 500;
`;

const SubGreenTitle = styled.div`
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 500;
    color: #fff;
`;

const BannerImage = styled.img` 
    width: 100vw;
    height: auto;
`;

const fontBold = {
    fontFamily: 'KOTRA_BOLD-Bold',
}

const fontNormal = {
    fontFamily: 'KOTRA_GOTHIC',
}

const mainButton = {
    fontFamily: 'KOTRA_BOLD-Bold',
    backgroundColor: '#FFD984',
    color: '#000',    
}

const content = {
    fontFamily: 'KOTRA_GOTHIC',
    wordBreak: 'break-all',
}

// Function Component
const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5
};

// Effect Component
const number = {
    fontSize: 24,
    color: '#2b802f',
    fontWeight: 'medium'
};

const image = {
    height: 55,
    my: 4
};

export {
    BannerWrapper,
    FunctionWrapper,
    EffectWrapper,
    SubTitle,
    SubGreenTitle,
    BannerImage,
    fontBold,
    fontNormal,
    mainButton,
    item,
    number,
    image,
    content,
};
