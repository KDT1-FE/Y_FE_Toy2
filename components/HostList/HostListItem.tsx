'use client';

import styles from '@/components/HostList/HostListItem.module.scss';
import Button from '@/components/HostList/Button';
import { Host, UserList } from '@/components/HostList/hostList.types';

interface HostListItemProps {
  host: Host;
  openModal: () => void;
  userData: UserList[];
}
export default function HostListItem({
  host,
  openModal,
  userData,
}: HostListItemProps) {
  const findUser = userData.find(user => user.id === host.id);

  if (findUser) {
    return (
      <li className={styles.item} key={host.id}>
        <img
          className={styles['host-img']}
          src={findUser.picture}
          alt={findUser.name}
        />
        <div>
          <p className={styles.name}>{findUser.name}</p>
          <Button onClick={openModal} className="fill-btn" text="상세보기" />
        </div>
      </li>
    );
  }

  return null;
}
