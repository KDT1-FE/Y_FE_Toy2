import { Button, Input } from "@chakra-ui/react";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CreateGameModal from "../../components/Main/CreateGameModal";
import ToastNotice from "../../components/common/ToastNotice";
import useFetch from "../../hooks/useFetch";
import useFireFetch from "../../hooks/useFireFetch";
import useInput from "../../hooks/useInput";
import { userState } from "../../recoil/atoms/userState";
import connect from "../../socket/socket.ts";

interface MessageInfo {
  id: string;
  text: string;
}

const Example = () => {
  const user = useRecoilValue(userState);

  // 페이지 입장시 자동으로 해당 채팅방으로 입장
  // useFetch({
  //   url: "https://fastcampus-chat.net/chat/participate",
  //   method: "PATCH",
  //   data: {
  //     chatId: "9984747e-389a-4aef-9a8f-968dc86a44e4",
  //   },
  //   start: true,
  // });

  // 소켓 통신
  // const socket = connect("9984747e-389a-4aef-9a8f-968dc86a44e4");

  // useEffect(() => {
  //   socket.on("message-to-client", (messageObject) => {
  //     // 일반 채팅인지 초대 메시지인지 구별
  //     if (messageObject.text.slice(-5, -2) === "*&^") {
  //       // 초대 상태 저장
  //       const usersArr = JSON.parse(messageObject.text);
  //       const users = [...usersArr];
  //       users.pop();
  //       users.pop();
  //       const room = usersArr[usersArr.length - 2];

  //       setToastUser(users);
  //       setRoomData(room);
  //     } else if (messageObject.text.endsWith("!#%&(")) {
  //       // // 유저 입장 구분
  //       const arr = messageObject.text.split(":");
  //       // const gameId = arr[1];
  //       const userData = arr[0];

  //       // const copy = [...gameList];
  //       // const index = copy.findIndex((value) => value.id === gameId);

  //       // copy[index].users = [...copy[index].users, userData];

  //       // setGameList(copy);
  //       setRoomData({ ...roomData, users: [...roomData.users, userData] });
  //     } else {
  //       // 메시지 데이터, 작성 유저 상태 저장
  //       const message = {
  //         id: messageObject.userId,
  //         text: messageObject.text,
  //       };

  //       console.log(message);
  //       setMessages((prev) => [...prev, message]);
  //     }
  //   });

  //   // 채팅 기록 확인
  //   socket.on("messages-to-client", (messagesObject) => {
  //     console.log(messagesObject);
  //   });

  //   // 초대 메시지
  //   socket.on("new-chat", (newChat) => {
  //     console.log(newChat);
  //   });

  //   // 유저 join확인
  //   socket.on("join", (users) => {
  //     console.log(users);
  //   });

  //   // 유저 leave확인
  //   socket.on("leave", (users) => {
  //     console.log(users);
  //   });

  //   return () => {
  //     socket.off("message-to-client");
  //     socket.off("join");
  //     socket.off("leave");
  //     socket.off("new-chat");
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket]);

  // 메세지 데이터
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  // 초대방 정보 데이터
  const [roomData, setRoomData] = useState({
    id: "",
    name: "",
    host: "",
    bg: "",
    users: [""],
  });

  // 팝업 데이터
  const [toastUser, setToastUser] = useState([""]);

  // 토스트 모달
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);

  // 파이어베이스 커스텀훅 선언
  const fireFetch = useFireFetch();

  // 바이어베이스 가져오기
  const notice = fireFetch.useGetAll("notice");

  //  get 요청
  const users = useFetch({
    url: "https://fastcampus-chat.net/chat/all",
    method: "GET",
    start: true,
  });

  const leave = useFetch({
    url: "https://fastcampus-chat.net/chat/leave",
    method: "PATCH",
    data: {
      chatId: "645e9bc5-5d0a-4a0c-a0e4-cf86ff43b3f9",
    },
    start: false,
  });

  const createGame = useFetch({
    url: "https://fastcampus-chat.net/chat",
    method: "POST",
    data: {
      name: "main",
      users: [user.id],
    },
    start: false,
  });

  // 메시지 input value 저장
  const messageValue = useInput("");

  // 메시지 값 변화시(소켓 통신 시) 콘솔에 메시지 데이터 출력
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  //팝업 변화 감지
  useEffect(() => {
    if (toastUser[0] !== "" && user.id) {
      if (toastUser.includes(user.id)) {
        console.log(roomData);
        setToast(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastUser]);

  // 파이어 베이스에 저장할 데이터
  const noticeData = {
    id: "asdasdasdasdasd",
    title: "Asdasda",
    body: "asdasdasdw",
    createdAt: serverTimestamp(),
  };

  // 함수 실행 시 파이어베이스에 데이터 저장 후 상태 업데이트
  const postData = () => {
    fireFetch.usePostData("notice", noticeData.id, noticeData, () => {
      const copy = [...notice.data];
      copy.push(noticeData);
      notice.setData(copy);
    });
  };

  // 함수 실행 시 파이어베이스에 데이터 삭제 후 상태 업데이트
  const deleteData = () => {
    fireFetch.deleteById("notice", "asdasdasdasdasd");
    const copy = [...notice.data];
    const deleted = copy.filter((v) => v.id !== "asdasdasdasdasd");

    notice.setData(deleted);
  };

  // 상태로 저장된 파이어베이스 데이터 출력
  const getData = () => {
    console.log(notice.data);
  };

  // 파이어베이스 테이터 업데이트 후 상태 업데이트
  const updateData = () => {
    const newData = {
      id: "asdasdasdasdasd",
      title: "Asdasda",
      body: "updated",
      createdAt: serverTimestamp(),
    };

    fireFetch.updateData("notice", "asdasdasdasdasd", newData);

    const copy = [...notice.data];
    const index = copy.findIndex((v) => v.id === "asdasdasdasdasd");
    copy[index] = newData;

    notice.setData(copy);
  };

  // const getMessages = () => {
  //   socket.emit("fetch-messages");
  // };

  const liveChat = () => {
    createGame.refresh();
    console.log("asd");
  };

  // api get 요청으로 가져온 데이터 출력
  const getFetchData = () => {
    console.log(users.result, users.loading, users.statusCode);
    // leave.refresh();
  };

  // // 메시지 보내는 함수
  // const submitMessage = () => {
  //   socket.emit("message-to-server", messageValue.value);
  // };

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>예시 페이지</h1>

      {/* 파이어베이스 통신 */}
      <div style={{ marginBottom: "2rem" }}>
        <Button onClick={postData}>Post</Button>
        <Button onClick={deleteData}>Delete</Button>
        <Button onClick={getData}>Get</Button>
        <Button onClick={updateData}>update</Button>
      </div>

      {/* 벡엔드 rest api 통신 */}
      <div style={{ marginBottom: "2rem" }}>
        {/* <Button onClick={getMessages}>채팅 메시지 기록 확인</Button> */}
        <Button onClick={liveChat}>나가기</Button>
        <Button onClick={getFetchData}>Get</Button>
      </div>

      {/* 메시지 소켓 통신 */}
      <div style={{ marginBottom: "2rem" }}>
        <Input value={messageValue.value} onChange={messageValue.onChange} />
        {/* <Button onClick={submitMessage}>전송</Button> */}
      </div>

      <Button
        onClick={() => {
          setModal(true);
        }}
      >
        모달
      </Button>
      {/* {modal ? <CreateGameModal setModal={setModal} socket={socket} /> : null}
      {toast && roomData ? (
        <ToastNotice roomData={roomData} setToast={setToast} socket={socket} />
      ) : null} */}
    </>
  );
};

export default Example;
