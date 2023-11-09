import styled from "styled-components";
import { BsPencilFill, BsFillCameraFill } from "react-icons/bs";
import InputStyle from "../../style/InputStyle";
import StyledButton from "../../style/ButtonStyle";
const ProfileEditContainer = styled.div`
  width: 100%;

  padding: 122px 0px;

  display: flex;
  justify-content: center;
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
const ProfileHeaderImgEditBtn = styled.button`
  width: 154px;
  height: 36px;

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
const ProfileInfoEditBtn = styled.button`
  width: 53px;
  height: 53px;

  border-radius: 50%;
  border: 1px solid #bfbfbf;

  position: absolute;
  left: 146px;
  bottom: 0;

  cursor: pointer;
  background-color: #fff;
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
function Profile() {
  return (
    <ProfileEditContainer>
      <ProfileEditFormContainer>
        <ProfileHeaderImg>
          <ProfileHeaderImgEditBtn>
            <BsFillCameraFill size="20" />
            배경 설정
          </ProfileHeaderImgEditBtn>
        </ProfileHeaderImg>

        <ProfileEditBodyWrap>
          <ProfileInfoImg>
            <ProfileInfoEditBtn>
              <BsFillCameraFill size="25" color="#BEBEBE" />
            </ProfileInfoEditBtn>
          </ProfileInfoImg>

          <ProfileEditInputWrap>
            <span>이름</span>
            <br />
            <InputStyle
              type="text"
              value="user.name"
              placeholder="이름"
            ></InputStyle>
          </ProfileEditInputWrap>
          <ProfileEditInputWrap>
            <span>자기소개</span>
            <br />
            <textarea value="user.IntroText" placeholder="자기소개"></textarea>
          </ProfileEditInputWrap>

          <ProfileEditButtonWrap>
            <StyledButton backgroundColor="red" size="m">
              저장
            </StyledButton>
          </ProfileEditButtonWrap>
        </ProfileEditBodyWrap>
      </ProfileEditFormContainer>
    </ProfileEditContainer>
  );
}

export default Profile;
