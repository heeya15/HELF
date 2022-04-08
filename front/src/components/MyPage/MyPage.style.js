import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Slider from "react-slick";
import { blockColor, device, pointColor } from "../../style/variables";

const Container = styled.div`
  width: 90vw;
  // max-width: 900px;
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
  @media screen and (max-width: 481px) {
    width: 95vw;
  }
`;

const MyPageProfileBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const MyPageIconBlock = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 40px;
  border-radius: 50%;
  background-color: ${blockColor};
`;

const MyPageProfileEditButton = styled.button`
  margin-top: 25px;
  padding: 5px 10px;
  font-size: 17px;
  background-color: #2e7d32;
  border: 3px solid #2e7d32;
  border-radius: 5px;
  color: #fff;
  :hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 481px) {
    font-size: 14px;
  }
`;

const MyPageProfileDeleteButton = styled.button`
  margin-top: 25px;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 17px;
  background-color: #c94c4c;
  border: 3px solid #c94c4c;
  border-radius: 5px;
  color: #fff;
  :hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 481px) {
    font-size: 14px;
  }
`;

const DeleteButton = styled.button`
  margin-top: 80px;
  margin-left: 2px;
  margin-right: 2px;
  padding: 4px 12px;
  font-size: 15px;
  background-color: #fff;
  border: 3px solid #1e2f23;
  border-radius: 5px;
  color: #1e2f23;
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

/** custom css start */
const Title = styled.div`
  font-weighit: bold;
  font-size: 28px;
  margin-bottom: 25px;
  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

const EmptyText = styled.div`
  padding: 100px 0px;
  @media screen and (max-width: 480px) {
    padding: 60px 0px;
  }
`;

const Description = styled.div`
  font-size: 13px;
  margin-top: 10px;
  font-family: "KOTRA_GOTHIC";
`;

const fontNormal = {
  fontFamily: "KOTRA_GOTHIC",
};

/** 마이페이지 상단 프로필 */
const MyPageProfileWrapper = styled.div`
  background-color: #f2f7f4;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ProfileImage = styled.img`
  border-radius: 20px;
  width: 60%;
  height: 60%;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 90%;
  }
`;

const UserInfo = styled.div`
  margin-left: 15px;
  text-align: left;
`;

const NameInfo = styled.div`
  font-size: 40px;
`;

const BirthdayInfo = styled.div`
  font-size: 25px;
  margin-top: 20px;
  word-break: break-word;
`;

const EmailInfo = styled.div`
  font-size: 25px;
  word-break: break-word;
`;

const PhysicalInfo = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const editBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  '@media (max-width: 480px)': {
    width: '95%',
  },
};

const editInput = {
  backgroundColor: "#fff",
};

/** Modal */
const modalTitle = {
  fontFamily: "KOTRA_BOLD-Bold",
  fontSize: "36px",
};

const modalBody = {
  fontFamily: "KOTRA_GOTHIC",
  fontSize: "16px",
};

const fontBold = {
  fontFamily: "KOTRA_BOLD-Bold",
};

const ModalBodyWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
  font-family: KOTRA_BOLD-Bold;
`;

const ConfirmButton = styled.button`
  width: 70px;
  background-color: #2e7d32;
  color: #fff;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  padding: 5px 10px;
  margin-left: 10px;
  :hover {
    transform: scale(1.1);
  }
`;

const CancelButton = styled.button`
  width: 70px;
  background-color: #fff;
  color: #2e7d32;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  padding: 5px 10px;
  :hover {
    transform: scale(1.1);
  }
`;

/** 찜 목록 */
const StyledSilder = styled(Slider)`
  .slick-prev::before {
    // background-color: #000;
    content: url("https://cdn-icons-png.flaticon.com/16/271/271220.png");
  }
  .slick-next::before {
    content: url("https://cdn-icons-png.flaticon.com/16/271/271228.png");
  }
`;

