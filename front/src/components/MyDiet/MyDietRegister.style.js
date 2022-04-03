import styled from "styled-components";

const TotalStyle = styled.div`
  margin-top: 5%;
  border-radius: 10px;
  box-shadow: 7px 7px #e0e0e0;
`;

const ImageThumbnail = styled.img`
  width: 80%;
  height: 80%;
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
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
  }
  .active {
    background-color: #56a75f;
    color: #fff;
  }
`;

const Description = styled.textarea`
  color: #272727;
  background-color: #b3dfa8;
  border: none;
  border-radius: 10px;
  resize: vertical;
  width: 100%;
  overflow: visible;
  text-overflow: ellipsis;
  :focus {
    outline: none;
  }
`;

const RegisterButton = styled.button`
  margin-top: 2%;
  color: #fff;
  background-color: #56a75f;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
`;

const BackButton = styled.button`
  margin-top: 2%;
  color: #fff;
  background-color: #db2525;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
  margin-left: 2%;
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
  border: 2px solid grey;
  border-radius: 3px;
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

export {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
  FoodCheckButton,
  foodcheckBox,
};
