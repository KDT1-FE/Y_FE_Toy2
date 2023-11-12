import React from 'react';
import * as S from '../../styles/home/User.styled';
import Hashtag from './Hashtag';
import { UserData } from '../../utils/utils';

function User({ data }: { data: UserData }) {
  const { name, image, level, hashtags, intro, online } = data;

  return (
    <S.Card>
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
