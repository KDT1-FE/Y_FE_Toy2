import React from 'react';
import * as S from '../../styles/home/LanguageFilter.styled';

function LanguageFilter({
  onChangeFilter,
}: {
  onChangeFilter: (value: string) => void;
}) {
  const handleFilterChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    onChangeFilter(event.target.value);
  };

  return (
    <S.Filter>
      <S.Label>언어 :</S.Label>
      <S.SelectBox aria-label="language" onChange={handleFilterChange}>
        <option aria-label="English" value="English">
          영어
        </option>
        <option aria-label="Japanese" value="Japanese">
          일본어
        </option>
        <option aria-label="Chinese" value="Chinese">
          중국어
        </option>
        <option aria-label="Spanish" value="Spanish">
          스페인어
        </option>
        <option aria-label="French" value="French">
          프랑스어
        </option>
        <option aria-label="German" value="German">
          독일어
        </option>
        <option aria-label="Vietnamese" value="Vietnamese">
          베트남어
        </option>
        <option aria-label="Thai" value="Thai">
          태국어
        </option>
      </S.SelectBox>
    </S.Filter>
  );
}

export default LanguageFilter;
