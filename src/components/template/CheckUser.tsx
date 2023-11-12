import styled from 'styled-components';

const CheckUser = () => {
  return (
    <UserBox>
      <ImgBox>
        <UserImg
          src="https://i.namu.wiki/i/ckyw5zMNXPPWXcS8fOaReaHtNBXuo_MHJwds3YO82wS3WVcw28ZJpfUOZN8wBCqWYg_OaCzb0Kz6ZOUDUHy_DbuMcvoiIUVWBnc2vQyGYngpjYV3iCQAzXii4FzJydMGToLNY2uIshfxXtMVRXCclA.webp"
          alt="쵸파"
        />
      </ImgBox>
      <TextBox>
        <UserId>seacrab808</UserId>
        <UserNick>유나에요</UserNick>
      </TextBox>
    </UserBox>
  );
};

const UserBox = styled.div`
  width: 280px;
  height: 110px;
  background-image: linear-gradient(90deg, #313860 10%, #151928 90%);
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  margin-left: 20px;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TextBox = styled.div`
  color: #fff;
  margin-left: 15px;
`;

const UserId = styled.div``;

const UserNick = styled.div`
  color: #cbd5e0;
`;

export default CheckUser;
