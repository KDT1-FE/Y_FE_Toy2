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
// import { hostData } from './hostData';

export const storage = getStorage(app);
export const db = getFirestore(app);

const locations = ['부산', '제주', '강릉', '여수', '양양'];

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
    console.error('getHostsByLocation err', error); // eslint-disable-line no-console
    throw error;
  }
};

// 전체 유저 조회
export async function fetchHostUsers(): Promise<UserList[]> {
  try {
    const response = await userListAPI.getAllUserList();
    return response.data;
  } catch (error) {
    console.error('response.data err', error);
    throw error;
  }
}

export { locations };
