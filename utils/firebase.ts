import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Host } from '@/pages/hostList/hostList.types';
import { app } from './firebaseconfig';
import { hostData } from './hostData';

export const storage = getStorage(app);
export const db = getFirestore(app);

// 데이터 추가
export const addHostsToFirestore = async () => {
  try {
    const hostCollectionRef = collection(db, 'hosts');

    // forEach 메서드를 사용하여 문서를 추가합니다.
    await Promise.all(
      hostData.map(async host => {
        const hostDocRef = doc(hostCollectionRef, host.id);
        await setDoc(hostDocRef, host);
      }),
    );

    console.log('데이터가 성공적으로 추가되었습니다.');
  } catch (error) {
    console.error('데이터 추가 중 오류 발생:', error);
  }
};

// 지역별 데이터 필터링
export const fetchHostsFromFirestore = async (
  location: string,
): Promise<Host[]> => {
  try {
    const hostsCollection = collection(db, 'hosts');
    const locationQuery = query(
      hostsCollection,
      where('location', '==', location),
    );
    const snapshot = await getDocs(locationQuery);

    const hosts: Host[] = [];

    snapshot.forEach(hostDoc => {
      hosts.push(hostDoc.data() as Host);
    });
    return hosts;
  } catch (error) {
    console.error('호스트 정보 불러오기 오류:', error); // eslint-disable-line no-console
    throw error;
  }
};
