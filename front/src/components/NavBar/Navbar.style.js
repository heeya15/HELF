import styled from 'styled-components';
import { device, pointColor } from '../../style/variables';

const NavbarMain = styled.div`
  height: 50%;
  display: flex;
  @media ${device.TabletPortrait} {
    height: 100%;
  }
`;
const LeftMenu = styled.div`
  opacity: 0;
  font-size: 40px;
  display: flex;
  align-items: center;

  color: white;
  @media ${device.TabletPortrait} {
    opacity: 1;
  }
  width: 30%;
  #drawer {
    margin-left: 0.8em;
  }
`;
const CenterMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-top: 20px;
    width: 400px;
  }
  @media ${device.TabletPortrait} {
    img {
      margin-top: 5px;
      width: 300px;
    }
  }
  width: 50%;
`;
const RightMenu = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 20px;
  color: white;
  width: 30%;
  #name {
    margin-right: 20px;
  }
`;
const NavbarSubBlock = styled.div`
  display: flex;
  justify-content: center;
  @media ${device.TabletPortrait} {
    display: none;
  }
  height: 40%;
`;
const SubMenu = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
`;
const MenuBlock = styled.li`
  color: ${props => (props.check === '1' ? 'white' : 'gray')};
  margin: 20px;
  text-align: center;
  float: left;
  &:hover {
    color: white;
    font-size: bold;
    transform: scale(1.1);
  }
  &.on {
    color: red;
  }
`;
const NavbarWrapper = styled.div`
  height: 20vh;
  @media ${device.TabletPortrait} {
    height: 10vh;
  }
`;

const DrawerListRow = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  .name {
    font-weight: bold;
  }
  .color {
    &:hover {
      color: ${pointColor};
      font-weight: bold;
    }
  }
`;

export {
  NavbarWrapper,
  NavbarMain,
  CenterMenu,
  LeftMenu,
  RightMenu,
  NavbarSubBlock,
  SubMenu,
  DrawerListRow,
  MenuBlock,
};
