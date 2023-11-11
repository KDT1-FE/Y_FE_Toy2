import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { addHostsToFirestore, fetchHostsFromFirestore } from '@/utils/firebase';
import Link from 'next/link';
import HostListItem from '@/components/host-list/HostListItem';
import Modal from '@/components/common/Modal/Modal';
import HostDetailsModal from '@/components/common/Modal/HostDetailsModal';
import styles from './hostList.module.scss';
import { Host } from './hostList.types';

export default function HostTab() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  const locations = ['부산', '제주', '경주', '전주'];

  const fetchHosts = async (location: string) => {
    try {
      const response = await fetchHostsFromFirestore(location);
      setHosts(response);
    } catch (error) {
      console.error('호스트 정보 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    // 초기 로드: 부산
    fetchHosts(locations[selectedTab]);
  }, []);

  const openModal = (host: Host) => {
    setSelectedHostDetails(host);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHostDetails(null);
    setIsModalOpen(false);
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>HOT PLACE ✨ 인기 여행지</h2>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={index => {
          const selectedLocation = locations[index];
          setSelectedTab(index);
          fetchHosts(selectedLocation);
        }}
      >
        <TabList>
          {locations.map(location => (
            <Tab key={location}>{location}</Tab>
          ))}
        </TabList>
        {locations.map(location => (
          <TabPanel key={location}>
            <h3 className={styles.location}>{location}</h3>
            <ul className={styles.itemList}>
              {hosts
                .filter(host => host.location === location)
                .map(host => (
                  <HostListItem
                    key={host.id}
                    host={host}
                    openModal={() => openModal(host)}
                  />
                ))}
            </ul>
          </TabPanel>
        ))}
      </Tabs>
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
          onClose={closeModal}
        />
      )}
    </section>
  );
}

/* export function Sample() {
  useEffect(() => {
    // 페이지 로드 후 실행될 코드
    const handleScroll = () => {
      const element = document.getElementById('busan');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('hashchange', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);
  return (
    <section className={styles.container}>
      <article>
        <h2 className={styles.title}> 숙소 목록</h2>
        <ul className={styles.hash}>
          <li>
            <Link href="#busan">#부산</Link>
          </li>
          <li>
            <Link href="#jeju">#제주</Link>
          </li>
          <li>
            <Link href="#jeonju">#전주</Link>
          </li>
          <li>
            <Link href="#gyeongju">#경주</Link>
          </li>
        </ul>

        <h3 className={styles.location} id="gyeongju">
          경주 펜션
        </h3>
        <ul className={styles.itemList}>
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
        </ul>
        <h3 className={styles.location} id="jeonju">
          전주 펜션
        </h3>
        <ul className={styles.itemList}>
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
        </ul>
        <h3 className={styles.location} id="busan">
          부산 펜션
        </h3>
        <ul className={styles.itemList}>
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
        </ul>
        <h3 className={styles.location} id="jeju">
          제주 펜션
        </h3>
        <ul className={styles.itemList}>
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
          <HostListItem />
        </ul>
      </article>
    </section>
  );
}
 */
