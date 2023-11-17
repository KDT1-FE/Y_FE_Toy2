import React, { useState, useEffect, useCallback } from 'react';
import {
  getHostsByLocation,
  locations,
  getFirebaseData,
  fetchAllUsers,
} from '@/utils/hostsStorage';
import styles from '@/components/HostList/HostList.module.scss';
import Search from './Search/Search';
import HostListItem from './HostListItem/HostListItem';
import HostDetailsModal from './HostDetailsModal/HostDetailsModal';
import { FirebaseData, Host } from './HostList.types';

export default function HostList() {
  const [hostData, setHostData] = useState<Host[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  const [filteredHosts, setFilteredHosts] = useState<Host[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const [locationsToShow, setLocationsToShow] = useState<string[]>([]);

  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showAllButton, setShowAllButton] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userDataResponse, hostDataResponse] = await Promise.all([
          fetchAllUsers(),
          getFirebaseData(),
        ]);

        // 데이터 합치기
        const combinedData: Host[] = hostDataResponse.map(
          (host: FirebaseData) => {
            const hostUserData = userDataResponse.find(
              user => user.id === host.id,
            );
            return {
              ...host,
              name: hostUserData ? hostUserData.name : '',
              picture: hostUserData ? hostUserData.picture : '',
            };
          },
        );
        setHostData(combinedData);
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchLocationsToShow = async () => {
      try {
        const locationPromises = locations.map(getHostsByLocation);
        const locationData = await Promise.all(locationPromises);
        const uniqueLocations = Array.from(
          new Set(locationData.flat().map(host => host.location)),
        );
        setLocationsToShow(uniqueLocations);
      } catch (error) {
        console.error('호스트 위치 데이터 가져오기 오류:', error);
        // 에러 처리 또는 사용자에게 알림을 표시하는 등의 추가 작업 수행
      }
    };
    fetchLocationsToShow();
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
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 검색 쿼리가 변경되지 않았다면 캐시된 결과를 사용
    if (query === '') {
      setFilteredHosts(hostData);
      setLocationsToShow([...locations]);
      setShowAllButton(true);
      return;
    }
    // 검색 필터링
    const newFiltered = hostData.filter(host =>
      Object.values(host).some(value => {
        if (typeof value === 'string') {
          // 호스트 데이터 속성 값이 문자열인 경우
          return value.toLowerCase().includes(query.toLowerCase());
        }
        if (Array.isArray(value)) {
          // 호스트 데이터 속성 값이 배열인 경우
          return value.some(
            item =>
              typeof item === 'string' &&
              item.toLowerCase().includes(query.toLowerCase()),
          );
        }
        // 다른 데이터 유형에 대한 처리 추가
        return false;
      }),
    );

    setFilteredHosts(newFiltered);

    const newLocationsToShow = Array.from(
      new Set(newFiltered.map(host => host.location)),
    );
    setLocationsToShow(newLocationsToShow);

    if (newFiltered.length === 0) {
      setNoResultsMessage(true);
      setShowAllButton(false);

      setTimeout(() => {
        setNoResultsMessage(false);
        setSearchQuery('');
        setFilteredHosts(hostData);
        setLocationsToShow([...locations]);
        setShowAllButton(true);
      }, 1000);
    } else {
      setShowAllButton(true);
    }
  };

  const handleClearSearch = useCallback(() => {
    setFilteredHosts(hostData);
    setLocationsToShow([...locations]);
    setSearchQuery('');
  }, [hostData]);

  useEffect(() => {
    if (!searchQuery) {
      handleClearSearch();
    }
  }, [searchQuery, handleClearSearch]);

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
    handleClearSearch();
    scrollToLocation('host-list');
  };
  const displayHosts = searchQuery ? filteredHosts : hostData;

  return (
    <>
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
                          openModal={() => handleOpenModal(host)}
                        />
                      ))
                  : hostData
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
      </section>
      {isModalOpen && (
        <HostDetailsModal
          hostDetails={selectedHostDetails!}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
