import styled from "styled-components";

import { BsPlusCircle } from "react-icons/bs";

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

interface feed {
  id: string;
  feedId: number;
  feedImageUrl: string;
  contentText: string;
  likes: number;
  timeStamp: string;
  commentList?: object;
}
interface feedData {
  [key: string]: feed;
}
function ProfileFeed(props: {
  feedData: feedData | null;
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileMatchingLogin: boolean | null;
}) {
  return (
    <ProfileFeedContainer>
      <ProfileFeedImageWrap>
        {props.isProfileMatchingLogin ? (
          <ProfileFeedEditImage
            onClick={() => {
              props.setIsModalShow(true);
            }}
          >
            <BsPlusCircle color="#BEBEBE" size="50"></BsPlusCircle>
          </ProfileFeedEditImage>
        ) : null}
        {props.feedData
          ? Object.values(props.feedData).map((feed, index) => (
              <ProfileFeedImage
                key={index}
                style={{
                  backgroundImage: `url(${feed.feedImageUrl})`
                }}
              />
            ))
          : null}
      </ProfileFeedImageWrap>
    </ProfileFeedContainer>
  );
}

export default ProfileFeed;
