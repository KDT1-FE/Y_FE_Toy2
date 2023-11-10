import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { privateChatDetail } from '../../states/atom';
import { useState } from 'react';
import { chatSocket } from '../../api/socket';

interface ChattingDetailProps {
  chatId: string;
  isModalOpen: boolean;
}

const ChattingDetail = ({ chatId, isModalOpen }: ChattingDetailProps) => {
  console.log(chatId, isModalOpen);
  const chatDetail = useRecoilValue(privateChatDetail);
  console.log(chatDetail);

  const [postData, setPostData] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(e.target.value);

    try {
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <>
      <ModalContainer className={isModalOpen ? 'open' : ''} id="commute-modal">
        <h1>채팅디테일</h1>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <h1>채팅입력</h1>
        <form>
          <input
            type="text"
            placeholder="Aa"
            value={postData}
            onChange={onChangeName}
          />
        </form>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  display: none;
  &.open {
    display: block;
  }
`;

export default ChattingDetail;
