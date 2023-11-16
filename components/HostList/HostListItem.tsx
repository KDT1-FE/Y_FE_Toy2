'use client';

import styles from '@/components/HostList/HostListItem.module.scss';
import Button from '@/components/HostList/Button';
import { Host, UserList } from '@/components/HostList/hostList.types';
import Image from 'next/image';

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
        <Image
          className={styles['host-img']}
          src={findUser.picture}
          alt={findUser.name}
          width={50}
          height={50}
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
