'use client';

import { Host } from '@/pages/host-list/hostList.types';
import styles from './hostListItem.module.scss';
import Button from './Button';

interface HostListItemProps {
  host: Host;
  openModal: () => void;
}

export default function HostListItem({ host, openModal }: HostListItemProps) {
  return (
    <li className={styles.item} key={host.id}>
      <img className={styles['host-img']} src={host.picture} alt={host.name} />
      <div>
        <p className={styles.name}>{host.name}</p>
        <Button onClick={openModal} className="fill-btn" text="상세보기" />
      </div>
    </li>
  );
}
