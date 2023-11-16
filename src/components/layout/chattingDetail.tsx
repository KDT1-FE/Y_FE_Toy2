import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import {
  privateChatDetail,
  privateChatNew,
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
import { Input } from '@chakra-ui/react';
import { randomNameFunc } from '../../util/util';
import { createGameRooms } from '../../api';
import { useNavigate } from 'react-router-dom';

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

  const accessToken: any = getCookie('accessToken');
  const myUserId: string | undefined = getCookie('userId');

  const navigate = useNavigate();

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

  const gamehandler = async (element: User) => {
    const random = randomNameFunc();
    const chat = await createGameRooms(random, [element.id], false);
    navigate(`/room/:${chat.id}`);
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
                <Flex alignItems={'center'}>
                  <Text
                    fontSize={'16px'}
                    lineHeight={'100%'}
                    fontWeight={600}
                    color={'gray.700'}>
                    {userData[0].name}
                  </Text>
                  <OnlineSpan
                    className={
                      userData[0].isOnline ? 'online' : 'offline'
                    }></OnlineSpan>
                </Flex>
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
              background={'none'}
              width={'32px'}
              height={'32px'}
              position={'absolute'}
              right={'45px'}
              padding={'0px'}
              minWidth={'32px'}
              top={'14px'}
              onClick={() => {
                gamehandler(userData[0]);
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path
                    fill="#4A5568"
                    d="M160-240q-33 0-56.5-23.5T80-320v-320q0-33 23.5-56.5T160-720h640q33 0 56.5 23.5T880-640v320q0 33-23.5 56.5T800-240H160Zm0-80h640v-320H160v320Zm120-40h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80Zm300 0q25 0 42.5-17.5T640-420q0-25-17.5-42.5T580-480q-25 0-42.5 17.5T520-420q0 25 17.5 42.5T580-360Zm120-120q25 0 42.5-17.5T760-540q0-25-17.5-42.5T700-600q-25 0-42.5 17.5T640-540q0 25 17.5 42.5T700-480ZM160-320v-320 320Z"
                  />
                </svg>
              }
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
              overflow={'hidden'}
              display={'flex'}
              flexDirection={'column'}>
              <ScrollWrap>
                <PerfectScrollbar options={options}>
                  {fetchChat &&
                    fetchChat.map((element, index) => (
                      <MessageWrap key={index}>
                        {element.date && (
                          <Text
                            align={'center'}
                            fontSize={'14px'}
                            color={'gray.400'}
                            paddingBottom={'5px'}>
                            {element.date}
                          </Text>
                        )}

                        <Flex
                          className={element.userId === myUserId ? 'mine' : ''}
                          alignItems={'end'}>
                          <MessageCont id="message">
                            <Text fontSize={'16px'} color={'gray.700'}>
                              {element.text}
                            </Text>
                          </MessageCont>
                          <Text
                            padding={'0 5px 5px 5px'}
                            fontSize={'12px'}
                            color={'gray.400'}>
                            {element.time}
                          </Text>
                        </Flex>
                      </MessageWrap>
                    ))}

                  {newChat &&
                    newChat.map((element, index) => (
                      <MessageWrap key={index}>
                        {element.date && (
                          <Text
                            align={'center'}
                            fontSize={'14px'}
                            color={'gray.400'}
                            paddingBottom={'5px'}>
                            {element.date}
                          </Text>
                        )}

                        <Flex
                          className={element.userId === myUserId ? 'mine' : ''}
                          alignItems={'end'}>
                          <MessageCont id="message">
                            <Text fontSize={'16px'} color={'gray.700'}>
                              {element.text}
                            </Text>
                          </MessageCont>
                          <Text
                            padding={'0 5px 5px 5px'}
                            fontSize={'12px'}
                            color={'gray.400'}>
                            {element.time}
                          </Text>
                        </Flex>
                      </MessageWrap>
                    ))}
                </PerfectScrollbar>
              </ScrollWrap>

              <Flex
                borderTop={'1px solid'}
                borderColor={'gray.200'}
                backgroundColor={'gray.100'}
                position={'relative'}>
                <FormCont onSubmit={messageSubmit}>
                  <Input
                    color={'gray.700'}
                    borderRadius={'0'}
                    border={'none'}
                    placeholder={'Aa'}
                    _placeholder={{ fontSize: 'sm' }}
                    borderColor={'gray.200'}
                    autoComplete="on"
                    type="text"
                    value={postData}
                    onChange={handleInputChange}
                    width="298px"
                    height="50px"
                    justifyContent={'center'}
                  />

                  <IconButton
                    aria-label="전송하기"
                    background={'none'}
                    width={'32px'}
                    height={'32px'}
                    position={'absolute'}
                    right={'10px'}
                    padding={'0px'}
                    minWidth={'32px'}
                    top={'9px'}
                    zIndex={10}
                    type="submit"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        className="submit-button">
                        <path
                          fill="#A0AEC0"
                          d="m80-120 400-720 400 720H80Zm136-80h224v-403L216-200Zm304 0h224L520-603v403Z"
                        />
                      </svg>
                    }
                  />
                </FormCont>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const OnlineSpan = styled.span`
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
  margin-bottom: 1px;
  border-radius: 100%;
  &.online {
    background-color: #48bb78;
  }
  &.offline {
    background-color: #f56565;
  }
`;

const FormCont = styled.form`
  .submit-button {
    transform: rotate(45deg);
    margin-right: -7px;
    margin-top: -5px;
  }
`;

const ScrollWrap = styled.div`
  width: 100%;
  height: 305px;
  padding: 15px 0 0 0;
`;

const MessageWrap = styled.div`
  width: 100%;

  .mine {
    flex-direction: row-reverse;
    align-items: end;
    #message {
      background-color: #4fd1c5;
      margin-left: 0;
      margin-right: 15px;
      p {
        color: #fff;
      }
    }
  }
`;
const MessageCont = styled.div`
  background-color: #edf2f7;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 3px 10px;
  max-width: 200px;
  margin-left: 15px;
`;

export default ChattingDetail;
