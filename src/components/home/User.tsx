import React, { useState } from 'react';
import * as S from '../../styles/home/User.styled';
import Hashtag from './Hashtag';
import { UserData } from '../../utils/utils';
import UserModal from './UserModal';

function User({ data }: { data: UserData }) {
  const [modal, setModal] = useState(false);
  const { name, image, level, hashtags, intro, online } = data;

  const handleModal = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <S.Card onClick={handleModal}>
      {modal && <UserModal userData={data} onCloseModal={handleModal} />}
      <S.Image image={image} />
      <S.Status online={online} />
      <S.Info>
        <S.User>
          <S.Name>{name}</S.Name>
          <S.Level>Lv.{level}</S.Level>
        </S.User>
        <S.Hashtags>
          {hashtags &&
            hashtags.map((hashtag: string) => <Hashtag hashtag={hashtag} />)}
        </S.Hashtags>
        <S.Intro>{intro}</S.Intro>
      </S.Info>
    </S.Card>
  );
}

export default User;
