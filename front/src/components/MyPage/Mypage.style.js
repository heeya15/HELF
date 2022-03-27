import styled from 'styled-components';
import { blockColor, device, pointColor } from '../../style/variables';

const MyPageProfileWrapper = styled.div`
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
const MyPageProfileBlock = styled.div`
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

const MyPageIconBlock = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 40px;
  border-radius: 50%;
  background-color: ${blockColor};
`;
const MyPageProfileButton = styled.button`
  margin: 5px;
  margin-top: 20px;
  font-size: 20px;
  background-color: ${blockColor};
  border-radius: 5px;
  color: #000;
`;
const MyPageMenuWrapper = styled.div`
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

const editBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalBodyWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const ConfirmButton = styled.button`
  background-color: #2E7D32;
  color: #fff;
  border: 2px solid #2E7D32;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  `;
  
  const CancelButton = styled.button`
  background-color: #fff;
  color: #2E7D32;
  border: 2px solid #2E7D32;
  border-radius: 10px;
  padding: 5px 10px;
  `;

export {
  MyPageMenuWrapper,
  MyPageProfileWrapper,
  MyPageIconBlock,
  MyPageProfileBlock,
  MyPageProfileButton,
  editBox,
  ModalBodyWrapper,
  ButtonWrapper,
  ConfirmButton,
  CancelButton,
};
