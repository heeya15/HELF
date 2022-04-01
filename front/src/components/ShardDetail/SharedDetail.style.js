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

const Description = styled.div`
  padding : 1rem;
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
const CommentBox = styled.input`
  padding : 1rem;
  color: #272727;
  background-color: #9F9F9F;
  border: none;
  border-radius: 10px;
  resize: vertical;
  height : 2rem;
  width: 100%;
  overflow: visible;
  text-overflow: ellipsis;
  
  :focus {
    outline: none;
  }
`;

const CommentBoxBig = styled.div`
  padding-top : 0.5rem;
  padding-right : 0.5rem;
  padding-left : 0.5rem;
  color: #272727;
  background-color: #ECECEC;
  border: none;
  border-radius: 10px;
  resize: vertical;
  width: 100%;
  height : 20rem;
  overflow: visible;
  text-overflow: ellipsis;
  :focus {
    outline: none;
  }
`;

const UpdatdButton = styled.button`
  margin-top: 2%;
  color: #fff;
  background-color: #DBC925;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
  margin-left: 2%;
`;
const ListButton = styled.button`
  margin-top: 2%;
  color: #fff;
  background-color: #69C63E;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
`;
const SendButton = styled.button`
  color: #fff;
  background-color: #69C63E;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
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

export {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  UpdatdButton,
  ListButton,
  BackButton,
  Titles,
  Description,
  ImageThumbnail,
  CommentBox,
  CommentBoxBig,
  SendButton
};
