import { Button, Input } from "@chakra-ui/react";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useFetch from "../../hooks/useFetch";
import useFireFetch from "../../hooks/useFireFetch";
import useInput from "../../hooks/useInput";

const Example = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  useFetch({
    url: "https://fastcampus-chat.net/chat/participate",
    method: "PATCH",
    data: {
      chatId: "9fe8a1af-9c60-4937-82dd-21d6da5b9cd9",
    },
    start: true,
  });

  // 채팅 서버 연결
  const socket = io(
    `https://fastcampus-chat.net/chat?chatId=9fe8a1af-9c60-4937-82dd-21d6da5b9cd9`,
    {
      extraHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    },
  );

  // 메세지 데이터
  const [message, setMessage] = useState({
    id: "",
    text: "",
  });

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

  // 메시지 input value 저장
  const messageValue = useInput("");

  // 소켓 통신 시 메시지 데이터 저장
  useEffect(() => {
    socket.on("message-to-client", (messageObject) => {
      // console.log(messageObject);
      // 메시지 데이터, 작성 유저 상태 저장
      const copy = { ...message };
      copy.id = messageObject.userId;
      copy.text = messageObject.text;
      setMessage(copy);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // 메시지 값 변화시(소켓 통신 시) 콘솔에 메시지 데이터 출력
  useEffect(() => {
    if (message.id !== "") console.log(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.text]);

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

  const postData_A = () => {
    console.log(1);
  };

  const deleteData_A = () => {
    console.log(2);
  };

  // api get 요청으로 가져온 데이터 출력
  const getData_A = () => {
    console.log(users.result, users.loading, users.statusCode);
  };

  // 메시지 보내는 함수
  const submitMessage = () => {
    socket.emit("message-to-server", messageValue.value);
  };

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
        <Button onClick={postData_A}>Post</Button>
        <Button onClick={deleteData_A}>Delete</Button>
        <Button onClick={getData_A}>Get</Button>
      </div>

      {/* 메시지 소켓 통신 */}
      <Input value={messageValue.value} onChange={messageValue.onChange} />
      <Button onClick={submitMessage}>전송</Button>
    </>
  );
};

export default Example;
