import styled from "styled-components";
import ModalHamburger from "../components/ModalHamburger";
import ModalPlus from "../components/ModalPlus";

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
        <ChatRoom>
          <div className="chatroom__tit">
            <div className="tit-bx">
              <div className="img">
                <img src="https://via.placeholder.com/150x150" alt="프로필" />
              </div>
              <p className="tit">수다수다방</p>
              <p className="count">
                <img src="/src/assets/images/user-ico.png" width="14"></img>
                <span className="num">2</span>
              </p>
            </div>
            <div className="util-bx">
              <p className="util-input">
                <input type="text" />
              </p>
                <ModalHamburger />
            </div>
          </div>
          <div className="chatroom__body">
            <div className="scroll-inner">
              <div className="alert">2023년 11월 8일</div>
              <div className="message message__left">
                <div className="img">
                  <img src="https://via.placeholder.com/150x150" alt="프로필" />
                </div>
                <div className="content">
                  <div className="inner">
                    <span className="name">테일러스위프트</span>
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 무슨할말이있는고
                      무슨말인데??
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="message message__right">
                <div className="content">
                  <div className="inner">
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 어디까지? 여기까지
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="message message__left">
                <div className="img">
                  <img src="https://via.placeholder.com/150x150" alt="프로필" />
                </div>
                <div className="content">
                  <div className="inner">
                    <span className="name">테일러스위프트</span>
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 무슨할말이있는고
                      무슨말인데??
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="message message__right">
                <div className="content">
                  <div className="inner">
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 어디까지? 여기까지
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="message message__left">
                <div className="img">
                  <img src="https://via.placeholder.com/150x150" alt="프로필" />
                </div>
                <div className="content">
                  <div className="inner">
                    <span className="name">테일러스위프트</span>
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 무슨할말이있는고
                      무슨말인데??
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="message message__right">
                <div className="content">
                  <div className="inner">
                    <span className="bubble">
                      안녕하세요 내용 더 추가 안녕하세요? 어디까지? 여기까지
                    </span>
                  </div>
                  <div className="date">오전 10:30</div>
                </div>
              </div>
              <div className="alert">테일러스위프트 님이 퇴장했습니다</div>
            </div>
          </div>
          <div className="chatroom__send">
            <input type="text" />
            <button>
              <img
                src="/src/assets/images/up-arrow-ico.png"
                alt="화살표"
                width="20"
              />
            </button>
          </div>
        </ChatRoom>
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

const ChatRoom = styled.div`
  flex: 1 0 70%;
  max-width: 70%;
  border-right: 1px solid #e8e8e8;
  .chatroom {
    &__tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
      padding: 10px 20px;
      .tit-bx {
        display: flex;
        align-items: center;
        gap: 10px;
        .img {
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
        .count {
          display: inline-flex;
          align-items: flex-start;
          gap: 5px;
          color: #b3b3b3;
          img {
            filter: brightness(0.7);
          }
        }
      }
      .util-bx {
        display: flex;
        align-items: center;
        .util-input {
          margin-right: 10px;
          input {
            background: url("/src/assets/images/search.png") white no-repeat;
            background-size: 20px;
            background-position: 90% center;
            border-radius: 20px;
            border: none;
            outline: none;
            height: 30px;
            padding: 0 20px;
            padding-right: 50px;
            color: #999696;
          }
        }
      }
    }
    &__body {
      padding: 20px;
      padding-bottom: 0;
      font-size: 0.9rem;
      overflow-y: scroll;
      height: 400px;
      .message {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        .img {
          border-radius: 50%;
          display: block;
          position: relative;
          overflow: hidden;
          width: 50px;
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
        .content {
          display: flex;
          align-items: flex-end;
          .inner {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
          }
          .name {
            color: #6c6c6c;
            margin-bottom: 10px;
          }
          .bubble {
            background-color: #feebea;
            border-radius: 0 20px 20px 20px;
            max-width: 300px;
            padding: 15px 20px;
            color: #6c6c6c;
            line-height: 1.2;
          }
        }
        .date {
          font-size: 13px;
          color: #d9d9d9;
          margin-left: 5px;
        }
        &__right {
          justify-content: flex-end;
          .content {
            flex-direction: row-reverse;
            .bubble {
              border-radius: 20px 0 20px 20px;
            }
          }
          .date {
            margin-right: 5px;
          }
        }
      }
      .alert {
        text-align: center;
        padding: 30px 0;
        color: #6d6d6d;
      }
    }
    &__send {
      padding: 20px;
      display: flex;
      gap: 10px;
      input {
        background-color: #ececec;
        border: none;
        outline: none;
        border-radius: 20px;
        width: 100%;
        height: 40px;
        padding: 0 20px;
        color: #999696;
      }
      button {
        flex: 1 0 40px;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #bab6b5;
      }
    }
  }
`;
