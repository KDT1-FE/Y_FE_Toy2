// checkGameRoom.tsx

import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { getAllGameRooms, participateGameRoom } from '../../api';
import { useNavigate } from 'react-router-dom';
import usePollingData from '../template/usePollingData';
import Pagination from 'react-js-pagination';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Input,
  Button,
  Img,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Fade,
  ListItem,
  UnorderedList,
  List,
} from '@chakra-ui/react';
import styled from 'styled-components';

const CheckGameRoom = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const accessToken: any = useRecoilValue(accessTokenState);

  const [showAlert, setShowAlert] = useState({
    active: false,
    message: '',
    type: '',
  });

  // Pagination 관련 상태와 핸들러 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 수

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      const allRoomsData = await getAllGameRooms(accessToken);
      setTotalItemsCount(allRoomsData.chats.length);

      // 방번호 넣기
      const plusIndex = {
        ...allRoomsData,
        chats: allRoomsData.chats.map((room, index) => ({
          ...room,
          index: index + 1,
        })),
      };

      // 서버에서 받아온 전체 데이터를 현재 페이지에 맞게 자름
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedRooms = plusIndex.chats.slice(startIndex, endIndex);

      setAllRooms(paginatedRooms);
      console.log(paginatedRooms);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  usePollingData(fetchData, [accessToken, currentPage]);

  const handleParticipate = async (numberOfPeople: number, chatId: any) => {
    if (numberOfPeople === 4) {
      const errorMessage = `방이 꽉 찼어요.`;
      const errorType = 'full';
      setShowAlert({ active: true, message: errorMessage, type: errorType });
      console.log(showAlert);
    } else {
      await participateGameRoom(chatId, accessToken);
      navigate(`/room/:${chatId}`);
    }
  };

  useEffect(() => {
    // alert 창 3초 후에 사라지게 하기
    if (showAlert.active) {
      const timer = setTimeout(() => {
        setShowAlert({ active: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert.active]);

  return (
    <>
      <List spacing={3}>
        {allRooms.map((element, index) => (
          <ListItem
            key={index}
            onClick={() => handleParticipate(element.users.length, element.id)}>
            <p>{element.index}</p>
            <p>{element.name}</p>
            <p>{element.users.length} / 4</p>
          </ListItem>
        ))}

        {/* Pagination 컴포넌트를 추가합니다. */}
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </List>

      <Fade in={showAlert.active}>
        <Alert
          marginTop={10}
          status="error"
          width={400}
          height={70}
          variant="solid"
          borderRadius={6}>
          <AlertIcon />
          <Box>
            <AlertTitle mr={2}>방 입장 오류</AlertTitle>
            <AlertDescription>{showAlert.message}</AlertDescription>
          </Box>
        </Alert>
      </Fade>
    </>
  );
};

export default CheckGameRoom;
