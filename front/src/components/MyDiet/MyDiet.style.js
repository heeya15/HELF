import styled from "styled-components";

const DietDiaryItemWrapper = styled.div`
  margin: 20px auto;
  width: 70%;
`;

const addButton = {
  backgroundColor: "#56A75F",
  color: "#fff",
};

const ShareButton = styled.button`
  color: #fff;
  background-color: #3c86dd;
  border: none;
  padding: 5px 15px;
  border-radius: 20px;
  :hover {
    transform: scale(1.1);
  }
`;

const SharedButton = styled.button`
  color: #fff;
  background-color: #808080;
  border: none;
  padding: 5px 15px;
  border-radius: 20px;
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: #b22222;
  :hover {
    transform: scale(1.1);
  }
`;

const DietDiaryItem = styled.div`
  margin: 20px auto;
  padding: 30px 30px;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
`;

const TotalKcal = styled.div`
  font-size: 30px;
  margin-top: 40px;
`;

const DiaryList = styled.div`
  @media (max-width: 425px) {
    width: 80%;
    textalign: "center";
  }
`;
const shareBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "300px",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const DescriptionArea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px #bdbdbd;
  font-family: KOTRA_GOTHIC;
  overflow: visible;
  text-overflow: ellipsis;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
  }
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
  font-family: 'KOTRA_BOLD-Bold';
`;
  
const CancelButton = styled.button`
  background-color: #fff;
  color: #2e7d32;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  font-family: 'KOTRA_BOLD-Bold';
`;

const Bold = styled.span`
  font-weight: 900;
`;

const DiaryItemWrapper = styled.div``;

const DiaryItemLeftWrapper = styled.div`
  text-align: left;
`;

const DiaryItemRightWrapper = styled.div`
  text-align: right;
`;

const DiaryImg = styled.img`
  width: 300px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
  @media (max-width: 767px) {
    width: 160px;
    height: 130px;
    margin: 0 auto;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 200px;
    height: 160px;
    margin: 0 auto;
  }
`;

const DiaryTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin: 0;
`;

const DiaryTime = styled.p`
  margin: 0;
`;

const DiaryKcal = styled.p``;

const DiaryDesc = styled.p``;

const fontNormal = {
  fontFamily: "KOTRA_GOTHIC",
};

const fontBold = {
  fontFamily: "KOTRA_BOLD-Bold",
};

const MenuTitle = styled.div`
  font-size: 40px;
  margin: 40px 0;
  font-family: "KOTRA_BOLD-Bold";
  @media (max-width: 1200px) {
    font-size: 30px;
  }
`;

const modalTitle = {
  fontSize: "40px",
  fontFamily: "KOTRA_BOLD-Bold",
};

export {
  DietDiaryItemWrapper,
  addButton,
  ShareButton,
  SharedButton,
  DiaryList,
  DietDiaryItem,
  TotalKcal,
  DeleteButton,
  shareBox,
  DescriptionArea,
  ButtonWrapper,
  ConfirmButton,
  CancelButton,
  Bold,
  DiaryItemWrapper,
  DiaryItemLeftWrapper,
  DiaryItemRightWrapper,
  DiaryImg,
  DiaryTitle,
  DiaryTime,
  DiaryKcal,
  DiaryDesc,
  fontNormal,
  fontBold,
  MenuTitle,
  modalTitle,
};
