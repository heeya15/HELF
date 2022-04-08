import styled from "styled-components";
import { FormGroup } from "@mui/material";

const TotalStyle = styled.div`
  margin-top: 2%;
  border-radius: 10px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  .imageSelect {
    margin-top: 2%;
    margin-left: 1%;
    background-color: #e0e0e0;
    padding: 3px;
    border-radius: 7px;
    width: 18%;
    border: none;
    :hover {
      cursor: pointer;
    }
    @media (max-width: 1200px) {
      font-size: 10px;
    }
  }
`;

const MenuTitle = styled.div`
  font-size: 50px;
  @media (max-width: 1200px) {
    font-size: 30px;
  }
  margin: 40px 0px 0px 0px;
  font-family: "KOTRA_BOLD-Bold";
`;

const ImageThumbnail = styled.img`
  width: 80%;
  height: 80%;
  display: block;
  border-radius: 20px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  // opacity: 0.8;
  min-width: 340px;
`;

const RegisterReq = styled.div`
  margin-top: 5%;
  margin-right: 5%;
  text-align: left;
  margin-bottom: 5%;
`;

const MealTypeButton = styled.div`
  button {
    margin-right: 2%;
    color: #272727;
    background-color: #b3dfa8;
    border: none;
    border-radius: 30px;
    width: 60%;
    max-width: 120px;
    @media (max-width: 1200px) {
      font-size: 10px;
    }
  }
  .active {
    background-color: #56a75f;
    color: #fff;
  }
`;

const Description = styled.textarea`
  color: #272727;
  // background-color: #b3dfa8;
  background-color: #f2f7f4;
  // box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
  resize: vertical;
  width: 100%;
  overflow: visible;
  text-overflow: ellipsis;
  padding: 10px;
  font-family: "KOTRA_GOTHIC";
  :focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  margin-top: 3%;
  margin-bottom: 5%;
  padding: 6px 20px;
  color: #fff;
  background-color: #2E7D32;
  font-size: 18px;
  border: 3px solid #2E7D32;
  border-radius: 20px;
  // width: 10%;
  :hover {
    transform: scale(1.1);
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const ButtonGroup = styled.div`
  margin: 0 auto;
  @media (max-width: 1200px) {
    text-align: right;
  }
`;

const UpdateCancelButton = styled.button`
  margin-top: 2%;
  margin-bottom: 3%;
  padding: 5px 0px;
  color: #fff;
  // background-color: #f0df00;
  background-color: #2E7D32;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  width: 80px;
  margin-left: 1%;
  :hover {
    transform: scale(1.1);
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const BackButton = styled.button`
  margin-top: 3%;
  margin-bottom: 5%;
  padding: 6px 10px;
  color: #2E7D32;
  background-color: #fff;
  font-size: 18px;
  border: 3px solid #2E7D32;
  border-radius: 20px;
  // width: 10%;
  margin-right: 1%;
  :hover {
    transform: scale(1.1);
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

const Titles = styled.div`
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1%;
  margin-top: 4%;
`;

const FoodCheckButton = styled.button`
  font-size: 12px;
  float: right;
  // border: 1px solid grey;
  border-radius: 3px;
  padding: 3px 5px;
  background-color: #9eb0a2;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const foodcheckBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const StyledFormGroup = styled(FormGroup)`
  height: 500px;
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

export {
  TotalStyle,
  MenuTitle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
  FoodCheckButton,
  foodcheckBox,
  ButtonGroup,
  StyledFormGroup,
  UpdateCancelButton,
};
