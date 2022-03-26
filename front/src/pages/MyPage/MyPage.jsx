import React, { useEffect } from 'react';
import { MypageContent, MypageHeader, MypageWrapper } from './Mypage.style';
import { Block, Layout, Wrapper } from '../../style/variables';
import MypageProfile from '../../components/MyPage/MypageProfile';
export default function MyPage() {
  return (
    <Layout>
    
      <Wrapper>
        <Block>
          <MypageWrapper>
            <MypageHeader>
              <MypageProfile />
            </MypageHeader>
            <MypageContent>
              {/* <MypageMenu /> */}
              <div className="poster">
                
              </div>
            </MypageContent>
          </MypageWrapper>
        </Block>
      </Wrapper>
    
    </Layout>
  );
}
