import styled from "styled-components";

const TotalStyle = styled.div`
  margin-top: 5%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
  `;
  
  const ImageThumbnail = styled.img`
  width: 80%;
  height: 100%;
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
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
  padding : 1rem;
  color: #272727;
  background-color: #f2f7f4;
  font-family: 'KOTRA_GOTHIC';
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
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

// 음식 리스트 스크롤
const FoodListStyle = styled.div`
  margin: 20px 0px;
  overflow-x: hidden;
  overflow-y: auto;
  flew-wrap: nowrap;
  height: 200px;
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

// 댓글 영역
const CommentHeader = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #272727;
  border: none;
  background-color: #f2f7f4;
`;
const CommentBoxBig = styled.div`
  padding-top : 0.5rem;
  padding-right : 0.5rem;
  padding-left : 0.5rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #272727;
  background-color: #f2f7f4;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  resize: vertical;
  width: 100%;
  height : 20rem;
  overflow-x: hidden;
  overflow-y: auto;
  flew-wrap: nowrap;
  height: 300px;
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

// 댓글 입력 줄 Wrapper
const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;
  
// 댓글 입력 창
const CommentBox = styled.input`
  padding : 1rem;
  color: #272727;
  height : 2.5rem;
  background-color: #d2e4d9 ;
  font-family: 'KOTRA_GOTHIC';
  border: none;
  border-radius: 10px;
  resize: vertical;
  width: 90%;
  overflow: visible;
  text-overflow: ellipsis;

  :focus {
    outline: none;
}
`;

// 댓글 등록 버튼
const SendButton = styled.button`
  color: #fff;
  padding: 5px 25px;
  background-color: #1e2f23;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
`;

// 입력된 댓글 영역
  
// 댓글 목록 돌아가기 버튼
const ListButton = styled.button`
  margin-top: 2%;
  margin-bottom: 3%;
  padding: 5px 0px;
  color: #fff;
  background-color: #56a75f;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
  :hover {
    transform: scale(1.1);
  }
`;
  
// 댓글 수정 버튼
const UpdateButton = styled.button`
  // margin: 2% auto;
  padding: 3px 15px;
  color: #fff;
  background-color: #DBC925;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  // margin-left: 2%;
  :hover {
    transform: scale(1.1);
  }
`;
  
// 댓글 삭제 버튼
const DeleteButton = styled.button`
  margin-top: 2%;
  margin-bottom: 3%;
  padding: 5px 0px;
  color: #fff;
  background-color: #db2525;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
  margin-left: 2%;
  :hover {
    transform: scale(1.1);
  }
`;

const CommentDeleteBtn = styled.span`
  margin-top: 1%;
  margin-left: 1rem;
  color: #fff;
  background-color: #db2525;
  font-size: 17px;
  border: none;
  border-radius: 30px;
  height: 10%;
  width: 5%;
`;

const CommentUpdateButton = styled.span`
  margin-top: 1%;
  margin-left: 0.2rem;
  color: #fff;
  background-color: #DBC925;
  font-size: 17px;
  border: none;
  border-radius: 30px;
  height: 10%;
  width: 5%;

`;
const Titles = styled.div`
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1%;
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
`;
const CommentTitles = styled.div`
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1%;
  margin-top: 1%;
`;

const LikeListStyle = styled.div`
  .total {
    background-color: transparent;
    border: transparent;
    z-index: 2;
    position: absolute;
    text-align: center;
    margin: 0 auto;

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

export {
  TotalStyle,
  RegisterReq,
  MealTypeButton,
  UpdateButton,
  ListButton,
  DeleteButton,
  Titles,
  Description,
  ImageThumbnail,
  CommentBox,
  CommentHeader,
  CommentBoxBig,
  SendButton,
  CommentDeleteBtn,
  CommentTitles,
  CommentUpdateButton,
  CommentWrapper,
  FoodListStyle,
  LikeListStyle,
};
