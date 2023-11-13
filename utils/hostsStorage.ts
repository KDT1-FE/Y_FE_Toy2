import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Host } from '@/pages/host-list/hostList.types';
// import { IUser } from '@/@types/types';
import axiosInstance from '../apis/axios';
import { hostData } from './hostData';
import app from './firebaseConfig';

export const storage = getStorage(app);
export const db = getFirestore(app);

//  firestore에 상세 데이터 추가
export const addHostsToFirestore = async () => {
  const hostCollectionRef = collection(db, 'hosts');
  const addHostPromises = hostData.map(host => {
    const hostDocRef = doc(hostCollectionRef, host.id);
    return setDoc(hostDocRef, host);
  });

  try {
    await Promise.all(addHostPromises);
    console.log('데이터가 성공적으로 추가되었습니다.');
  } catch (error) {
    console.error('데이터 추가 중 오류 발생:', error);
  }
};

// 지역별 데이터 필터링
export const getHostsByLocation = async (location: string): Promise<Host[]> => {
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

export async function fetchHostsFromAPI(): Promise<Host[]> {
  try {
    const response = await axiosInstance.get('/users');
    console.log('fetchHostsFromAPI', response.data);
    return response.data;
  } catch (error) {
    console.error('API에서 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }
}

// 기존 Firebase 데이터에 name,picture 데이터 추가
export async function updateHostsInfo() {
  const hostsFromAPI = await fetchHostsFromAPI();
  const hostCollectionRef = collection(db, 'hosts');
  const snapshot = await getDocs(hostCollectionRef);

  const updatePromises = snapshot.docs.map(docSnapshot => {
    const currentHostData = docSnapshot.data();
    const hostFromAPI = hostsFromAPI.find(
      host => host.id === currentHostData.id,
    );

    if (hostFromAPI) {
      const hostDocRef = doc(db, 'hosts', docSnapshot.id);
      return updateDoc(hostDocRef, {
        name: hostFromAPI.name,
        picture: hostFromAPI.picture,
      });
    }
    return Promise.resolve();
  });

  try {
    await Promise.all(updatePromises);
    console.log('호스트 데이터가 업데이트되었습니다.');
  } catch (error) {
    console.error('데이터 업데이트 중 오류 발생:', error);
  }
}
