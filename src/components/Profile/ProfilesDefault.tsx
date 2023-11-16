import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const BodyContainer = styled.div`
  max-width:1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 100px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  * {
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;
  }
`;

const UserContainer = styled.div<UserContainerProps>`
  position: relative;
  width: 555px;
  height: 465px;
  padding-bottom: 56px;
  cursor: pointer;
  .backgroundImg {
    height: 30%;

    background-image: ${(props) => `url(${props.backgroundUrl})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    border-radius: 24px 24px 0px 0px;
  }

  .profileImgWrap {
    position: absolute;
    width: 100%;
    left: 20px;
    z-index: 20;

    .img {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-image: ${(props) => `url(${props.profileUrl})`};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .name {
      position: absolute;
      top: 25px;
      left: 120px;
      font-size: 20px;
      font-weight: 700;
      color: #383535;
    }
  }

  .contentWrap {
    height: 70%;
    padding-top: 72px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 0px 0px 24px 24px;
    background-color: white;

    .introText {
      height: 90px;
      font-size: 18px;
      font-weight: 500;
      color: #999696;
      margin-bottom: 40px;
    }

    .tagsWrap {
      display: flex;
      .tags {
        width: 100px;
        height: 40px;

        padding: 3px 9px;
        text-align: center;
        border-radius: 20px;
        background-color: #feebea;
        font-size: 12px;
        font-weight: 700;
        color: #f43630;

        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
    }
  }
`;

interface ProfileI {
  name: string;
  introText: string;
  id: string;
  hobby: string[];
  backgroundImgUrl: string;
  profileImgUrl: string;
}

interface UserContainerProps {
  backgroundUrl: string;
  profileUrl: string;
}

function ProfilesDefault(): JSX.Element {
  const [profiles, setProfiles] = useState<ProfileI[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
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
        setProfiles(profileData);
      } catch (error) {
        alert("패치오류");
      }
    };

    fetchProfiles();
  }, []);

  return (
    <BodyContainer>
      <ProfileContainer>
        {profiles.map((profile) => (
          <Link to={`/profiles/${profile.id}`} key={profile.id}>
            <UserContainer
              backgroundUrl={profile.backgroundImgUrl}
              profileUrl={profile.profileImgUrl}
              key={profile.id}
            >
              <div className="backgroundImg"></div>
              <div className="profileImgWrap">
                <div className="img"></div>
                <span className="name">{profile.name}</span>
              </div>

              <div className="contentWrap">
                <div className="introText">{profile.introText}</div>
                <div className="tagsWrap">
                  {profile.hobby.map((tag, index) => (
                    <div className="tags" key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </UserContainer>
          </Link>
        ))}
      </ProfileContainer>
    </BodyContainer>
  );
}

export default ProfilesDefault;
