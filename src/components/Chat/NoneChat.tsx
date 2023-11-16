import styled from "styled-components";
import ChatNone from "../../assets/images/chat-none.png";

function NoneChat() {
  return (
    <NoneWrap>
      <img src={ChatNone} alt="채팅초기이미지" />
      <p className="tit">채팅방이 없습니다</p>
      <p className="txt">
        채팅방에서 주고 받은 대화를
        <br />
        여기서 모아보고, 간편하게 관리하세요.
      </p>
    </NoneWrap>
  );
}

export default NoneChat;

const NoneWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    max-width: 280px;
    width: 100%;
  }
  .tit {
    font-size: 1.4rem;
    font-weight: bold;
    text-align:center;
    color: #6d6d6d;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .txt {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
    text-align:center;
    color: #d7d7d7;
    margin-bottom: 30px;
  }
`;
