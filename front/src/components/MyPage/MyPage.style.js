import styled from "styled-components";
import { blockColor, device, pointColor } from "../../style/variables";

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;
const MyPageProfileWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid gray;
  max-width: 800px;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  @media ${device.TabletPortrait} {
    padding: 10px;
  }
`;

const MyPageProfileBlock = styled.div`
  display: flex;
  justify-content: center;
  @media ${device.TabletPortrait} {
    flex-direction: column;
  }
  #profileIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
  #profileNickname {
    font-weight: bold;
    font-size: 30px;
    margin: 5px;
  }
  #profileEmail {
    font-size: 20px;
    margin: 5px;
  }
`;

const MyPageIconBlock = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 40px;
  border-radius: 50%;
  background-color: ${blockColor};
`;
const MyPageProfileButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  font-size: 20px;
  background-color: #2e7d32;
  border: none;
  border-radius: 5px;
  color: #fff;
  :hover {
    transform: scale(1.1);
  }
`;
const MyPageMenuWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10%;
  font-size: 20px;
  ul li {
    cursor: pointer;
    margin: 0 15px;
    float: left;
    padding-bottom: 4px;
    border-bottom: 2px solid
      ${(props) => (props.check === 1 ? pointColor : "none")};
    @media ${device.TabletPortrait} {
    }
  }
`;

const editBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalBodyWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const ConfirmButton = styled.button`
  background-color: #2e7d32;
  color: #fff;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
`;

const CancelButton = styled.button`
  background-color: #fff;
  color: #2e7d32;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  padding: 5px 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin: 30px auto;
  padding: 5px 0px;
  // border-radius: 5px;
  // background-color: #fff;
`;

const LackMessage = styled.button`
  background-color: #f0df00;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const NormalMessage = styled.button`
  background-color: #43a047;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const TooMuchMessage = styled.button`
  background-color: #c94c4c;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-weighit: bold;
  font-size: 28px;
  margin-bottom: 25px;
`;

const LikeListStyle = styled.div`
  .total {
    background-color: transparent;
    border: transparent;
    z-index: 2;
    position: absolute;
    text-align: left;
    margin: 1% auto;
    .icon {
      color: red;
      margin-left: 300%;
      :hover {
        transform: scale(1.3);
        cursor: pointer;
      }
    }
  }
  img {
    width: 200px;
    height: 200px;
    display: block;
    margin: auto;
    border-radius: 20px;
  }
`;
const ShareBoardLikeListStyle = styled.div`
  .total {
    background-color: transparent;
    border: transparent;
    z-index: 2;
    position: absolute;
    text-align: left;
    margin: 1% auto;
    .icon {
      color: red;
      margin-left: 50%;
      :hover {
        transform: scale(1.3);
        cursor: pointer;
      }
    }
  }
  img {
    width: 200px;
    height: 200px;
    display: block;
    margin: auto;
    border-radius: 20px;
  }
`;
export {
  Container,
  MyPageMenuWrapper,
  MyPageProfileWrapper,
  MyPageIconBlock,
  MyPageProfileBlock,
  MyPageProfileButton,
  editBox,
  ModalBodyWrapper,
  ButtonWrapper,
  ConfirmButton,
  CancelButton,
  MessageWrapper,
  LackMessage,
  NormalMessage,
  TooMuchMessage,
  Title,
  LikeListStyle,
  ShareBoardLikeListStyle
};
