import React from "react";
import { MyPageContent, MyPageHeader } from "./MyPage.style";
import { Block, Layout, Wrapper } from "../../style/variables";
import MyPageProfile from "../../components/MyPage/MyPageProfile";
import Nutrition from "../../components/MyPage/Statistics/Nutrition";
import WeightHistory from "../../components/MyPage/Statistics/WeightHistory";
import ExerciseHistory from "../../components/MyPage/Statistics/ExerciseHistory";
import { Row, Col } from "react-bootstrap";
import MyPageLike from "../../components/MyPage/MyPageLike";

export default function MyPage() {
  return (
    <Layout>
      <Wrapper>
        <Block>
          <MyPageHeader>
            <MyPageProfile />
          </MyPageHeader>
          <MyPageContent>
            <MyPageLike></MyPageLike>
            <hr />
            <Row>
              <Col>
                <WeightHistory></WeightHistory>
              </Col>
              <Col>
                <Nutrition></Nutrition>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <ExerciseHistory></ExerciseHistory>
              </Col>
            </Row>
          </MyPageContent>
        </Block>
      </Wrapper>
    </Layout>
  );
}
