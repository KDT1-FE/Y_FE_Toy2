import React, { useState, useEffect } from 'react';
import * as S from '../../styles/home/User.styled';
import Hashtag from './Hashtag';
import { UserData } from '../../utils/utils';
import UserModal from './UserModal';

function User({ data, onlineUser }: { data: UserData; onlineUser: string[] }) {
  const [modal, setModal] = useState(false);
  const [online, setOnline] = useState(false);
  const { name, image, level, hashtags, intro, id } = data;

  const handleModal = () => {
    setModal((prevState) => !prevState);
  };

  useEffect(() => {
    const index = onlineUser.findIndex((userId) => userId === id);
    setOnline(index !== -1);
  }, []);

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
