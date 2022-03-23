import styled from 'styled-components';
import { blockColor, device, pointColor } from '../../../style/variables';

const FindPwBlock = styled.div`
  width: 55vh;
  height: 70vh;
  background-color: ${blockColor};
  border-radius: 10px;
  @media ${device.TabletPortrait} {
    border-radius: 0px;
    width: 100%;
    height: 100%;
  }
`;
const FindPwHeader = styled.div`
  margin-top: 1em;
  height: 40%;
  flex-direction: column;
  #title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    font-size: 50px;
    font-weight: bold;
    color: ${pointColor};
  }
  #word {
    text-align: center;
    height: 20%;
    font-size: 17px;
    color: black;
  }
`;
const FindPwContent = styled.div`
  height: 50%;
`;
const FindPwContentRow = styled.div`
  input {
    display: block;
    width: 280px;
    height: 50px;
    font-size: 18px;
    margin: 12px auto;
    padding: 0 20px;
    background-color: #dfdfdf;
    border: 0;
    border-radius: 4px;
  }
  button {
    display: block;
    font-size: 18px;
    width: 320px;
    height: 50px;
    margin: 0 auto;
    border-radius: 4px;
    color: white;
    background-color: ${pointColor};
  }
`;

export { FindPwBlock, FindPwHeader, FindPwContent, FindPwContentRow };
