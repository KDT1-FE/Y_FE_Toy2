import styles from './Search.module.scss'; // Import your appropriate styles file

interface SearchProps {
  onSearch: (query: string) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
}

export default function Search({
  onSearch,
  searchQuery,
  setSearchQuery,
}: SearchProps) {
  function handleSearch() {
    if (searchQuery !== null) {
      onSearch(searchQuery);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && searchQuery !== null) {
      onSearch(searchQuery);
    }
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요 :)"
        value={searchQuery || ''}
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
