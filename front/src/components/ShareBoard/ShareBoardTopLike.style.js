import styled from "styled-components";

const BestDietWrapper = styled.div `
    background-color: #f2f7f4;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 20px 0;
    margin: 0 auto;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
`;

const ImageBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;

const BoardImage = styled.img`
    width: 250px;
    height: 250px;
    cursor: pointer;
    border-radius: 20px;
`;

const imageDesc = { 
    borderBottomLeftRadius: '20px', 
    borderBottomRightRadius: '20px',
    fontFamily: 'KOTRA_GOTHIC',
}

export {
    BestDietWrapper,
    ImageBox,
    BoardImage,
    imageDesc,
}