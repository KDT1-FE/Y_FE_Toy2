import React, { useState, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { userState } from '../../atoms';
import * as S from '../../styles/profile/EditProfile.styled';
import { UserData, addImage, updateData } from '../../utils/utils';

function EditProfile({
  userId,
  userData,
  onChangeState,
}: {
  userId: string;
  userData: UserData;
  onChangeState: () => void;
}) {
  const { name, image, language, level, hashtags, intro } = userData;
  const [imgPath, setImgPath] = useState(image);
  const [imgFile, setImgFile] = useState<File>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState(name);
  const [newLanguage, setNewLanguage] = useState(language);
  const [newLevel, setNewLevel] = useState(level);
  const [newTags, setNewTags] = useState(hashtags);
  const [newIntro, setNewIntro] = useState(intro);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUserState, setNewUserState] = useRecoilState(userState);
  let USERDATA = JSON.parse(newUserState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) {
      toast.error('정보 수정 중입니다!');
      return;
    }

    setIsSubmitting((prevState) => !prevState);

    let imageURL: string | undefined;
    if (imgFile) {
      imageURL = await addImage(imgFile as File);
    }

    await updateData(userId, {
      image: imageURL || image,
      name: newName,
      language: newLanguage,
      level: newLevel,
      hashtags: newTags,
      intro: newIntro,
    });

    USERDATA = {
      ...USERDATA,
      name: newName || name,
      picture: imageURL || image,
    };

    setNewUserState(JSON.stringify(USERDATA));

    setIsSubmitting((prevState) => !prevState);
    onChangeState();
  };

  const handleCancel = () => {
    onChangeState();
  };

  const handleImagePreview = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      setImgFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPath(reader.result as string);
      };
    }
  };

  const handleName = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewName(event.target.value);
  };

  const handleLanguage = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewLanguage(event.target.value);
  };

  const handleLevel = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewLevel(event.target.value);
  };

  const handleTags = (event: { target: { value: string } }) => {
    const newTags = event.target.value
      ?.match(/#[^\s#]+/g)
      ?.map((newTag) => newTag.slice(1));
    if (newTags) {
      setNewTags(newTags);
    } else {
      setNewTags([]);
    }
  };

  const handleIntro = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewIntro(event.target.value);
  };

  return (
    <S.ProfileContainer>
      <S.SaveButton type="submit" onClick={handleSubmit}>
        저장하기
      </S.SaveButton>
      <S.CancelButton type="button" onClick={handleCancel}>
        취소하기
      </S.CancelButton>
      <S.Top>
        <S.ImageLabel image={imgPath}>
          <S.InputFile
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleImagePreview}
            ref={imgRef}
          />
        </S.ImageLabel>
        <S.Right>
          <S.UserName defaultValue={name} onChange={handleName} />
          <S.Language>
            <S.Label>관심 언어</S.Label>
            <S.SelectLanguage defaultValue={language} onChange={handleLanguage}>
              <option aria-label="English" id="newLanguage" value="English">
                영어
              </option>
              <option aria-label="Japanese" id="newLanguage" value="Japanese">
                일본어
              </option>
              <option aria-label="Chinese" id="newLanguage" value="Chinese">
                중국어
              </option>
              <option aria-label="Spanish" id="newLanguage" value="Spanish">
                스페인어
              </option>
              <option aria-label="French" id="newLanguage" value="French">
                프랑스어
              </option>
              <option aria-label="German" id="newLanguage" value="German">
                독일어
              </option>
              <option
                aria-label="Vietnamese"
                id="newLanguage"
                value="Vietnamese"
              >
                베트남어
              </option>
              <option aria-label="Thai" id="newLanguage" value="Thai">
                태국어
              </option>
            </S.SelectLanguage>
            <S.SelectLevel defaultValue={level} onChange={handleLevel}>
              <option aria-label="1" id="newLevel" value="1">
                1
              </option>
              <option aria-label="2" id="newLevel" value="2">
                2
              </option>
              <option aria-label="3" id="newLevel" value="3">
                3
              </option>
            </S.SelectLevel>
          </S.Language>
        </S.Right>
      </S.Top>
      <S.Middle>
        <div>관심사</div>
        <S.UserHashtag
          defaultValue={`#${hashtags && hashtags.join(' #')}`}
          onChange={handleTags}
        />
      </S.Middle>
      <S.Bottom>
        <div>소개</div>
        <S.UserIntro
          defaultValue={intro}
          name="newIntro"
          onChange={handleIntro}
        />
      </S.Bottom>
    </S.ProfileContainer>
  );
}

export default EditProfile;
