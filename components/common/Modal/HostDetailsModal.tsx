import React from 'react';
import Button from '@/components/host-list/Button';
import Modal from './Modal';
import styles from './HostDetailsModal.module.scss';

interface HostDetailsModalProps {
  hostDetails: HostDetails;
  onClose: () => void;
}

export default function HostDetailsModal({
  hostDetails,
  onClose,
}: HostDetailsModalProps) {
  return (
    <Modal onClose={onClose}>
      <img
        className={styles['host-img']}
        src={hostDetails.picture}
        alt={hostDetails.name}
      />
      <h4 className={styles.title}>{hostDetails.name}</h4>
      <p className={styles.text}>
        <b>주소 :</b> {hostDetails.location} {hostDetails.address}
      </p>
      <p className={styles.text}>
        <b>숙소 소개</b> : {hostDetails.detail}
      </p>
      <Button className="fill-btn" text="문의하기" />
    </Modal>
  );
}
