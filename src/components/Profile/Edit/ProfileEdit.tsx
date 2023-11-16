import styled from "styled-components";
import { BsFillCameraFill } from "react-icons/bs";
import InputStyle from "../../../style/InputStyle";
import StyledButton from "../../../style/ButtonStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import Modal from "react-modal";
import useUserData from "../useUserData";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import useApi from "../../../hooks/useApi";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/useAuth";
import axios from "axios";

const ProfileEditContainer = styled.div`
  width: 100%;

  padding: 122px 0px;

  display: flex;
  justify-content: center;
  button {
    font-family: "Pretendard";
  }
`;
const ProfileEditFormContainer = styled.div`
  width: 850px;
`;

const ProfileHeaderImg = styled.div`
  width: 100%;
  height: 342px;

  position: relative;

  background-image: url("https://images.pexels.com/photos/3974145/pexels-photo-3974145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ProfileHeaderImgEditBtn = styled.label`
  position: absolute;
  right: 31px;
  bottom: 26px;

  color: #c7c7c7;
  background-color: #fff;

  border: 1px solid #c7c7c7;
  border-radius: 30px;

  padding: 9px 33px;
  font-size: 12px;
  cursor: pointer;

  svg {
    vertical-align: middle;
    margin-right: 10px;
  }
`;
const ProfileEditBodyWrap = styled.form`
  position: relative;

  padding-top: 184px;
