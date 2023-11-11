import React, { useState, useEffect } from 'react';
import HostListItem from '@/components/host-list/HostListItem';
import Modal from '@/components/common/Modal/Modal';
import HostDetailsModal from '@/components/common/Modal/HostDetailsModal';
import { addHostsToFirestore, fetchHostsFromFirestore } from '@/utils/firebase';
import { locations } from '@/utils/hostData';
import styles from './hostList.module.scss';
import { Host } from './hostList.types';

export default function HostListPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostDetails, setSelectedHostDetails] = useState<Host | null>(
    null,
  );
  // const locations = ['부산', '제주', '경주', '전주'];

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
  }, []);

  const openModal = (host: Host) => {
    setSelectedHostDetails(host);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHostDetails(null);
    setIsModalOpen(false);
  };

  const scrollToLocation = (location: string) => {
    const element = document.getElementById(location);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>HOT PLACE ✨ 인기 여행지</h2>
      <ul className={styles.hash}>
        {locations.map(location => (
          <li key={location} onClick={() => scrollToLocation(location)}>
            <span>{`#${location}`}</span>
          </li>
        ))}
      </ul>
      <div className={styles.scrollListContainer}>
        {locations.map(location => (
          <div key={location} id={location}>
            <h3 className={styles.location}>{location} 펜션</h3>
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
          </div>
        ))}
      </div>
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
