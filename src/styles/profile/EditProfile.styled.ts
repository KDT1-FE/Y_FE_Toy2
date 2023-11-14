import styled from 'styled-components';

interface Props {
  image?: string;
  flag?: string;
}

export const ProfileContainer = styled.form`
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

export const SaveButton = styled.button`
  width: 70px;
  height: 30px;
  background-color: #f0f0f0;

  position: absolute;
  right: 90px;
  top: -40px;

  border: 1px solid #e1e1e1;
  border-radius: 30px;

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const CancelButton = styled.button`
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

export const ImageLabel = styled.label<Props>`
  width: 160px;
  height: 160px;
  margin-right: 25px;

  border-radius: 50%;
  background: url(${(props) => props.image}) center/cover;
  background-size: cover;
  border: 4px solid var(--color-gray);

  transition: 0.2s;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
    border: 4px solid var(--color-primary);
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const Right = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const UserName = styled.input`
  width: 250px;
  height: 34px;

  outline: none;
  border: 1px solid var(--color-primary);
  border-radius: 5px;

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

export const SelectLanguage = styled.select`
  width: 80px;
  height: 25px;
  margin-right: 10px;

  outline: none;
  border: 1px solid #a5a5a5;
  border-radius: 8px;
`;

export const SelectLevel = styled.select`
  width: 80px;
  height: 25px;
  outline: none;
  border: 1px solid #a5a5a5;
  border-radius: 8px;
`;

export const Middle = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 150px;
  padding: 40px 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-weight: 600;

  & > div {
    font-size: 16px;
    color: var(--color-font-gray);
  }
`;

export const UserHashtag = styled.textarea`
  width: 100%;
  height: 80px;
  outline: none;

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

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-weight: 600;

  & > div {
    font-size: 16px;
    color: var(--color-font-gray);
  }
`;

export const UserIntro = styled.textarea`
  width: 100%;
  height: 80px;

  outline: none;
  line-height: 1.3;
  overflow: auto;
`;
