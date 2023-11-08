import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import ProfileFeed from "./ProfileFeed";

const ProfileContainer = styled.div`
  width: 100%;

  position: relative;
`;
const ProfileHeaderImg = styled.div`
  width: 100%;
  height: 492px;

  position: relative;

  background-image: url("https://images.pexels.com/photos/3974145/pexels-photo-3974145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ProfileHeaderImgEditBtn = styled.button`
  width: 154px;
  height: 36px;

  position: absolute;
  right: 43px;
  bottom: 32px;

  color: #c7c7c7;
  background-color: #fff;

  border: 1px solid #c7c7c7;
  border-radius: 30px;

  padding: 9px 33px;
  cursor: pointer;
`;
const ProfileBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 50px;
  padding-bottom: 190px;
`;

function Profile() {
  return (
    <ProfileContainer>
      <ProfileHeaderImg></ProfileHeaderImg>
      <ProfileBodyContainer>
        <ProfileInfo></ProfileInfo>
        <ProfileFeed></ProfileFeed>
      </ProfileBodyContainer>
    </ProfileContainer>
  );
}

export default Profile;
