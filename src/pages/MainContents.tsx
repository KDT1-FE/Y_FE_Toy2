import styled from "styled-components";
import Carousel from "../components/Main/Carousel";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PcMannerScore from "../assets/images/pc_mannerscore.webp";
import ArrowChevron from "../assets/images/arrow-chevron.svg";
import GuideDesktop from "../assets/images/guide-desktop.webp";

interface ProfileI {
  name: string;
  introText: string;
  id: string;
  hobby: string[];
  backgroundImgUrl: string;
  profileImgUrl: string;
}

function MainContents() {
  const [profile, setProfile] = useState<ProfileI[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const querySnapshot = await getDocs(usersCollection);

        const profileData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            introText: data.introText || "",
            hobby: data.hobby || [],
            backgroundImgUrl: data.backgroundImgUrl || "",
            profileImgUrl: data.profileImgUrl || ""
          };
        });
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Wrapper>
      <Carousel />
      <FirstContent>
        <div className="inner">
          <TextSection>
            <span className="small-title">프로필</span>
            <span className="title">
              함께 할 멤버들의
              <br /> 취향 미리보기
            </span>
            <span className="text">
              프로필 사진, 자기소개, 관심사, 피드 등<br /> 취향으로 가득한
              멤버들의 프로필로 <br />
              나와 취향이 통하는지 확인할 수 있어요.
            </span>
          </TextSection>
          <img src={PcMannerScore} alt="이미지" />
        </div>
      </FirstContent>
      <SecondContent>
        <div className="inner">
          <TextSection>
            <span className="small-title">프로필</span>
            <span className="title">
              나와 비슷한
              <br /> 관심사를 가진 멤버들
            </span>
            <Gallery>
              {profile &&
                profile.slice(0, 6).map((item) => (
                  <GalleryItem to={`/profiles/${item.id}`}>
                    <Photo>
                      <div className="photo-inner">
                        <img src={item.profileImgUrl} alt="프로필" />
                      </div>
                    </Photo>
                    <UserInfo>
                      <div className="userName">{item.name}</div>
                      <div className="userInfo">{item.introText}</div>
                      <div className="hobby">
                        {item.hobby.slice(0, 5).map((h, index) => (
                          <div key={index}>{h}</div>
                        ))}
                      </div>
                    </UserInfo>
                  </GalleryItem>
                ))}
            </Gallery>
            <MoreInfoBtn to={"/profiles"}>
              더보기 <img src={ArrowChevron} alt="화살표" />
            </MoreInfoBtn>
          </TextSection>
        </div>
      </SecondContent>
      <ThirdContent>
        <div className="inner">
          <img src={GuideDesktop} alt="이미지" />
          <div className="title-wrap">
            <p className="tit">
              언제나 어디서나
              <br /> 관심사로 연결되는 새로운 세상
            </p>
            <p className="text">취미메이트에서 취향이 통하는 친구를 만나요.</p>
            <p className="btn-wrap">
              <MoreInfoBtn to={"/chat"} className="left">
                채팅하기 <img src={ArrowChevron} alt="화살표" />
              </MoreInfoBtn>
            </p>
          </div>
        </div>
      </ThirdContent>
    </Wrapper>
  );
}

export default MainContents;

const Wrapper = styled.div`
  width: 100%;
`;
const FirstContent = styled.div`
  background-color: white;
  .inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 5rem 0;
    display: flex;
    flex-direction: row;
    gap: 8rem;
    justify-content: center;
    align-items: center;
  }
  img {
    max-width: 300px;
  }
`;
const SecondContent = styled.div`
  background-color: #f4f4f4;
  .inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-left: -5px;
  margin-right: -5px;
  margin-top: 2em;
`;
const GalleryItem = styled(Link)`
  background-color: white;
  padding: 1em;
  border-radius: 2em;
  display: inline-flex;
  align-items: center;
  gap: 1em;
  margin: 0 5px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #373535;
`;
const Photo = styled.div`
  flex: 1 0 30%;
  max-width: 30%;
  .photo-inner {
    width: 7em;
    height: 7em;
    background-color: #ff9999;
    border-radius: 1em;
    overflow: hidden;
  }
  img {
    max-width: 100%;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  flex: 1 0 70%;
  max-width: 70%;
  .hobby {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 1em;
    div {
      font-size: 0.8em;
      margin-right: 5px;
      margin-top: 5px;
      border-radius: 1em;
      padding: 0.5em 0.7em;
    }
  }
  .hobby div:nth-child(odd) {
    background-color: #f4f4f4;
    color: #999696;
  }
  .hobby div:nth-child(even) {
    background-color: #feebea;
    color: #f43630;
  }
  .userName {
    width: 90%;
    font-size: 0.8em;
    font-weight: 700;
    margin-bottom: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #373535;
  }
  .userInfo {
    width: 90%;
    font-size: 0.8em;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #373535;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
  .small-title {
    font-size: 1em;
    font-weight: 600;
    color: #f43630;
  }
  .title {
    font-size: 2.3rem;
    font-weight: 700;
    line-height: 2.6rem;
    color: #373535;
  }
  .text {
    font-size: 1rem;
    color: #5d5d5d;
    line-height: 1.4em;
  }
`;

const ThirdContent = styled.div`
  background-color: #e6e1e1;
  .inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    gap: 8rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
  }
  .title-wrap {
    .tit {
      font-size: 2.3rem;
      font-weight: 700;
      line-height: 2.6rem;
      color: #373535;
    }
    .text {
      font-size: 1rem;
      color: #5d5d5d;
      line-height: 1.4em;
      margin-top: 2em;
    }
    .btn-wrap {
      margin-top: 2em;
    }
  }
  img {
    max-width: 250px;
  }
`;

const MoreInfoBtn = styled(Link)`
  display: block;
  text-decoration: none;
  width: 10em;
  height: 3em;
  text-align: center;
  line-height: 3em;
  background-color: white;
  color: #373535;
  border: 1px solid #f4f4f4;
  border-radius: 5em;
  font-weight: 500;
  margin: 0 auto;
  cursor: pointer;
  &.left {
    margin-left: 0;
  }
`;
