import styled from "styled-components";
import { blockColor, device } from "../../style/variables";

const MyPageProfileImgDiv = styled.div`
  width: 15vh;
  height: 15vh;
  border-radius: 70%;
  overflow: hidden;
  position: relative;
  margin: auto;
  top: -50px;
  background-color: white;
  box-shadow: 3px 3px 3px 2px #404040;
`;

const MyPageProfileImgTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileTextDiv = styled.div`
  position: relative;
  top: -50px;
  width: 100%;
  height: 100%;
`;

const WhiteBlock = styled.div`
  width: 90%;
  height: 45%;
  background-color: white;
  margin: auto;
  margin-top: 60px;
  border-radius: 30px;
  box-shadow: 3px 3px 3px 2px #404040;
`;

const ImageCard = styled.div`
  width: 200px;
  height: 250px;
  background-color: white;
  box-shadow: 3px 3px 3px 2px #404040;
  border-radius: 20px;
  margin: auto;
  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const StarCard = styled.div`
  width: 200px;
  height: 250px;
  background-color: white;
  box-shadow: 3px 3px 3px 2px #404040;
  border-radius: 20px;
  margin: auto;
  &:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const NonStarCard = styled.div`
  width: 200px;
  height: 250px;
  background-color: white;
  box-shadow: 3px 3px 3px 2px #404040;
  border-radius: 20px;
  margin: auto;
  }
`;

const ScheduleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ScheduleBlock = styled.div`
  max-width: 1200px;
  width: 70%;
  height: 78.5vh;
  background-color: ${blockColor};
  border-radius: 10px;
  color: black;
  overflow-y: auto;
  @media ${device.TabletPortrait} {
    width: 100%;
    border-radius: 0px;
  }
`;

const InFormBlock = styled.div`
  max-width: 800px;
  -ms-overflow-style: none;
  width: 70%;
  height: 78.5vh;
  background-color: ${blockColor};
  border-radius: 10px;
  color: black;
  overflow-y: auto;
  @media ${device.TabletPortrait} {
    width: 100%;
    border-radius: 0px;
  }
`;

// const MyPageWrapper = styled.div`
//   height: 100%;
//   margin: 0 10px;
//   overflow-y: auto;
//   @media ${device.TabletPortrait} {
//     margin: 0;
//   }
// `;

const MyPageWrapper = styled.div`
  width: 70%; 
  height: 100%;
  margin: 40px auto;
  align-items: center;
`;

const MyPageHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  @media ${device.TabletPortrait} {
    padding: 10px;
  }
`;
const MyPageContent = styled.div`
  width: 100%;
  .poster {
    padding: 0 10%;
  }
`;

const BlockWrapper = styled.div`
  height: 100%;
  padding: 60px 20px 20px 20px;
  align-items: center;
  background-color: #f2f7f4;
  border-radius: 10px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  font-size: 50px;
  margin: 10px 0;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

export { 
  MyPageWrapper, 
  MyPageHeader, 
  MyPageContent,
  BlockWrapper,
  Title,
};
