import styled from "styled-components";

const BestDietWrapper = styled.div`
  background-color: #f2f7f4;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 1025px) {
    width: 80%;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const BoardImage = styled.img`
  @media screen and (max-width: 1244px) {
    width: 150px;
    height: 150px;
  }
  @media screen and (min-width: 1245px) and (max-width: 1560px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (min-width: 1561px) {
    width: 250px;
    height: 250px;
  }
  cursor: pointer;
  border-radius: 20px;
`;

const imageDesc = {
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  fontFamily: "KOTRA_GOTHIC",
};

export { BestDietWrapper, ImageBox, BoardImage, imageDesc };
