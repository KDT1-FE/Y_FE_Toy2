import styled from "styled-components";

function MainContents() {
  return (
    <Wrapper>
      <Banner>메인 배너</Banner>
      <FirstContent>
        <TextSection>
          <span className="small-title">프로필</span>
          <span className="title">함께 할 멤버들의 취향 미리보기</span>
          <span className="text">
            프로필 사진, 자기소개, 관심사, 피드 등<br /> 취향으로 가득한
            멤버들의 프로필로 <br />
            나와 취향이 통하는지 확인할 수 있어요.
          </span>
        </TextSection>
        <ImgSection />
      </FirstContent>
      <SecondContent>
        <TextSection>
          <span className="small-title">프로필</span>
          <span className="title">함께 할 멤버들의 취향 미리보기</span>
          <Gallery>
            <GalleryItem>
              <Photo />
              <UserInfo>
                <div className="hobby">
                  <div>등산</div>
                  <div>요리</div>
                  <div>헬스</div>
                </div>
                <div className="userName">유저네임</div>
                <div className="userInfo">
                  자기소개는 두 줄 이상이고 또 두 줄 이상이어야 하는데..
                </div>
              </UserInfo>
            </GalleryItem>
            <GalleryItem>
              <Photo />
              <UserInfo>
                <div className="hobby">
                  <div>등산</div>
                  <div>요리</div>
                  <div>헬스</div>
                </div>
                <div className="userName">유저네임</div>
                <div className="userInfo">
                  자기소개는 두 줄 이상이고 또 두 줄 이상이어야 하는데..
                </div>
              </UserInfo>
            </GalleryItem>
            <GalleryItem>
              <Photo />
              <UserInfo>
                <div className="hobby">
                  <div>등산</div>
                  <div>요리</div>
                  <div>헬스</div>
                </div>
                <div className="userName">유저네임</div>
                <div className="userInfo">
                  자기소개는 두 줄 이상이고 또 두 줄 이상이어야 하는데..
                </div>
              </UserInfo>
            </GalleryItem>
            <GalleryItem>
              <Photo />
              <UserInfo>
                <div className="hobby">
                  <div>등산</div>
                  <div>요리</div>
                  <div>헬스</div>
                </div>
                <div className="userName">유저네임</div>
                <div className="userInfo">
                  자기소개는 두 줄 이상이고 또 두 줄 이상이어야 하는데..
                </div>
              </UserInfo>
            </GalleryItem>
          </Gallery>
          <MoreInfoBtn>더보기 &gt;</MoreInfoBtn>
        </TextSection>
      </SecondContent>
      <ThirdContent>
        <span className="title">
          언제나 어디서나
          <br /> 관심사로 연결되는 새로운 세상
          <br />
          <br />
          <br />
          <span className="text">문토에서 취향이 통하는 친구를 만나요.</span>
        </span>
        <div
          style={{
            width: "15rem",
            height: "18rem",
            border: "1px solid #f4f4f4",
            backgroundColor: "white",
            borderRadius: "5em"
          }}
        ></div>
      </ThirdContent>
      <FourthContent>
        <TextSection>
          <span className="small-title">프로필</span>
          <span className="title">함께 할 멤버들의 취향 미리보기</span>
          <SecondGallery>
            <div className="photo"></div>
            <div className="photo"></div>
            <div className="photo"></div>
            <div className="photo"></div>
            <div className="text">
              저는 취미가 무엇인데요 자기소개이고요 여행도 가고싶고 치킨도
              먹고싶다
            </div>
            <div className="text">
              저는 취미가 무엇인데요 자기소개이고요 여행도 가고싶고 치킨도
              먹고싶다
            </div>
            <div className="text">
              저는 취미가 무엇인데요 자기소개이고요 여행도 가고싶고 치킨도
              먹고싶다
            </div>
            <div className="text">
              저는 취미가 무엇인데요 자기소개이고요 여행도 가고싶고 치킨도
              먹고싶다
            </div>
          </SecondGallery>
          <MoreInfoBtn>더보기 &gt;</MoreInfoBtn>
        </TextSection>
      </FourthContent>
    </Wrapper>
  );
}

export default MainContents;

const Wrapper = styled.div`
  width: 100%;
`;
const FirstContent = styled.div`
  gap: 10rem;
  height: 28rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SecondContent = styled.div`
  height: 35rem;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 1em;
`;
const GalleryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20em;
  height: 3em;
  background-color: white;
  padding: 2em 1em;
  border-radius: 2em;
  gap: 1em;
`;
const Photo = styled.div`
  width: 7em;
  height: 5em;
  background-color: #ff9999;
  border-radius: 1em;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .hobby {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
    div {
      font-size: 0.8em;
      margin-right: 1em;
      background-color: #feebea;
      border-radius: 1em;
      padding: 0.3em;
      color: #f43630;
    }
  }
  .hobby div:first-child {
    background-color: #f4f4f4;
    color: #999696;
  }
  .userName {
    font-size: 0.8em;
    font-weight: 700;
    margin-bottom: 0.5em;
  }
  .userInfo {
    font-size: 0.8em;
    text-align: left;
  }
`;
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  gap: 2em;
  .small-title {
    font-size: 1em;
    font-weight: 700;
    color: #f43630;
  }
  .title {
    font-size: 1.7em;
    font-weight: 700;
  }
  .text {
    font-size: 0.8em;
    color: #5d5d5d;
    line-height: 1.2em;
  }
`;
const ImgSection = styled.div`
  width: 15rem;
  height: 20rem;
  border: 1px solid #f43630;
  background-color: white;
  border-radius: 5em;
`;
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20rem;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
`;
const ThirdContent = styled.div`
  gap: 10rem;
  height: 25rem;
  background-color: #e6e1e1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 1.5em;
    font-weight: 700;
  }
  .text {
    font-size: 0.8em;
    font-weight: 400;
  }
`;
const FourthContent = styled.div`
  height: 30rem;
  padding: 3em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
`;
const SecondGallery = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  column-gap: 2em;
  row-gap: 0.7em;
  color: #8b8b8b;
  .photo {
    width: 12em;
    height: 12em;
    background-color: #ff9999;
    border-radius: 1em;
  }
`;
const MoreInfoBtn = styled.button`
  width: 10em;
  height: 3em;
  background-color: white;
  border: 1px solid #f4f4f4;
  border-radius: 5em;
  font-weight: 700;
`;
