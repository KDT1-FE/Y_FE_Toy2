import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sorting from './sorting';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Rating() {
  const [peoples, setPeoples] = useState([
    { id: 'dd', correct: 2 },
    { id: 'bb', correct: 2 },
    { id: 'cc', correct: 15 },
    { id: 'aa', correct: 15 },
  ]);
  const [finish, setFinish] = useState(0);
  useEffect(() => {
    setPeoples(sorting(peoples));
    setFinish(1);
  }, [peoples]);

  return (
    <RatingWrapper>
      <h1>Rating</h1>
      {{ finish } ? (
        peoples.map((el, i) => (
          <h2>
            {i + 1}. {el.id} X {el.correct}
          </h2>
        ))
      ) : (
        <div>X</div>
      )}
    </RatingWrapper>
  );
}
