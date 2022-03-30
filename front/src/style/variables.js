import styled from 'styled-components';

// Values

// Colors

export const blockColor = '#D8FFD0'; // 연한 녹색
export const pointColor = 'green';

export const primaryColor = 'black';
export const secondaryColor = 'white';

// 각 테마별 배경색과 글씨색
export const roomColor = {
  green: { background: '#D8FFD8', color: 'black' },
  blue: { background: '#D8F1FF', color: 'black' },
  pink: { background: '#FFD8FB', color: 'black' },
  red: { background: '#FFDAD8', color: 'black' },
  yellow: { background: '#EFF8BD', color: 'black' },
  purple: { background: '#E2D8FF', color: 'black' },
  gray: { background: '#C4C4C4', color: 'white' },
};

// 스케줄 일정 버튼색
export const scheduleColor = [
  '#D8FFD8',
  '#D8F1FF',
  '#FFD8FB',
  '#FFDAD8',
  '#EFF8BD',
  '#E2D8FF',
];

// Media query breakpoints

const size = {
  MobileLandscape: '480px',
  TabletPortrait: '768px',
  TabletLandscape: '992px',
  Laptops: '1200px',
};

export const device = {
  MobileLandscape: `(max-width: ${size.MobileLandscape})`,
  TabletPortrait: `(max-width: ${size.TabletPortrait})`,
  TabletLandscape: `(max-width: ${size.TabletLandscape})`,
  Laptops: `(max-width: ${size.Laptops})`,
};

// Layout components

export const Layout = styled.div`
  position: relative;
  min-height: 600px;
  height: 100vh;
  background-size: cover;
  @media ${device.TabletPortrait} {
    background: none;
  }
`;
export const Wrapper = styled.div`
  height: 90%;
  @media ${device.TabletPortrait} {
    height: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Block = styled.div`
  max-width: 1200px;
  width: 70%;
  height: 100%;

  border-radius: 10px;
  @media ${device.TabletPortrait} {
    border-radius: 0px;
    width: 100%;
  }
`;