const LikeListStyle = styled.div`
  .total {
    background-color: transparent;
    border: transparent;
    z-index: 2;
    position: absolute;
    text-align: center;
    margin: 1% auto;

    .icon {
      position: absolute;
      z-index: 2;
      color: red;
      @media screen and (max-width: 1280px) {
        margin-left: 20px;
      }
      @media screen and (min-width: 1281px) and (max-width: 1800px) {
        margin-left: 60px;
      }
      @media screen and (min-width: 1801px) {
        margin-left: 90px;
      }
      :hover {
        transform: scale(1.3);
        cursor: pointer;
      }
    }
  }
  img {
    width: 210px;
    height: 210px;
    display: block;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
  }
`;

/** 체중 기록 */
const ButtonGroup = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
`;

const weightEditInput = {
  width: '130px',
  marginLeft: '10px',
};

const WeightButton = styled.button`
  margin-top: 20px;
  margin-left: 2px;
  margin-right: 2px;
  padding: 2px 10px;
  font-size: 15px;
  background-color: #1e2f23;
  border: 3px solid #1e2f23;
  border-radius: 5px;
  color: #fff;
  :hover {
    transform: scale(1.1);
  }
`;

/* 영양 성분 통계 */
const MessageWrapper = styled.div`
  // margin: 0 auto;
  padding: 5px 0px;
`;

const DatePickerWrapper = styled.div`
  @media screen and (max-width: 481px) {
    .react-datepicker-wrapper>.react-datepicker__input-container input {
    /* all: unset !important; */
        width: 100% !important;
    }
  }
`;

const LackMessage = styled.button`
  margin: 30px 2px 0px 2px;
  background-color: #f0df00;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const NormalMessage = styled.button`
  margin: 30px 2px 0px 2px;
  background-color: #43a047;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const TooMuchMessage = styled.button`
  margin: 30px 2px 0px 2px;
  background-color: #c94c4c;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

/* 운동 기록 */
const ReactTooltipStyled = styled(ReactTooltip)`
  &.place-right {
    background-color: white;
    color: black;
    font-size: 10px;
  }
`;

const ExerciseHistoryTotal = styled.div`
  margin-bottom: 5%;
  .line {
    display: block;
    font-size: 0;
  }
  .cell {
    @media screen and (max-width: 768px) {
      height: 5px;
      width: 5px;
    }
    @media screen and (min-width: 769px) and (max-width: 1308px) {
      height: 10px;
      width: 10px;
    }
    @media screen and (min-width: 1309px) {
      height: 15px;
      width: 15px;
    }
    border-radius: 2px;
    margin: 1px;
    font-size: 10px;
    display: inline-grid;
  }
  .months {
    font-size: 10px;

    margin-right: 4%;
    @media screen and (max-width: 1308px) {
      width: 650px;
    }
    @media screen and (min-width: 1309px) {
      width: 900px;
    }
  }
  .fill-0 {
    background-color: #ebedf0;
  }
  .fill-1 {
    background-color: #aae68a;
  }
  .fill-2 {
    background-color: rgb(113, 197, 131);
  }
  .fill-3 {
    background-color: rgb(15, 126, 61);
  }
  .fill-4 {
    background-color: rgb(10, 88, 42);
  }
  .fill-5 {
    background-color: rgb(7, 63, 29);
  }
`;

export {
  Container,
  MyPageMenuWrapper,
  MyPageProfileWrapper,
  MyPageIconBlock,
  MyPageProfileBlock,
  MyPageProfileEditButton,
  MyPageProfileDeleteButton,
  WeightButton,
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
  DeleteButton,
  ButtonGroup,
  fontNormal,
  ExerciseHistoryTotal,
  ReactTooltipStyled,
  UserInfo,
  NameInfo,
  BirthdayInfo,
  EmailInfo,
  PhysicalInfo,
  EmptyText,
  Description,
  ProfileImage,
  center,
  modalTitle,
  modalBody,
  editInput,
  fontBold,
  StyledSilder,
  weightEditInput,
  DatePickerWrapper,
};
