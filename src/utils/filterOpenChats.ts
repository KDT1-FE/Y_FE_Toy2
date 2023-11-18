import { ChatUser } from '../types/OpenchatType';
import { User } from '../types/User';

interface MyObject {
  id: string;
}

/**
 * 내가 참여한 채팅중 오픈 채팅만 찾는 함수 입니다.
 * @param arr1 firestore에서 받아온 모든 채팅 데이터
 * @param arr2 api로 받아온 내가 참여한 채팅 데이터
 * @returns 내 오픈채팅 데이터를 반환
 */
function filterOpenChats<T extends MyObject, U extends MyObject>(
  arr1?: T[],
  arr2?: U[],
): (T & U)[] {
  if (!arr1 || !arr2) return [];
  // arr1과 arr2에서 공통된 id를 찾아냄
  const commonIds = arr1.filter((obj1) =>
    arr2.some((obj2) => obj1.id === obj2.id),
  );

  // commonIds를 사용하여 새로운 배열을 생성
  const resultArray = commonIds.map((commonObj) => {
    // arr1과 arr2에서 해당 id를 가진 객체를 찾아서 병합
    const obj1 = arr1.find((obj) => obj.id === commonObj.id) as T;
    const obj2 = arr2.find((obj) => obj.id === commonObj.id) as U;
    return { ...obj1, ...obj2 } as T & U;
  });

  return resultArray;
}

/**
 * 오픈 채팅중에 내가 참여하지 않은 채팀만 찾는 함수 입니다.
 * @param arr1 firestore에서 받아온 오픈채팅 데이터
 * @param arr2 api로 받아온 내가 참여한 오픈채팅 데이터
 * @returns 내 오픈채팅 데이터를 반환
 */
export function filterOpenChatsNotMychat<T extends MyObject>(
  arr1: T[],
  arr2: string[],
): T[] {
  const uniqueIds = new Set(arr2);
  const filteredObjects = arr1.filter((obj) => !uniqueIds.has(obj.id));
  return filteredObjects;
}

/**
 * 모든 채팅중에 오픈채팅을 찾습니다.
 * @param chats 모든 채팅을 전달합니다.
 * @param openchatIds 오픈채팅 id를 전달합니다.
 * @returns 모든 오픈채팅을 찾습니다.
 */
export function filterAllOpenchats<T extends MyObject>(
  chats: T[],
  openchatIds: string[],
): T[] {
  const uniqueIds = new Set(openchatIds);
  const filteredObjects = chats.filter((obj) => uniqueIds.has(obj.id));
  return filteredObjects;
}

/**
 * 친구들 목록중 나는 제외해주는 필터 함수 입니다.
 * @param arr 친구 목록
 * @returns 나를 제외한 친구목록을 반환
 */
export function filterFriendsNotMe<T extends MyObject>(arr: T[]): T[] {
  if (!arr) return [];
  const { id } = JSON.parse(localStorage.getItem('user') ?? '{}');
  const friends = arr.filter((obj) => obj.id !== id);
  return friends;
}

/**
 * 모든 유저중에 초대할 친구를 필터링하는 함수입니다.
 * @param arr1 모든 유저정보
 * @param arr2 현재 이미 초대된 유저 id 배열
 * @returns 초대할 친구 데이터의 배열
 */
export function filterInviteUsers<T extends MyObject>(
  arr1: T[],
  arr2: string[],
): T[] {
  const uniqueIds = new Set(arr2);
  const filteredObjects = arr1.filter((obj) => !uniqueIds.has(obj.id));
  return filteredObjects;
}

interface ChatObject {
  users: ChatUser[];
  hashtags: string[];
}

export function filterMyOpenChats<T extends ChatObject>(arr: T[]): T[] {
  if (!arr) return [];
  const { id } = JSON.parse(localStorage.getItem('user') ?? '{}');
  const myOpenchats = arr.filter((obj) =>
    obj.users.some((user) => user.id === id),
  );
  return myOpenchats;
}

export function filterCateOpenChats<T extends ChatObject>(
  arr: T[],
  category: string[],
): T[] {
  if (!arr) return [];
  return arr.filter((obj) =>
    obj.hashtags.some((tag) => category.includes(tag)),
  );
}

export function filterOpenChatsUser<T extends User>(
  arr: T[],
  userIds: string[],
): T[] {
  if (!arr) return [];
  return arr.filter((obj) => userIds.includes(obj.id));
}

export function searchUsersByName<T extends User>(
  users: T[],
  searchTerm: string,
): User[] {
  // 대소문자를 구분하지 않고 검색하려면 searchTerm과 유저 이름을 모두 소문자로 변환합니다.
  const searchTermLower = searchTerm.toLowerCase();

  // 검색어와 일치하는 유저들을 필터링합니다.
  const matchingUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTermLower),
  );

  return matchingUsers;
}

export default filterOpenChats;
