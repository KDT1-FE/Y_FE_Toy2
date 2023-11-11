import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGameRooms } from '../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allRoomState } from '../../states/atom';
import { useSocketContext } from '../../provider/socketContext';

const CreateGameRoom = () => {
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const accessToken: any = useRecoilValue(accessTokenState);
  const { socket } = useSocketContext();

  // Add event listener when the component mounts
  useEffect(() => {
    const handleNewChat = (data: any) => {
      console.log('Socket Event Received:', data);

      if (data && data.responseChat) {
        console.log('All Rooms:', allRooms);

        // Check if the chat already exists in the state
        const chatExists = allRooms?.some(
          (room) => room.id === data.responseChat.id,
        );

        if (!chatExists) {
          setAllRooms((prevRooms) =>
            prevRooms ? [...prevRooms, data.responseChat] : [data.responseChat],
          );
        } else {
          console.warn(
            'Chat already exists in the state:',
            data.responseChat.id,
          );
        }
      } else {
        console.error('Invalid socket event data structure:', data);
      }
    };

    socket?.on('new-chat', handleNewChat);

    // Clean up the event listener when the component unmounts
    return () => {
      socket?.off('new-chat', handleNewChat);
    };
  }, [socket, allRooms, setAllRooms]);

  const onChange = (e: React.ChangeEvent<any>) => {
    const { value, name } = e.target;
    console.log(value, name);
    setIsPrivate(value === 'Private');
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = await createGameRooms(accessToken, name, [], isPrivate);
    if (check === undefined) {
      alert('중복된 방이 있습니다.');
    } else {
      alert('방 생성 성공.');
      setAllRooms([...allRooms, check]);
      navigate(`/room/:${check.id}`);
    }
  };

  return (
    <>
      <div> CreateGameRoom</div>
      <form onSubmit={submit}>
        <label>name</label>
        <input
          type="text"
          placeholder="plz insert name"
          value={name}
          onChange={onChangeName}
        />
        <label>isPrivate</label>
        <select name="isPrivate" onChange={onChange}>
          <option value="UnPrivate">UnPrivate</option>
          <option value="Private">Private</option>
        </select>
        <button type="submit">create Room!</button>
      </form>
    </>
  );
};

export default CreateGameRoom;
