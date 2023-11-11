'use client';

import { Host } from '@/pages/host-list/hostList.types';
import styles from './hostListItem.module.scss';

export default function HostListItem({ host }: { host: Host }) {
  return (
    <li className={styles.item} key={host.id}>
      <img className={styles.hostImg} src={host.picture} alt={host.name} />
      <div>
        <p className={styles.name}>{host.name}</p>
        <p className={styles.name}> {host.location}</p>
        <button className={styles.btn} type="submit">
          상세보기
        </button>
      </div>
    </li>
  );
}
