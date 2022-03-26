import styled from 'styled-components';
import { blockColor, device, pointColor } from '../../style/variables';

const MypageProfileWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid gray;
  max-width: 800px;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  @media ${device.TabletPortrait} {
    padding: 10px;
  }
`;
const MypageProfileBlock = styled.div`
  display: flex;
  justify-content: center;
  @media ${device.TabletPortrait} {
    flex-direction: column;
  }
  #profileIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
  #profileNickname {
    font-weight: bold;
    font-size: 30px;
    margin: 5px;
  }
  #profileEmail {
    font-size: 20px;
    margin: 5px;
  }
`;

const MypageIconBlock = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 40px;
  border-radius: 50%;
  background-color: ${blockColor};
`;
const MypageProfileButton = styled.div`
  margin: 5px;
  margin-top: 20px;
  button {
    font-size: 20px;
    background-color: ${blockColor};
    border-radius: 5px;
    color: white;
  }
`;
const MypageMenuWrapper = styled.div`
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
      ${props => (props.check === 1 ? pointColor : 'none')};
    @media ${device.TabletPortrait} {
    }
  }
`;

export {
  MypageMenuWrapper,
  MypageProfileWrapper,
  MypageIconBlock,
  MypageProfileBlock,
  MypageProfileButton,
};
