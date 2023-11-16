import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import ProfileFeed from "./ProfileFeed";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useState, useEffect, useContext } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Modal from "react-modal";

import { theme, darkTheme } from "../../../style/theme";
import StyledButton from "../../../style/ButtonStyle";
import useUserData from "../useUserData";
import { ThemeContext } from "../../../App";

const ProfileContainer = styled.div`
  width: 100%;

  position: relative;
`;
const ProfileHeaderImg = styled.div`
  width: 100%;
  height: 350px;

  position: relative;

  background-image: url("https://images.pexels.com/photos/3974145/pexels-photo-3974145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 190px;
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
    width: "40%",
    height: "500px",

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
const TitleText = styled.div`
  text-align: center;

  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;

  margin-bottom: 20px;
`;
const ModalAddFeedContainer = styled.div`
  display: flex;
  gap: 16px;

  padding: 64px;
  input {
    width: 100%;
    color: black;
  }
`;
const ModalAddFeedPreview = styled.div`
  width: 100%;
  height: 100%;

  background-image: url("https://images.pexels.com/photos/18968296/pexels-photo-18968296.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ModalAddFeedLeftContainer = styled.div`
  flex: 1 0 140px;
  width:140px;
  height:175px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const ModalAddFeedRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:100%;
  span {
    color: ${({ theme }) => (theme === darkTheme ? "black" : "white")};
    font-size: 24px;
    display: block;
    font-size: 18px;
    margin-bottom: 15px;
    margin-top:20px;
  }

  textarea {
    width: 100%;
    height: 220px;

    padding: 20px;

    resize: none;

    border-radius: 10px;

    box-sizing: border-box;

    color: #999696;
    border-color: #BFBFBF;

    font-family: "Pretendard";
    font-size: 16px;
  }
  textarea:focus {
    border-color: ${theme.blueColor};
    outline: none;
  }
`;
const ModalAddFeedWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin-right: 16px;

    &:last-of-type {
      background-color: #efefef;
    }
    &:last-of-type:hover {
      background-color: #ddd;
    }
  }
`;

function Profile() {
  const [modalPreview, setModalPreview] = useState(
    "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2Fdefault.jpg?alt=media&token=81c126bd-3510-457d-b049-281a66b6f286"
  );

  const { userData, feedData, fetchData } = useUserData();

  const [isModalShow, setIsModalShow] = useState(false);

  const [isProfileMatchingLogin, setIsProfileMatchingLogin] = useState(false);
  const [context, setContext] = useState("");

  const loginId = sessionStorage.getItem("userId");

  const [feedImageFile, setFeedImageFile] = useState<File | null>(null);

  const { theme } = useContext(ThemeContext);
  console.log(theme);
  useEffect(() => {
    if (userData) {
      if (loginId == userData.id) {
        setIsProfileMatchingLogin(true);
      } else {
        setIsProfileMatchingLogin(false);
      }
    }
  }, [userData]);
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleModalPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFeedImageFile(file);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          setModalPreview(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleChangeContext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };
  const handleClickAddFeed = () => {
    const feedId = Object.keys(feedData ? feedData : []).length;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);
    const hours = `0${currentDate.getHours()}`.slice(-2);
    const minutes = `0${currentDate.getMinutes()}`.slice(-2);

    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

    if (feedImageFile) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Feeds/${userData?.id}/${feedId ? feedId + 1 : 1}`
      );

      uploadBytes(storageRef, feedImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const Feed = {
            id: userData?.id,
            feedId: feedId ? feedId + 1 : 1,
            feedImageUrl: downloadURL,
            contentText: context,
            likes: 0,
            timeStamp: formattedDate
          };

          if (userData) {
            if (Feed.feedId == 1) {
              const cityRef = doc(db, "Feeds", userData.id);
              setDoc(cityRef, {
                [`${Feed.feedId}`]: Feed
              }).then(() => {
                fetchData();
                setIsModalShow(false);
              });
            } else {
              const cityRef = doc(db, "Feeds", userData.id);
              updateDoc(cityRef, {
                [`${Feed.feedId}`]: Feed
              }).then(() => {
                fetchData();
                setIsModalShow(false);
              });
            }
          }
        });
      });
    } else {
      alert("사진을 등록해주세요.");
    }
  };
  return (
    <ProfileContainer>
      <Modal
        isOpen={isModalShow}
        style={ModalStyle}
        onRequestClose={() => setIsModalShow(false)}
      >
        <TitleText theme={theme}>피드 등록</TitleText>
        <ModalAddFeedContainer>
          <ModalAddFeedLeftContainer>
            <ModalAddFeedPreview
              style={{ backgroundImage: `url(${modalPreview})` }}
            ></ModalAddFeedPreview>
          </ModalAddFeedLeftContainer>
          <ModalAddFeedRightContainer theme={theme}>
            <span>파일</span>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleModalPreview}
            />
            <span>본문</span>
            <div className="textarea-wrap">
            <textarea
              value={context}
              placeholder="내용"
              onChange={handleChangeContext}
            ></textarea>
            </div>
            <ModalAddFeedWrap>
              <StyledButton
                backgroundColor="red"
                size="s"
                onClick={handleClickAddFeed}
              >
                등록
              </StyledButton>
              <StyledButton
                backgroundColor="white"
                size="s"
                onClick={() => {
                  setIsModalShow(false);
                }}
              >
                취소
              </StyledButton>
            </ModalAddFeedWrap>
          </ModalAddFeedRightContainer>
        </ModalAddFeedContainer>
      </Modal>

      <ProfileHeaderImg
        style={{ backgroundImage: `url(${userData?.backgroundImgUrl})` }}
      ></ProfileHeaderImg>

      <ProfileBodyContainer>
        <ProfileInfo
          userData={userData}
          isProfileMatchingLogin={isProfileMatchingLogin}
        ></ProfileInfo>
        <ProfileFeed
          feedData={feedData}
          isModalShow={isModalShow}
          setIsModalShow={setIsModalShow}
          isProfileMatchingLogin={isProfileMatchingLogin}
        ></ProfileFeed>
      </ProfileBodyContainer>
    </ProfileContainer>
  );
}

export default Profile;
