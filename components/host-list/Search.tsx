import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Search.module.scss'; // Import your appropriate styles file

interface SearchProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function Search({ value, onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(value);

  function handleSearch() {
    onSearch(searchQuery);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요 :)"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className={styles['fill-btn']}
        aria-label="검색"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
}
