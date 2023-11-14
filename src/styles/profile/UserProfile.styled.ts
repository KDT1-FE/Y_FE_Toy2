import styled from 'styled-components';

interface Props {
  image?: string;
  flag?: string;
}

export const ProfileContainer = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: 600px;
  padding: 50px;

  border-radius: 20px;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.1);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EditButton = styled.button`
  width: 70px;
  height: 30px;
  background-color: #f0f0f0;

  position: absolute;
  right: 10px;
  top: -40px;

  border: 1px solid #e1e1e1;
  border-radius: 30px;

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const Top = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
`;

export const UserImage = styled.div<Props>`
  width: 160px;
  height: 160px;
  margin-right: 25px;

  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;

  border: 4px solid var(--color-gray);
  flex-shrink: 0;
`;

export const Right = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const UserName = styled.div`
  width: 100%;
  height: 40px;

  font-size: 23px;
  font-weight: 600;
  color: var(--color-font-gray);

  display: flex;
  align-items: center;
`;

export const Language = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  width: 80px;

  font-size: 19px;
  font-weight: 600;
  color: var(--color-font-gray);
`;

export const UserLanguage = styled.div`
  box-sizing: border-box;
  height: 29px;
  padding: 6px;
  margin-right: 7px;

  border-radius: 5px;
  background-color: var(--color-gray);

  font-size: 16px;
  font-weight: 600;
  color: var(--color-font-gray);

  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Flag = styled.div<Props>`
  width: 26px;
  height: 15px;
  background-image: url(${(props) => props.flag});
  background-size: cover;

  color: var(--color-font-gray);
`;

export const UserLevel = styled.div`
  box-sizing: border-box;
  height: 29px;
  padding: 6px;

  border-radius: 5px;
  background-color: var(--color-gray);

  font-size: 15px;
  font-weight: 600;
  color: var(--color-font-gray);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Middle = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 150px;
  padding: 40px 30px 0;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    font-size: 16px;
    color: var(--color-font-gray);
  }
`;

export const UserHashtag = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  flex-wrap: wrap;
  row-gap: 7px;
  overflow: auto;
`;

export const Bottom = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 150px;
  padding: 40px 30px 0;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    font-size: 16px;
    color: var(--color-font-gray);
  }
`;

export const UserIntro = styled.div`
  width: 100%;
  height: 80px;

  line-height: 1.3;
  overflow: auto;
`;
