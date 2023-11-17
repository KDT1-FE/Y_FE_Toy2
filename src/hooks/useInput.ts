import { ChangeEvent, useState } from "react";

const useInput = (initValue: string) => {
  const [inputValue, setInputValue] = useState(initValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const clear = () => {
    setInputValue("");
  };

  return { value: inputValue, onChange: handleChange, clear };
};

export default useInput;
