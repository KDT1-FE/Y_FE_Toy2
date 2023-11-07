import { ChangeEvent, useState } from "react";

const useInput = (initValue: string) => {
  const [inputValue, setInputValue] = useState(initValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return [inputValue, handleChange];
};

export default useInput;
