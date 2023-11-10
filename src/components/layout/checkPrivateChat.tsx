import { useRecoilState, useRecoilValue } from 'recoil';
import { getAllMyChat } from '../../api';
import { accessTokenState, privateChatState } from '../../states/atom';
import usePollingData from '../template/usePollingData';

const CheckPrivateChat = () => {
  const [allMyChat, setAllMyChat] = useRecoilState(privateChatState);
  const accessToken: any = useRecoilValue(accessTokenState);

  const fetchData = async () => {
    try {
      let allMyChatData = await getAllMyChat(accessToken);
      allMyChatData = allMyChatData.chats;
      const privateChatArray = allMyChatData.filter(
        (obj: any) => obj.isPrivate,
      );
      setData(privateChatArray);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const setData = (allChatData: any) => {
    if (JSON.stringify(allChatData) !== JSON.stringify(allMyChat)) {
      setAllMyChat(allChatData);
    }
  };

  usePollingData(fetchData, [allMyChat, setAllMyChat]);

  return (
    <>
      {allMyChat.map((element, index) => (
        <div key={index}>
          <p>{element.name}</p>
          <p>{element.id}</p>
          <p>{element.users.length}</p>
          <p>{element.users[0].id}</p>
        </div>
      ))}
    </>
  );
};
export default CheckPrivateChat;
