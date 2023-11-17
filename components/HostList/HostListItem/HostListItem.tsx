import Image from 'next/image';
import { Host } from '@/components/HostList/HostList1.types';
import styles from './HostListItem.module.scss';
import Button from './Button/Button';

interface HostListItemProps {
  host: Host;
  openModal: () => void;
}
export default function HostListItem({ host, openModal }: HostListItemProps) {
  if (host) {
    return (
      <li className={styles.item} key={host.id}>
        <Image
          className={styles['host-img']}
          src={host.picture}
          alt={host.name}
          width={70}
          height={70}
        />
        <div>
          <p className={styles.name}>{host.name}</p>
          <Button onClick={openModal} className="fill-btn" text="상세보기" />
        </div>
      </li>
    );
  }

  return null;
}
