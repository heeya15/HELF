import styled from "styled-components";

const TotalStyle = styled.div`
  margin-top: 5%;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px gray;
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

const MealTypeButton = styled.button`
  margin-right: 2%;
  color: #272727;
  background-color: #b3dfa8;
  border: none;
  border-radius: 30px;
  width: 60%;
  max-width: 120px;
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

const Titles = styled.div`
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1%;
  margin-top: 4%;
`;

export {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  RegisterButton,
  Titles,
  Description,
  ImageThumbnail,
};
