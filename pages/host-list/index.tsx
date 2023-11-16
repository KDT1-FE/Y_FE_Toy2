import React, { useState, useEffect } from 'react';
import HostListItem from '@/components/HostList/HostListItem';
import {
  getHostsByLocation,
  locations,
  fetchHostUsers,
} from '@/utils/hostsStorage';

import Search from '@/components/HostList/Search';
import HostDetailsModal from '@/components/HostList/HostDetailsModal';
import styles from '@/components/HostList/hostList.module.scss';
import { Host, UserList } from '@/components/HostList/hostList.types';

export default function HostListPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [userData, setUserData] = useState<UserList[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const [locationsToShow, setLocationsToShow] = useState<string[]>(locations);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showAllButton, setShowAllButton] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchHostUsers();
        setUserData(response);
      } catch (error) {
        console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchUserData();
  }, []);

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

    // 검색 결과에 따라 locationsToShow를 업데이트
    const newLocationsToShow = query
      ? Array.from(new Set(filtered.map(host => host.location)))
      : locations; // Array.from을 사용하여 Set을 배열로 변환
    setLocationsToShow(newLocationsToShow);

    if (filtered.length === 0) {
      setNoResultsMessage(true);
      setShowAllButton(false);

      setTimeout(() => {
        setNoResultsMessage(false);
        setSearchQuery('');
        setFilteredHosts(hosts);
        setLocationsToShow([...locations]);
        setShowAllButton(true);
      }, 2000);
    } else {
      setShowAllButton(true);
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
      const yOffset = element.getBoundingClientRect().top - 100;
      window.scrollBy({ top: yOffset, behavior: 'smooth' });
    }
  };
  const handleShowAll = () => {
    setFilteredHosts(hosts);
    setLocationsToShow([...locations]);
    setSearchQuery('');
    scrollToLocation('host-list');
  };
  const displayHosts = searchQuery ? filteredHosts : hosts;

  return (
    <section className={styles.container} id="host-list">
      <h2 className={styles.title}>HOT PLACE ✨ 인기 지역 숙소 모음</h2>
      <header className={headerClass}>
        <div className={styles.inner}>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
          <ul className={styles.hash}>
            {showAllButton && (
              <li>
                <button type="button" onClick={handleShowAll}>
                  #전체
                </button>
              </li>
            )}
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
                        userData={userData}
                        openModal={() => handleOpenModal(host)}
                      />
                    ))
                : hosts
                    .filter(host => host.location === location)
                    .map(host => (
                      <HostListItem
                        key={host.id}
                        host={host}
                        userData={userData}
                        openModal={() => handleOpenModal(host)}
                      />
                    ))}
            </ul>
          </div>
        ))}
      </div>
      {noResultsMessage && <p>검색 결과가 없습니다.</p>}

      {isModalOpen && (
        <HostDetailsModal
          hostDetails={selectedHostDetails!}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
          userData={userData}
        />
      )}
    </section>
  );
}
