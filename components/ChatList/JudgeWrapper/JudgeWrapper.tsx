import Link from 'next/link';
import styles from './JudgeWrapper.module.scss';

interface Props {
  isincluded: boolean;
  chatId: string;
  children: React.ReactNode;
}

export default function JudgeWrapper({ isincluded, chatId, children }: Props) {
  if (isincluded) {
    return (
      <Link href={`/chat/${chatId}`} className={styles.container}>
        {children}
      </Link>
    );
  }
  return <div className={styles.container}>{children}</div>;
}
