import { useState, ChangeEvent } from 'react';

export const useForm = (): UseFormReturnType => {
  const [value, setValue] = useState<string>('');
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };
  return [value, onChange];
};

type UseFormReturnType = [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void,
];