`;

const ProfileInfoImg = styled.div`
  width: 209px;
  height: 209px;

  position: absolute;
  left: 35px;
  top: -84px;
  border-radius: 50%;

  background-image: url("https://images.pexels.com/photos/18968296/pexels-photo-18968296.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ProfileInfoEditBtn = styled.label`
  width: 53px;
  height: 53px;

  border-radius: 50%;
  border: 1px solid #bfbfbf;

  position: absolute;
  left: 146px;
  bottom: 0;

  cursor: pointer;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileEditInputWrap = styled.div`
  margin-bottom: 46px;
  span {
    font-size: 20px;
    font-weight: 700;
  }
  input {
    width: 100%;

    margin-top: 16px;

    font-family: "Pretendard";
  }
  textarea {
    width: 100%;
    height: 400px;

    margin-top: 16px;

    padding: 24px 29px;

    resize: none;

    border-radius: 10px;

    box-sizing: border-box;

    color: #999696;
    border-color: #BFBFBF;

    font-family: "Pretendard";
    font-size: 16px;
  }
`;
const ProfileEditButtonWrap = styled.div`
  text-align: center;
`;
const ProfileEditTagWrap = styled.div`
  margin-bottom: 46px;
  span {
    font-size: 20px;
    font-weight: 700;

    display: block;

    margin-bottom: 16px;
  }
  button {
    margin-right: 4px;
    margin-bottom: 8px;
  }
`;
function Profile() {
  const { userid } = useParams<string>();
  const loginId = sessionStorage.getItem("userId");
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    userData?.backgroundImgUrl
  );
  const [profileImageUrl, setProfileImageUrl] = useState(
    userData?.profileImgUrl
  );

  const { patchData } = useApi();
  const { accessToken, refreshToken, setAccessToken } = useContext(AuthContext);
  const [isState, setIsState] = useState(false);

  const refreshAccessToken = async () => {
    const REFRESH_TOKEN_API_URL = "https://fastcampus-chat.net/refresh";
    try {
      const response = await axios.post(REFRESH_TOKEN_API_URL, {
        refreshToken
      });
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isState) {
      const patchApi = async () => {
        await patchData("https://fastcampus-chat.net/user", {
          name: name,
          picture: profileImageUrl
        });
      };
      patchApi();
      refreshAccessToken();
    }
  }, [accessToken, isState]);

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setBackgroundImageFile(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          setBackgroundImageUrl(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          setProfileImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (userid == loginId) {
      return;
    } else {
      alert("잘못된 접근입니다.");
      navigate(`/profiles/${userid}`);
    }
  }, [userid]);

  useEffect(() => {
    if (userData) {
      setBackgroundImageUrl(userData?.backgroundImgUrl);
      setProfileImageUrl(userData?.profileImgUrl);
      setName(userData?.name);
      setIntroText(userData?.introText);
      setHobbyArray((prevHobbyArray) => {
        return prevHobbyArray.map((hobby) => {
          if (userData?.hobby.includes(hobby.hobbyName)) {
            return { ...hobby, isClick: true };
          }
          return hobby;
        });
      });
      setActivityArray((prevActiviyArray) => {
        return prevActiviyArray.map((acitivity) => {
          if (userData?.hobby.includes(acitivity.activityName)) {
            return { ...acitivity, isClick: true };
          }
          return acitivity;
        });
      });
      setIsState(false);
    }
  }, [userData]);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const [name, setName] = useState(userData?.name || "");
  const [introText, setIntroText] = useState(userData?.introText || "");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleIntroTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroText(e.target.value);
  };

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null
  );

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (profileImageFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `Users/${userid}/${userid}ProfileImage`);

      uploadBytes(storageRef, profileImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setProfileImageUrl(downloadURL);
        });
      });
    }

    if (backgroundImageFile) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Users/${userid}/${userid}BackgroundImage`
      );

      uploadBytes(storageRef, backgroundImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setBackgroundImageUrl(downloadURL);
        });
      });
    }

    const copyTagArray: string[] = [];

    hobbyArray.forEach((hobby) => {
      if (hobby.isClick) {
        copyTagArray.push(hobby.hobbyName);
      }
    });

    activityArray.forEach((activity) => {
      if (activity.isClick) {
        copyTagArray.push(activity.activityName);
      }
    });

    const updateUser = {
      ...userData,
      name: name,
      introText: introText,
      profileImgUrl: profileImageUrl,
      backgroundImgUrl: backgroundImageUrl,
      hobby: copyTagArray
    };

    if (userData) {
      const userRef = doc(db, "Users", userData.id);
      setIsState(true);
      setDoc(userRef, updateUser, { merge: true }).then(() => {
        navigate(`/profiles/${userid}`);
      });
    }
  };
  const [hobbyArray, setHobbyArray] = useState([
    {
      hobbyName: "보드게임",
      isClick: false
    },
    {
      hobbyName: "사진",
      isClick: false
    },
    {
      hobbyName: "드로잉",
      isClick: false
    },
    {
      hobbyName: "공예",
      isClick: false
    },
    {
      hobbyName: "댄스",
      isClick: false
    },
    {
      hobbyName: "노래",
      isClick: false
    },
    {
      hobbyName: "글쓰기",
      isClick: false
    },
    {
      hobbyName: "방탈출",
      isClick: false
    },
    {
      hobbyName: "봉사활동",
      isClick: false
    },
    {
      hobbyName: "영상",
      isClick: false
    },
    {
      hobbyName: "게임",
      isClick: false
    },
    {
      hobbyName: "음악감상",
      isClick: false
    },
    {
      hobbyName: "악기연주",
      isClick: false
    },
    {
      hobbyName: "캘리그리피",
      isClick: false
    },
    {
      hobbyName: "반려동물",
      isClick: false
    },
    {
      hobbyName: "만화",
      isClick: false
    }
  ]);
  const [activityArray, setActivityArray] = useState([
    {
      activityName: "등산",
      isClick: false
    },
    {
      activityName: "산책",
      isClick: false
    },
    {
      activityName: "다이어트",
      isClick: false
    },
    {
      activityName: "러닝",
      isClick: false
    },
    {
      activityName: "배드민턴",
      isClick: false
    },
    {
      activityName: "클라이밍",
      isClick: false
    },
    {
      activityName: "필라테스",
      isClick: false
    },
    {
      activityName: "축구",
      isClick: false
    },
    {
      activityName: "헬스",
      isClick: false
    },
    {
      activityName: "볼링",
      isClick: false
    },
    {
      activityName: "야구",
      isClick: false
    },
    {
      activityName: "요가",
      isClick: false
    },
    {
      activityName: "수영",
      isClick: false
    },
    {
      activityName: "서핑",
      isClick: false
    },
    {
      activityName: "자전거",
      isClick: false
    },
    {
      activityName: "다이빙",
      isClick: false
    },
    {
      activityName: "농구",
      isClick: false
    },
    {
      activityName: "골프",
      isClick: false
    },
    {
      activityName: "플로깅",
      isClick: false
    },
    {
      activityName: "풋살",
      isClick: false
    }
  ]);
  const handleHobbySelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHobbyArray(
      hobbyArray.map((hobby) => {
        if (hobby.hobbyName == e.currentTarget.innerText) {
          const isClick = !hobby.isClick;
          return { ...hobby, isClick: isClick };
        }
        return hobby;
      })
    );
  };
  const handleActivitySelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActivityArray(
      activityArray.map((activity) => {
        if (activity.activityName == e.currentTarget.innerText) {
          const isClick = !activity.isClick;
          return { ...activity, isClick: isClick };
        }
        return activity;
      })
    );
  };
  return (
    <ProfileEditContainer>
      <ProfileEditFormContainer>
        <ProfileHeaderImg
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <ProfileHeaderImgEditBtn htmlFor="input-backgroundImage-file">
            <BsFillCameraFill size="20" />
            배경 설정
          </ProfileHeaderImgEditBtn>

          <input
            type="file"
            id="input-backgroundImage-file"
            accept="image/jpeg, image/png"
            onChange={handleBackgroundImageChange}
            style={{ display: "none" }}
          />
        </ProfileHeaderImg>

        <ProfileEditBodyWrap>
          <ProfileInfoImg
            style={{ backgroundImage: `url(${profileImageUrl})` }}
          >
            <ProfileInfoEditBtn htmlFor="input-profile-file">
              <BsFillCameraFill size="25" color="#BEBEBE" />
            </ProfileInfoEditBtn>
            <input
              type="file"
              id="input-profile-file"
              accept="image/jpeg, image/png"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </ProfileInfoImg>

          <ProfileEditInputWrap>
            <span>이름</span>
            <br />
            <InputStyle
              type="text"
              value={name}
              placeholder="이름"
              onChange={handleNameChange}
            ></InputStyle>
          </ProfileEditInputWrap>
          <ProfileEditInputWrap>
            <span>자기소개</span>
            <br />
            <textarea
              value={introText}
              placeholder="자기소개"
              onChange={handleIntroTextChange}
            ></textarea>
          </ProfileEditInputWrap>
          <ProfileEditTagWrap>
            <span>취미</span>
            {hobbyArray.map((hobby, index) => (
              <StyledButton
                key={index}
                backgroundColor={hobby.isClick ? "red" : "white"}
                size="s"
                onClick={handleHobbySelect}
              >
                {hobby.hobbyName}
              </StyledButton>
            ))}
          </ProfileEditTagWrap>
          <ProfileEditTagWrap>
            <span>액티비티</span>
            {activityArray.map((activity, index) => (
              <StyledButton
                key={index}
                backgroundColor={activity.isClick ? "red" : "white"}
                size="s"
                onClick={handleActivitySelect}
              >
                {activity.activityName}
              </StyledButton>
            ))}
          </ProfileEditTagWrap>
          <ProfileEditButtonWrap>
            <StyledButton backgroundColor="red" size="m" onClick={handleSave}>
              저장
            </StyledButton>
          </ProfileEditButtonWrap>
        </ProfileEditBodyWrap>
      </ProfileEditFormContainer>
    </ProfileEditContainer>
  );
}

export default Profile;
