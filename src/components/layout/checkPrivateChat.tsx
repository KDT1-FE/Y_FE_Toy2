import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllMyChat } from '../../api';
import {
  accessTokenState,
  myUserDataState,
  privateChatState,
  onlineUserState,
} from '../../states/atom';
import usePollingData from '../template/usePollingData';
import ChattingDetail from './chattingDetail';

const CheckPrivateChat = () => {
  const [allMyChat, setAllMyChat] = useRecoilState(privateChatState);
  const accessToken: any = useRecoilValue(accessTokenState);
  const myUserData: any = useRecoilValue(myUserDataState);
  const onLine = useRecoilValue(onlineUserState);

  const [chatModals, setChatModals] = useState<any>({});

  const fetchData = async () => {
    if (myUserData) {
      try {
        let allMyChatData = await getAllMyChat(accessToken);
        allMyChatData = allMyChatData.chats;

        // 비공개방만 필터
        const privateChatArray = await allMyChatData.filter(
          (obj: any) => obj.isPrivate,
        );

        // users 배열에서 내 id만 빼고 반환
        const nonMyIdArray = privateChatArray.map((chatObject: any) => ({
          ...chatObject,
          users: chatObject.users.filter(
            (user: any) => user.id !== myUserData.id,
          ),
        }));

        console.log(onLine);

        setData(nonMyIdArray);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
  };

  const setData = (allChatData: any) => {
    if (JSON.stringify(allChatData) !== JSON.stringify(allMyChat)) {
      setAllMyChat(allChatData);
    }
  };

  usePollingData(fetchData, [allMyChat, setAllMyChat]);

  const handleChatDetailModal = (chatId: string) => {
    setChatModals((chatModals: any) => ({
      ...chatModals,
      [chatId]: !chatModals[chatId] as boolean,
    }));
  };

  return (
    <>
      {allMyChat.map((element, index) => (
        <div key={index}>
          <div onClick={() => handleChatDetailModal(element.id)}>
            <p>{element.name}</p>
            <p>{element.id}</p>
            <p>{element.users.length}</p>
            {/* <p>{element.latestMessage.text}</p> */}
            {element.users.length > 0 && <p>{element.users[0].id}</p>}
            {element.users.length > 0 && <p>{element.users[0].name}</p>}
            {element.users.length > 0 && <p>{element.users[0].picture}</p>}
          </div>
          {chatModals[element.id] && <ChattingDetail chatId={element.id} />}
        </div>
      ))}
    </>
  );
};
export default CheckPrivateChat;
