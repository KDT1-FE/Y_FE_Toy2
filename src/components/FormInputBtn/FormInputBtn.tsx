import styled from "styled-components";

function FormInputBtn({ value }: FormInputBtnProps) {
  return (
    <>
      <Input type="submit" value={value} />
    </>
  );
}

export default FormInputBtn;
interface FormInputBtnProps {
  value: string;
}

const Input = styled.input`
  margin-top: 12px;
  background-color: #f43630;
  border: none;
  padding: 10px 30px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
`;
