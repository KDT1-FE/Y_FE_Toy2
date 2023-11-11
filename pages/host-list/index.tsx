import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import HostListItem from '@/components/host-list/HostListItem';
import Modal from '@/components/common/Modal/Modal';
import HostDetailsModal from '@/components/common/Modal/HostDetailsModal';
import { addHostsToFirestore, fetchHostsFromFirestore } from '@/utils/firebase';
import { locations as originalLocations } from '@/utils/hostData';
import Search from '@/components/host-list/Search';
import styles from './hostList.module.scss';
import { Host } from './hostList.types';

export default function HostListPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([
    '전국',
    ...originalLocations,
  ]);

  const [locationsToShow, setLocationsToShow] = useState<string[]>(locations);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  // const router = useRouter();

  const fetchAllHosts = async () => {
    try {
      const response = await Promise.all(
        locations.map(fetchHostsFromFirestore),
      );
      setHosts(response.flat());
    } catch (error) {
      console.error('호스트 정보 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchAllHosts();
  }, [locations]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query); // 검색어 업데이트
    const filtered = hosts.filter(host =>
      Object.values(host).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setFilteredHosts(filtered);

    // 해당하는 위치만 노출
    const locationsToShow = filtered.map(host => host.location);
    const uniqueLocationsToShow = [...new Set(locationsToShow)];

    // 스크롤 이벤트 중복 방지, 스크롤 후에만 보여줄 위치들을 설정
    setLocationsToShow(uniqueLocationsToShow);

    setNoResultsMessage(filtered.length === 0);
    setTimeout(() => {
      setNoResultsMessage(false);
      if (filtered.length === 0) {
        setSearchQuery('');
        setLocationsToShow(locations);
      }
    }, 2000);
  };

  const displayHosts = searchQuery ? filteredHosts : hosts;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>HOT PLACE ✨ 인기 숙소 모음</h2>
      <Search onSearch={handleSearch} />
      <ul className={styles.hash}>
        {locations.map(location => (
          <li key={location}>
            <button
              type="button"
              onClick={() => {
                if (location === '전국') {
                  setLocationsToShow(locations);
                  setSearchQuery('');
                } else {
                  scrollToLocation(location);
                }
              }}
            >{`#${location}`}</button>
          </li>
        ))}
      </ul>
      <div>
        {locationsToShow.map(location => (
          <div key={location} id={location}>
            {(!searchQuery ||
              displayHosts.some(host => host.location === location)) &&
              location !== '전국' && (
                <h3 className={styles.location}>{location} 펜션</h3>
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
                      />
                    ))
                : hosts
                    .filter(host => host.location === location)
                    .map(host => (
                      <HostListItem
                        key={host.id}
                        host={host}
                        openModal={() => handleOpenModal(host)}
                      />
                    ))}
            </ul>
          </div>
        ))}
      </div>
      {noResultsMessage && <p>검색 결과가 없습니다.</p>}
      <button
        className={styles.uploadDb}
        type="submit"
        onClick={addHostsToFirestore}
      >
        데이터 업뎃
      </button>
      {isModalOpen && (
        <HostDetailsModal
          hostDetails={selectedHostDetails!}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
