import React from 'react';
import CommunityItem from './community-item/CommunityItem';
import CommunityEdit from './community-edit/CommunityEdit';
import CommunityModal from './community-modal/CommunityModal';
import styled from 'styled-components';
import { Button } from './Community-item-buttons/CommunityItemButtons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 5rem;

  ${(props) => props.theme.response.tablet} {
    padding: 3rem;
  }

  ${(props) => props.theme.response.mobile} {
    padding: 2rem;
  }
`;

const Header = styled.div`
  > div:first-child {
    margin-bottom: 1rem;

    font-size: 50px;
    font-weight: 700;
    color: ${(props) => props.theme.color.primary};

    ${(props) => props.theme.response.mobile} {
      font-size: 45px;
    }
  }

  > div:nth-child(2) {
    font-size: 20px;

    ${(props) => props.theme.response.mobile} {
      font-size: 17px;
    }
  }
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const AddButton = styled(Button)`
  padding: 0.5rem 2rem;
  flex: 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const index = () => {
  return (
    <Wrapper>
      <Header>
        <div>Community</div>
        <div>당신의 관심사를 공유해보세요</div>
      </Header>
      <AddButtonWrapper>
        <AddButton>새 글 등록</AddButton>
      </AddButtonWrapper>
      <ItemWrapper>
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
      </ItemWrapper>
      <CommunityModal />
      <CommunityEdit />
    </Wrapper>
  );
};

export default index;
