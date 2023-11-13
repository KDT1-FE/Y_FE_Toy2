import styled from "styled-components";
import { BsFillCameraFill } from "react-icons/bs";
import InputStyle from "../../style/InputStyle";
import StyledButton from "../../style/ButtonStyle";
import { useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import Modal from "react-modal";
import useUserData from "./useUserData";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useApi from "../../hooks/useApi";
import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";

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

    font-family: "Pretendard";
    font-size: 16px;
  }
`;
const ProfileEditButtonWrap = styled.div`
  text-align: center;
`;
const ModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0"
  },
  content: {
    width: "50%",
    height: "50%",

    zIndex: "100",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    borderRadius: "10px",

    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto"
  }
};
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

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    userData?.backgroundImgUrl
  );
  const [profileImageUrl, setProfileImageUrl] = useState(
    userData?.profileImgUrl
  );

  //////////////////////////////////////////////////
  const { getData, postData, patchData } = useApi();
  const { accessToken } = useContext(AuthContext);
  const [isState, setIsState] = useState(false);
  useEffect(() => {
    if (isState) {
      const 함수명 = async () => {
        try {
          // const res = await getData("https://fastcampus-chat.net/users");
          const res = await patchData("https://fastcampus-chat.net/user", {
            name: name,
            picture: backgroundImageUrl
          });

          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      함수명();
    }
  }, [accessToken, isState]);
  ///////////////////////////////

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
      console.log("맞음");
    } else {
      alert("잘못된 접근입니다.");
      window.location.href = `/profiles/${userid}`;
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

  // const uploadImage = (e) => {
  //   const file = e.target.files[0];
  //   const storage = getStorage();
  //   const storageRef = ref(storage, 'profile-images/' + file.name);

  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log('Uploaded a file:', snapshot);

  //     getDownloadURL(snapshot.ref).then((downloadURL) => {
  //       console.log('File available at', downloadURL);
  //       setProfileImageUrl(downloadURL); // 이 URL을 state에 저장하여 나중에 사용
  //     });
  //   });
  // };
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

    // const user = {
    //   id: {user.id},
    //   name: {user.name},
    //   profileImgUrl:
    //     "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2FdefaultProfileImg.jpg?alt=media&token=4cd53e01-4bc1-404e-ba10-c29a4638e53d",
    //   backgroundImgUrl:
    //     "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2FdefaultBackgroundImg.png?alt=media&token=50349c73-07e3-44e2-abeb-b3be14cdcc11",
    //   introText: "",
    //   hobby: []
    // };
    // const userRef = doc(db, "Users", userData.id);
    // setDoc(userRef, user, { merge: true })

    const copyHobbyArray: string[] = [];

    hobbyArray.forEach((hobby) => {
      if (hobby.isClick) {
        copyHobbyArray.push(hobby.hobbyName);
      }
    });

    const updateUser = {
      ...userData,
      name: name,
      introText: introText,
      profileImgUrl: profileImageUrl,
      backgroundImgUrl: backgroundImageUrl,
      hobby: copyHobbyArray
    };

    if (userData) {
      const userRef = doc(db, "Users", userData.id);
      setIsState(true);
      setDoc(userRef, updateUser, { merge: true }).then(() => {
        window.location.href = `/profiles/${userid}`;
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
            <span>태그</span>
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
