import React from 'react';
import ShareBoardList from '../../components/ShareBoard/ShareBoardList'
import ShareBoardTopLike from '../../components/ShareBoard/ShareBoardTopLike'
import { Title } from './ShareBoard.style'

export default function ShareBoard() {
  return (
    <div>
      <Title>식단 공유 게시판</Title>
      <ShareBoardTopLike/>
      <ShareBoardList/>
    </div>
  );
}

