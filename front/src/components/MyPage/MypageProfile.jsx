import React from 'react';
import {
  MypageIconBlock,
  MypageProfileWrapper,
  MypageProfileBlock,
  MypageProfileButton,
} from './Mypage.style';
import { MdStar, MdPerson, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function MypageProfile() {
  const { me } = useSelector(state => state.mypage);
  return (
    <MypageProfileWrapper>
      <div>
        <MypageProfileBlock>
          <div id="profileIcon">
            <MypageIconBlock>
              { <MdPerson />}
            </MypageIconBlock>
          </div>
          <div>
            <div id="profilId">{me.memberId}</div>
            <div id="profileNickname">{me.name}</div>
            <div id="profileEmail">{me.email}</div>
            <MypageProfileButton>
              <button>
                <Link to="/mypage/wltnals">회원 수정</Link>
              </button>
            </MypageProfileButton>
          </div>
        </MypageProfileBlock>
      </div>
    </MypageProfileWrapper>
  );
}
