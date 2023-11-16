import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  privateChatDetail,
  privateChatNew,
  myUserDataState,
  openChatDetailState,
} from '../../states/atom';
import { useState, useEffect } from 'react';
import { chatSocket } from '../../api/socket';
import {
  createSeparatedTime,
  sortCreatedAt,
  modifyDate,
} from '../template/useChattingSort';
import { getCookie } from '../../util/util';
interface ChattingDetailProps {
  chatId: string;
}
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Flex, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/image';
import { User } from './checkPrivateChat';
import { IconButton } from '@chakra-ui/button';
import { ChatIcon } from '@chakra-ui/icons';
interface ResponseData {
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id
  createdAt: Date;
}

type UserProps = {
  userData: User[];
};

const ChattingDetail = ({ userData }: UserProps) => {
  const [postData, setPostData] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [fetchChat, setFetchChat] = useRecoilState(privateChatDetail);
  const [newChat, setNewChat] = useRecoilState(privateChatNew);
  const [lastDate, setLastDate] = useState('');
  const [openChatDetail, setOpenChatDetail] =
    useRecoilState(openChatDetailState);
  const myUserData: any = useRecoilValue(myUserDataState);
  const accessToken: any = getCookie('accessToken');

  useEffect(() => {
    if (openChatDetail) {
      try {
        const newSocket = chatSocket(accessToken, userData[0].chatId);
        setSocket(newSocket);

        newSocket.on('messages-to-client', (messageData) => {
          console.log('Fetched messages:', messageData.messages);

          if (messageData.messages.length > 0) {
            // createdAt을 기준으로 시간순서 정렬
            const sortedMessages = sortCreatedAt(messageData.messages);

            // createdAt을 날짜와 시간으로 분리
            const SeparatedTime: any = sortedMessages.map((message) => ({
              ...message,
              ...createSeparatedTime(message.createdAt),
            }));

            // 마지막 날짜 저장
            setLastDate(SeparatedTime[SeparatedTime.length - 1].date);

            // 중복 날짜, 시간 null로 반환
            const modifyDateArray = modifyDate(SeparatedTime);

            setFetchChat(modifyDateArray);
          }
        });

        newSocket.on('message-to-client', (messageObject: Message) => {
          //console.log(messageObject);
          setNewChat((newChat: Message[]) => {
            // 중복 날짜, 시간 null로 반환
            const modifyDateArray = modifyDate([
              ...newChat,
              {
                ...messageObject,
                ...createSeparatedTime(messageObject.createdAt),
              },
            ]);
            return modifyDateArray;
          });
        });

        return () => {
          setFetchChat([]);
          setNewChat([]);
          newSocket.disconnect();
        };
      } catch (error) {
        // console.error('Error retrieving data:', error);
      }
    }
  }, [userData[0].chatId, openChatDetail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);
  };

  const messageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('message-to-server', postData);
    setPostData('');
  };

  const onClose = () => {
    setOpenChatDetail(false);
  };

  const options = {
    suppressScrollX: true,
    suppressScrollY: false,
  };

  return (
    <>
      {openChatDetail && (
        <Modal isOpen={openChatDetail} onClose={onClose}>
          <ModalContent
            overflow={'hidden'}
            color="gray.500"
            width="300px"
            height="420px"
            position={'relative'}
            top={0}
            right={-505}
            boxShadow="lg"
            border="1px solid #E2E8F0"
            borderRadius={15}>
            <ModalHeader
              height={62}
              fontSize="17px"
              lineHeight={'120%'}
              color={'gray.700'}
              fontWeight={600}
              backgroundColor={'gray.100'}
              borderBottom={'1px solid'}
              borderColor={'gray.200'}
              padding={'15px 15px 15px 15px'}
              display={'flex'}
              justifyContent={'left'}
              alignItems={'center'}>
              <Img
                src={userData[0].picture}
                alt={userData[0].id}
                width={'30px'}
                height={'30px'}
                borderRadius={'5px'}
              />
              <Flex
                alignItems={'left'}
                flexDirection={'column'}
                marginLeft={'10px'}
                justifyContent={'center'}>
                <Text
                  fontSize={'16px'}
                  lineHeight={'100%'}
                  fontWeight={600}
                  color={'gray.700'}>
                  {userData[0].name}
                </Text>
                <span
                  className={
                    userData[0].isOnline ? 'online' : 'offline'
                  }></span>
                <Text
                  fontSize={'14px'}
                  color={'gray.400'}
                  fontWeight={300}
                  lineHeight={'100%'}
                  marginTop={'2px'}>
                  {userData[0].id}
                </Text>
              </Flex>
            </ModalHeader>

            <IconButton
              aria-label="게임 같이하기"
              icon={<ChatIcon color={'white'} />}
              bgColor={'teal.300'}
              _hover={{ background: 'teal.200' }}
            />

            <ModalCloseButton
              marginTop={'6px'}
              color={'gray.700'}
              _hover={{ backgroundColor: 'gray.200' }}
            />
            <ModalBody
              p={0}
              width="100%"
              height="370px"
              display={'flex'}
              flexDirection={'column'}>
              <PerfectScrollbar options={options}>
                {fetchChat &&
                  fetchChat.map((element, index) => (
                    <MessageWrap key={index}>
                      <Text
                        align={'center'}
                        fontSize={'12px'}
                        color={'gray.400'}>
                        {element.date}
                      </Text>
                      <Flex
                        className={
                          element.userId === myUserData.id ? 'mine' : ''
                        }>
                        <MessageCont id="message">
                          <Text fontSize={'12px'} color={'gray.400'}>
                            {element.text}
                          </Text>
                        </MessageCont>
                        <Text>{element.time}</Text>
                      </Flex>
                    </MessageWrap>
                  ))}

                {newChat &&
                  newChat.map((element, index) => (
                    <div key={index}>
                      {element.date !== lastDate && <p>{element.date}</p>}

                      <div id="messageWrap">
                        <div
                          id="message"
                          className={
                            element.userId === myUserData.id ? 'mine' : ''
                          }>
                          <p>{element.text}</p>
                        </div>
                        <p>{element.time}</p>
                      </div>
                    </div>
                  ))}
              </PerfectScrollbar>
              <Flex>
                <form onSubmit={messageSubmit}>
                  <input
                    type="text"
                    placeholder="Aa"
                    value={postData}
                    onChange={handleInputChange}
                  />
                </form>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
const MessageWrap = styled.div``;
const MessageCont = styled.div`
  background-color:#edf2f7;
  border-radius:5px; 
  margin
  `;

export default ChattingDetail;
