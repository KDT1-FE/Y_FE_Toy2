import styled from "styled-components";

function FormInput({ id, label, inputProps }) {
  return (
    <FormInputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} {...inputProps} />
    </FormInputContainer>
  );
}

export default FormInput;

const FormInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

const InputLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 6px;
  margin-bottom: 3px;
  border: 1px solid #dddddd;
  box-shadow: rgba(0, 0, 0, 0.15) 0.5px 0.5px 1px;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    outline: 2px solid #3b89ff;
  }
`;
