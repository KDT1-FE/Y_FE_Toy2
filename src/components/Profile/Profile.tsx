import styled from "styled-components";

import { BsPencilFill, BsPlusCircle } from "react-icons/bs";

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
const ProfileInfoWrap = styled.div`
  width: 1200px;

  padding: 90px 75px 36px 150px;

  margin-bottom: 96px;
`;
const ProfileInfoImgWrap = styled.div`
  position: relative;

  margin-bottom: 20px;
`;
const ProfileInfoImg = styled.div`
  width: 154px;
  height: 154px;

  border-radius: 50%;

  background-image: url("https://images.pexels.com/photos/18968296/pexels-photo-18968296.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ProfileInfoEditBtn = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid #bfbfbf;

  position: absolute;
  left: 110px;
  bottom: 0;

  cursor: pointer;
  background-color: #fff;
`;
const ProfileInfoContents = styled.div`
  width: 100%;

  padding: 16px 0px;
`;
const ProfileInfoUserNameWrap = styled.div`
  font-size: 16px;
  font-weight: bold;

  margin-bottom: 16px;
`;
const ProfileInfoUserIntroWrap = styled.div`
  font-size: 14px;

  margin-bottom: 24px;
`;
const ProfileInfoUserTagsWrap = styled.div`
  button {
    margin-right: 10px;
  }
`;
const Tag = styled.span`
  padding: 3px 9px;

  text-align: center;

  border-radius: 15px;

  background-color: #ebebeb;

  font-size: 12px;
  color: #464646;
`;
const ProfileFeedContainer = styled.div`
  width: 1200px;
  border-top: 2px solid #e1e1e1;
  padding-top: 46px;
`;
const ProfileFeedImageWrap = styled.div`
  width: 100%;

  display: flex;
  gap: 26px;
  flex-wrap: wrap;
`;
const ProfileFeedImage = styled.div`
  width: 280px;
  height: 350px;

  background-image: url("https://images.pexels.com/photos/18968296/pexels-photo-18968296.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ProfileFeedEditImage = styled.div`
  width: 280px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #d9d9d9;

  cursor: pointer;
`;
function Profile() {
  return (
    <ProfileContainer>
      <ProfileHeaderImg></ProfileHeaderImg>
      <ProfileBodyContainer>
        <ProfileInfoWrap>
          <ProfileInfoImgWrap>
            <ProfileInfoImg>
              <ProfileInfoEditBtn>
                <BsPencilFill color="#BEBEBE" />
              </ProfileInfoEditBtn>
            </ProfileInfoImg>
          </ProfileInfoImgWrap>
          <ProfileInfoContents>
            <ProfileInfoUserNameWrap>
              <span>user.name</span>
            </ProfileInfoUserNameWrap>
            <ProfileInfoUserIntroWrap>
              <span>user.introText</span>
            </ProfileInfoUserIntroWrap>
            <ProfileInfoUserTagsWrap>
              <Tag>전시</Tag>
            </ProfileInfoUserTagsWrap>
          </ProfileInfoContents>
        </ProfileInfoWrap>
        <ProfileFeedContainer>
          <ProfileFeedImageWrap>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedImage></ProfileFeedImage>
            <ProfileFeedEditImage>
              <BsPlusCircle color="#BEBEBE" size="50"></BsPlusCircle>
            </ProfileFeedEditImage>
          </ProfileFeedImageWrap>
        </ProfileFeedContainer>
      </ProfileBodyContainer>
    </ProfileContainer>
  );
}

export default Profile;
