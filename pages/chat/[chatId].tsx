import React, { useState, useEffect, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useSetRecoilState } from 'recoil';
import {
  Chat,
  IsValidAuth,
  JoinersData,
  LeaverData,
  Message,
} from '@/@types/types';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import {
  ChatAlert,
  ChatLoading,
  ChatroomHeader,
  EntryNotice,
  ExitNotice,
  MyMessage,
  OtherMessage,
} from '@/components/Chat';
import authorizeFetch from '@/utils/authorizeFetch';
import chatAPI from '@/apis/chatAPI';
import styles from '@/components/Chat/Chat.module.scss';
import showNavigationState from '@/stores/atoms/nav.atoms';

interface MessageArray {
  messages: Message[];
}

export default function Chatting({ authData }: IsValidAuth) {
  const router = useRouter();
  const { chatId } = router.query;
  const currentChatId: string = Array.isArray(chatId)
    ? chatId[0]
    : chatId || '';

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const setShowNavigation = useSetRecoilState(showNavigationState);
  useEffect(() => {
    setShowNavigation(false);
    return () => {
      setShowNavigation(true);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [chatData, setChatData] = useState<Chat | null>();

  const [showEntryNotice, setShowEntryNotice] = useState(false);
  const [showExitNotice, setShowExitNotice] = useState(false);

  const [enterName, setEnterName] = useState<string>('');
  const [exitName, setExitName] = useState<string>('');

  const userId = authData.user.id;

  const accessToken = getCookie('ACCESS_TOKEN');

  const socket = useMemo(() => {
    return io(`${process.env.NEXT_PUBLIC_CHAT_URL}?chatId=${chatId}`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        serverId: process.env.NEXT_PUBLIC_API_KEY!,
      },
    });
  }, [currentChatId, accessToken]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await chatAPI.getChatInfo(currentChatId);
        const chatInfo: Chat = response.data.chat;
        await setChatData(chatInfo);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    if (currentChatId) {
      fetchChatData();
    }
  }, [currentChatId]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected from server');
        setTimeout(() => {
          socket.emit('fetch-messages');
        }, 500);
      });
      socket.on('messages-to-client', (messageArray: MessageArray) => {
        setMessages(messageArray.messages);
      });

      socket.on('message-to-client', (messageObject: Message) => {
        setMessages(prevMessages => [...prevMessages, messageObject]);
      });

      socket.on('join', async (messageObject: JoinersData) => {
        console.log(messageObject, '채팅방 입장');
        const joinUserInfo = await chatAPI.getUserInfo(
          messageObject.joiners[0],
        );

        let userData = joinUserInfo.data.user;
        setEnterName(userData.name);

        // 이름 속성명 변경
        userData = { ...userData, username: userData.name };
        delete userData.name; // 기존의 이름 속성 삭제

        setChatData((prevChatData): Chat => {
          const updatedUsers = [...prevChatData!.users, userData];
          return {
            ...prevChatData!,
            users: updatedUsers,
          };
        });
      });

      socket.on('leave', async (messageObject: LeaverData) => {
        console.log(messageObject, '채팅방 퇴장');
        const exitUserInfo = await chatAPI.getUserInfo(messageObject.leaver);
        const userData = exitUserInfo.data.user;
        setExitName(userData.name);

        setChatData((prevChatData): Chat => {
          const updatedUsers = prevChatData!.users.filter(
            user => user.id !== userData.id,
          );
          return {
            ...prevChatData!,
            users: updatedUsers,
          };
        });
      });
    }

    return () => {
      socket.off('connect');
      socket.off('messages-to-client');
      socket.off('message-to-client');
      socket.off('join');
      socket.off('leave');
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (enterName) {
      setShowEntryNotice(true);
    }
    const entryTimer = setTimeout(() => {
      setShowEntryNotice(false);
      setEnterName('');
    }, 3000);

    return () => clearTimeout(entryTimer);
  }, [enterName]);

  useEffect(() => {
    if (exitName) {
      setShowExitNotice(true);
    }
    const exitTimer = setTimeout(() => {
      setShowExitNotice(false);
      setExitName('');
    }, 3000);

    return () => clearTimeout(exitTimer);
  }, [exitName]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, [messages, showEntryNotice, showExitNotice]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message.trim()) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    socket.emit('message-to-server', message);
    setMessage('');
  };

  return (
    <>
      {chatData && <ChatroomHeader chatData={chatData} />}
      <div className={styles.container}>
        <div className={styles.container}>
          {!chatData ? (
            <ChatLoading />
          ) : (
            <>
              <div>
                {messages.map((msg, index) => {
                  const prevUserId =
                    index > 0 ? messages[index - 1].userId : null;
                  return msg.userId === userId ? (
                    <MyMessage key={msg.id} msg={msg} />
                  ) : (
                    <OtherMessage
                      key={msg.id}
                      msg={msg}
                      prevUserId={prevUserId}
                    />
                  );
                })}
              </div>
              {showEntryNotice && <EntryNotice joiner={enterName} />}
              {showExitNotice && <ExitNotice leaver={exitName} />}
              {showAlert && <ChatAlert />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {chatData ? (
        <form className={styles.footer} onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="대화를 시작해보세요!"
            className={styles.chatInput}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            className={styles.triangle_button}
            type="submit"
            aria-label="Submit"
          />
        </form>
      ) : null}
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = context.req.cookies.ACCESS_TOKEN;
  const refreshToken = context.req.cookies.REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    const response = await authorizeFetch({
      accessToken,
      refreshToken,
    });
    return {
      props: { authData: response.data },
    };
  }
  if (!refreshToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
