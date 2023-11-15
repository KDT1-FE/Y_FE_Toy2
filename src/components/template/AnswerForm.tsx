import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AnswerFormProps {
  onSubmit: (answer: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(answer);
    setAnswer('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        정답:
        <input type="text" value={answer} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
};

export default AnswerForm;
