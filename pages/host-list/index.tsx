import React, { useState, useEffect } from 'react';
import HostListItem from '@/components/HostList/HostListItem';
import classNames from 'classnames/bind';
import {
  addHostsToFirestore,
  getHostsByLocation,
  updateHostsInfo,
  locations,
} from '@/utils/hostsStorage';

import Search from '@/components/HostList/Search';
import HostDetailsModal from '@/components/HostList/HostDetailsModal';
import styles from '@/components/HostList/hostList.module.scss';
import { Host } from '@/components/HostList/hostList.types';

export default function HostListPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationsToShow, setLocationsToShow] = useState<string[]>(locations);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const { scrollY } = window;
      setIsScrolling(scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClass = `${styles.header} ${
    isScrolling ? styles.scrollHeader : ''
  }`;
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const fetchedHosts = await Promise.all(
          locations.map(getHostsByLocation),
        );
        setHosts(fetchedHosts.flat());
      } catch (error) {
        console.error('호스트 정보 불러오기 오류:', error);
      }
    };

    fetchHosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = query
      ? hosts.filter(host =>
          Object.values(host).some(
            value =>
              typeof value === 'string' &&
              value.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      : hosts;
    setFilteredHosts(filtered);

    // 검색 결과에 따라 locationsToShow를 업데이트합니다.
    const newLocationsToShow = query
      ? Array.from(new Set(filtered.map(host => host.location)))
      : locations; // Array.from을 사용하여 Set을 배열로 변환합니다.
    setLocationsToShow(newLocationsToShow);

    if (filtered.length === 0) {
      setNoResultsMessage(true);
      setTimeout(() => {
        setNoResultsMessage(false);
        setSearchQuery('');
        setFilteredHosts(hosts); // 원본 목록으로 재설정
        setLocationsToShow([...locations]); // 전체 지역 태그를 다시 보여줌
      }, 2000);
    }
  };

  const handleOpenModal = (host: Host) => {
    setSelectedHostDetails(host);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedHostDetails(null);
    setIsModalOpen(false);
  };

  const scrollToLocation = (location: string) => {
    const element = document.getElementById(location);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayHosts = searchQuery ? filteredHosts : hosts;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>HOT PLACE ✨ 인기 지역 숙소 모음</h2>
      <header className={headerClass}>
        <div className={styles.inner}>
          <Search value={searchQuery} onSearch={handleSearch} />
          <ul className={styles.hash}>
            {locationsToShow.map(location => (
              <li key={location}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToLocation(location);
                  }}
                >{`#${location}`}</button>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div>
        {locationsToShow.map(location => (
          <div key={location} id={location}>
            {(!searchQuery ||
              displayHosts.some(host => host.location === location)) && (
              <h3 className={styles.location}>{location} 숙소</h3>
            )}
            <ul className={styles.itemList}>
              {searchQuery
                ? displayHosts
                    .filter(host => host.location === location)
                    .map(host => (
                      <HostListItem
                        key={host.id}
                        host={host}
                        openModal={() => handleOpenModal(host)}
                        isModalOpen={isModalOpen}
                      />
                    ))
                : hosts
                    .filter(host => host.location === location)
                    .map(host => (
                      <HostListItem
                        key={host.id}
                        host={host}
                        openModal={() => handleOpenModal(host)}
                        isModalOpen={isModalOpen}
                      />
                    ))}
            </ul>
          </div>
        ))}
      </div>
      {noResultsMessage && <p>검색 결과가 없습니다.</p>}
      <button
        className={styles.uploadDb}
        type="button"
        onClick={addHostsToFirestore}
      >
        hostData업뎃
      </button>
      <button
        className={styles.uploadApi}
        type="button"
        onClick={updateHostsInfo}
      >
        api 업뎃
      </button>
      {isModalOpen && (
        <HostDetailsModal
          hostDetails={selectedHostDetails!}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
}
