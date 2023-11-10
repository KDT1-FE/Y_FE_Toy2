import styled from "styled-components";
import ModalHamburger from "../components/ModalHamburger";
import ModalPlus from "../components/ModalPlus";
import ChatRoom from "../components/Chat/ChatRoom";

function Chat() {
  return (
    <>
      {/* <div>
        채팅방이 없습니다
      </div> */}
      <ChatWrapper>
        <ChatCategory>
          <CateLink>
            <div className="catelink__wrap">
              <div className="catelink__img">
                <img src="https://via.placeholder.com/150x150" alt="프로필" />
              </div>
              <div className="catelink__name">
                <p className="tit">수다수다방</p>
                <p className="content">
                  비밀메시지1줄넘침처리비밀메시지1줄넘침처리
                </p>
              </div>
              <div className="catelink__time">1시간 전</div>
            </div>
          </CateLink>
          <CateLink>
            <div className="catelink__wrap">
              <div className="catelink__img">
                <img src="https://via.placeholder.com/150x150" alt="프로필" />
              </div>
              <div className="catelink__name">
                <p className="tit">수다수다방</p>
                <p className="content">비밀메시지</p>
              </div>
              <div className="catelink__time">1시간 전</div>
            </div>
          </CateLink>
          <CatePlus>
            <ModalPlus />
          </CatePlus>
        </ChatCategory>
        <ChatRoom />
      </ChatWrapper>
    </>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
  border-top: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  height: 100%;
`;

const ChatCategory = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1 0 30%;
  max-width: 30%;
  border-right: 1px solid #e8e8e8;
`;

const CateLink = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  .catelink {
    &__wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
    }
    &__img {
      width: 70px;
      border-radius: 50%;
      display: block;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: auto;
        height: auto;
        min-width: 1000%;
        min-height: 1000%;
        max-width: none;
        max-height: none;
        -webkit-transform: translate(-50%, -50%) scale(0.1);
        transform: translate(-50%, -50%) scale(0.1);
      }
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    &__name {
      font-size: 16px;
      flex: 1 0 50%;
      max-width: 50%;
      .tit {
        margin-bottom: 10px;
        color: black;
      }
      .content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999696;
      }
    }
    &__time {
      flex: 1 0 15%;
      max-width: 15%;
      font-size: 14px;
      color: #999696;
      white-space: nowrap;
    }
  }
`;

const CatePlus = styled.div`
  text-align: center;
  padding: 20px 0;
  button {
    border: none;
    outline: none;
    background-color: white;
  }
  button:hover {
    cursor: pointer;
  }
  img {
    width: 30px;
  }
`;
