import styled from "styled-components";

const TotalStyle = styled.div`
  box-shadow: 5px 5px #e0e0e0;
  width: 50%;
  margin: 5% auto;
  background-color: #a3cca3;
  font-size: 20px;
  border-radius: 30px;
  input {
    border-radius: 10px;
    border: none;
    text-align: center;
    width: 60%;
    :focus {
      outline: none;
    }
  }
  select {
    border-radius: 10px;
    outline: 0 none;
    cursor: pointer;
    border: none;
    width: 60%;
    text-align: center;
  }
`;

const StartButton = styled.button`
  box-shadow: 3px 3px #e0e0e0;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #56a75f;
`;

export { TotalStyle, StartButton };
