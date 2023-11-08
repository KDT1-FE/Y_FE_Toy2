import styled from "styled-components";

export const FormInputBtn = ({ value }) => {
  return (
    <>
      <Input type="submit" value={value} />
    </>
  );
};

const Input = styled.input`
  margin-top: 12px;
  background-color: #f43630;
  border: none;
  padding: 10px 30px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
`;
