interface MyObject {
  id: string;
}

function filterOpenChats<T extends MyObject, U extends MyObject>(
  arr1?: T[],
  arr2?: U[],
): T[] {
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
    return { ...obj1, ...obj2 };
  });

  return resultArray;
}

export function filterMyOpenChats() {}

export default filterOpenChats;
