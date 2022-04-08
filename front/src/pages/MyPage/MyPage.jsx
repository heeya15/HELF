import React from 'react';
import { 
  MyPageWrapper,
  MyPageContent, 
  MyPageHeader,
  BlockWrapper,
  Title,
} from './MyPage.style';
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import NutritionHistory from '../../components/MyPage/Statistics/NutritionHistory';
import WeightHistory from '../../components/MyPage/Statistics/WeightHistory';
import ExerciseHistory from '../../components/MyPage/Statistics/ExerciseHistory';
import { Row, Col } from 'react-bootstrap';
import MyPageLike from '../../components/MyPage/MyPageLike';

export default function MyPage() {
  return (
    <MyPageWrapper>
        <Title>MY페이지</Title>
        <MyPageHeader>
          <MyPageProfile/>
        </MyPageHeader>
        <MyPageContent>
          <MyPageLike/>
          <Row >
            <Col md='6' style={{ marginBottom: '20px' }}>
              <BlockWrapper>
                <WeightHistory/>
              </BlockWrapper>
            </Col>
            <Col md='6' style={{ marginBottom: '20px' }}>
              <BlockWrapper>
                <NutritionHistory/>
              </BlockWrapper>
            </Col>
          </Row>
          <Row>
            <Col>
              <BlockWrapper>
                <ExerciseHistory/>
              </BlockWrapper>
            </Col>
          </Row>
        </MyPageContent>
    </MyPageWrapper>
  );
}
