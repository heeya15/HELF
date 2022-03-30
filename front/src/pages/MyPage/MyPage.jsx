import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyPageContent, MyPageHeader, MyPageWrapper } from "./MyPage.style";
import { Block, Layout, Wrapper } from "../../style/variables";
import MyPageProfile from "../../components/MyPage/MyPageProfile";
import Nutrition from "../../components/MyPage/Statistics/Nutrition";
import ExerciseHistory from "../../components/MyPage/Statistics/ExerciseHistory";

export default function MyPage() {
  return (
    <Layout>
      <Wrapper>
        <Block>
          <MyPageWrapper>
            <MyPageHeader>
              <MyPageProfile />
            </MyPageHeader>
            <MyPageContent>
              {/* <MypageMenu /> */}
              {/* <div className="poster">
                
              </div> */}
              <Nutrition></Nutrition>
              <ExerciseHistory></ExerciseHistory>
            </MyPageContent>
          </MyPageWrapper>
        </Block>
      </Wrapper>
    </Layout>
  );
}
