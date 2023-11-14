import React, { useEffect } from 'react';
import * as S from '../../styles/home/ListProfile.styled';
import { UserData } from '../../utils/utils';
import Hashtag from './Hashtag';
import closeIcon from '../../assets/close-icon.png';

function UserProfile({
  userData,
  onCloseModal,
}: {
  userData: UserData;
  onCloseModal: () => void;
}) {
  const { name, image, language, level, hashtags, intro } = userData;
  let flag;

  switch (language) {
    case 'English':
      flag = '/flag/eng.png';
      break;
    case 'Japanese':
      flag = '/flag/jpn.png';
      break;
    case 'Chinese':
      flag = '/flag/cn.png';
      break;
    case 'Spanish':
      flag = '/flag/es.png';
      break;
    case 'French':
      flag = '/flag/fr.png';
      break;
    case 'German':
      flag = '/flag/de.png';
      break;
    case 'Vietnamese':
      flag = '/flag/vn.png';
      break;
    case 'Thai':
      flag = '/flag/tp.png';
      break;
  }

  const handleModal = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  return (
    <S.ProfileContainer onClick={handleModal}>
      <S.Close image={closeIcon} onClick={onCloseModal} />
      <S.Top>
        <S.UserImage image={image} />
        <S.Right>
          <S.UserInfo>
            <S.UserName>{name}</S.UserName>
            <S.SendMessage>메시지 보내기</S.SendMessage>
          </S.UserInfo>
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
