import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Rating() {
  const [peoples, setPeoples] = useState(['']);
  useEffect(() => {
    setPeoples(['aa', 'bb']);
  }, []);

  return (
    <RatingWrapper>
      <h1>Rating</h1>
      {peoples.map((el, i) => (
        <h2>
          {i + 1}. {el}
        </h2>
      ))}
    </RatingWrapper>
  );
}
