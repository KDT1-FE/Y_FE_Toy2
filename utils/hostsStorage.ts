import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Host, UserList } from '@/components/HostList/hostList.types';
import userListAPI from '@/apis/userListAPI';
import app from './firebaseConfig';

export const storage = getStorage(app);
export const db = getFirestore(app);
export const hostsCollection = collection(db, 'hosts');
export const locations = ['부산', '제주', '강릉', '여수', '양양'];

// 지역별 데이터 필터링
export const getHostsByLocation = async (location: string): Promise<Host[]> => {
  try {
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
    console.error('getHostsByLocation err', error); // eslint-disable-line no-console
    throw error;
  }
};

// firebase에서 hosts 데이터 가져오기
export const getFirebaseData = async (): Promise<Host[]> => {
  const querySnapshot = await getDocs(hostsCollection);

  const firebaseHostData: Host[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data() as Host;
    firebaseHostData.push(data);
  });
  return firebaseHostData;
};

// 전체 유저 조회
export async function fetchAllUsers(): Promise<UserList[]> {
  try {
    const response = await userListAPI.getAllUserList();
    return response.data;
  } catch (error) {
    console.error('response.data err', error);
    throw error;
  }
}
