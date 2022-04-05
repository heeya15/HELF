import styled from "styled-components";

const DetailReq = styled.div`
  margin-top: 5%;
  margin-right: 5%;
  text-align: left;
  margin-bottom: 5%;
`;

const UpdateButton = styled.button`
  margin-top: 2%;
  margin-bottom: 3%;
  padding: 5px 0px;
  color: #fff;
  background-color: #dbc925;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 10%;
  :hover {
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
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

const MealTimeDetail = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const FoodTableTitle = styled.div`
  font-size: 17px;
  margin-left: 5%;
  margin-top: 5%;
`;

const FoodListStyle = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flew-wrap: nowrap;
  height: 320px;
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
  DetailReq,
  UpdateButton,
  BackButton,
  MealTimeDetail,
  FoodTableTitle,
  FoodListStyle,
};
