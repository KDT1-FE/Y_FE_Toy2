import React, { useRef } from 'react';

import { BsXCircle } from 'react-icons/bs';
import Button from '@/components/host-list/Button';
import Modal from '@/components/common/Modal';
import useOnClickOutside from '@/hooks/useOnClickOustside';
import { Host } from '@/pages/host-list/hostList.types';
import styles from './HostDetailsModal.module.scss';

interface HostDetailsModalProps {
  onClose: () => void;
  hostDetails: Host;
  isModalOpen: boolean;
}

export default function HostDetailsModal({
  onClose,
  hostDetails,
  isModalOpen,
}: HostDetailsModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    onClose();
  });
  return (
    <>
      <div className={styles.dim} />
      <Modal onClose={onClose}>
        <div
          className={`${styles.ModalBox} ${isModalOpen ? 'open' : ''}`}
          ref={ref}
        >
          <BsXCircle className={styles['close-icon']} onClick={onClose} />

          <img
            className={styles['host-img']}
            src={hostDetails.picture}
            alt={hostDetails.name}
          />
          <p className={styles['flex-row']}>
            <h4 className={styles.title}>{hostDetails.name}</h4>
            <Button className="fill-btn" text="문의하기" />
          </p>
          <p className={styles.text}>
            <b>주소 :</b> {hostDetails.location} {hostDetails.address}
          </p>

          <p className={styles.text}>
            <b>숙소 소개</b>
            <br />
            {hostDetails.description}
          </p>
          <p className={styles.text}>
            <b>시설 및 서비스</b> <br /> {hostDetails.service}
          </p>
        </div>
      </Modal>
    </>
  );
}
