import React from 'react';
import * as S from '../../styles/profile/UserProfile.styled';
import { UserData } from '../../utils/utils';
import Hashtag from '../home/Hashtag';

function UserProfile({
  userData,
  flag,
  onChangeState,
}: {
  userData: UserData;
  flag: string;
  onChangeState: () => void;
}) {
  const { name, image, language, level, hashtags, intro } = userData;

  const handleButton = () => {
    onChangeState();
  };

  return (
    <S.ProfileContainer>
      <S.EditButton type="button" onClick={handleButton}>
        수정하기
      </S.EditButton>
      <S.Top>
        <S.UserImage image={image} />
        <S.Right>
          <S.UserName>{name}</S.UserName>
          <S.Language>
            <S.Label>관심 언어</S.Label>
            <S.UserLanguage>
              <S.Flag flag={flag} />
              {language}
            </S.UserLanguage>
            <S.UserLevel>Lv.{level}</S.UserLevel>
          </S.Language>
        </S.Right>
      </S.Top>
      <S.Middle>
        <div>관심사</div>
        <S.UserHashtag>
          {hashtags &&
            hashtags.map((hashtag: string) => <Hashtag hashtag={hashtag} />)}
        </S.UserHashtag>
      </S.Middle>
      <S.Bottom>
        <div>소개</div>
        <S.UserIntro>{intro}</S.UserIntro>
      </S.Bottom>
    </S.ProfileContainer>
  );
}

export default UserProfile;
