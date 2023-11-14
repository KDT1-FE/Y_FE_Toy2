import styled from 'styled-components';

interface Props {
  image?: string;
  online?: boolean;
}

export const Card = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 200px;

  border-radius: 20px;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.1);
  outline: none;

  margin: 0 auto 20px;
  padding: 30px;
  background-color: white;

  position: relative;
  transition: 0.2s;
  display: flex;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

export const Image = styled.div<Props>`
  width: 140px;
  height: 140px;
  border-radius: 50%;

  background-image: url(${(props) => props.image});
  background-size: cover;
  margin-right: 30px;
  flex-shrink: 0;
`;

export const Status = styled.div<Props>`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #fff;

  position: absolute;
  left: 140px;
  bottom: 36px;

  &::before {
    content: '';
    width: 16px;
    height: 16px;

    border-radius: 50%;
    background-color: ${(props) =>
      props.online ? 'var(--color-green)' : 'var(--color-red)'};

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const Info = styled.div`
  height: 100%;
  flex-grow: 1;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Name = styled.div`
  font-size: 23px;
  font-weight: 600;
  margin-right: 10px;
`;

export const Level = styled.div`
  font-size: 15px;
  background-color: var(--color-gray);
  border-radius: 5px;
  padding: 5px;
`;

export const Intro = styled.div`
  font-size: 17px;
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  text-align: start;
`;

export const Hashtags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
