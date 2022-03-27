import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MyPageContent, MyPageHeader, MyPageWrapper } from './MyPage.style';
import { Block, Layout, Wrapper } from '../../style/variables';
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import { MY_PAGE_REQUEST } from '../../store/modules/myPage';

export default function MyPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: MY_PAGE_REQUEST,
    })
  })

  
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
              <div className="poster">
                
              </div>
            </MyPageContent>
          </MyPageWrapper>
        </Block>
      </Wrapper>
    
    </Layout>
  );
}
