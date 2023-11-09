import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  OrderByDirection,
  DocumentData,
  FieldValue,
  updateDoc,
  AddPrefixToKeys,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

interface Notice {
  id?: string;
  title: string;
  body: string;
  createdAt?: FieldValue;
}

interface Victory {
  id?: string;
  userId: string;
  num?: number;
}

interface ChatRoom {
  name: string;
  users: string[];
  isPrivate?: boolean;
  num?: number;
  bg?: string;
  status?: string;
}

const useFireFetch = () => {
  const useGetAll = (
    initialCollection: string,
    order: OrderByDirection = "desc",
    callback: (() => void) | null = null,
  ) => {
    const [data, setData] = useState<DocumentData[]>([]);

    const get = async () => {
      try {
        const Ref = collection(db, initialCollection);
        const q = query(Ref, orderBy("createdAt", order));
        const querySnapshot = await getDocs(q);
        const getData: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          getData.push(doc.data());
        });

        console.log("good");
        return getData;
      } catch (error) {
        console.error("bad: ", error);
      }
    };

    useEffect(() => {
      get().then((res) => {
        if (res) {
          setData(res);
        }
        if (callback) {
          callback();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCollection]);

    return { data, setData };
  };

  const useGetSome = (
    initialCollection: string,
    key: string,
    value: string,
    order: OrderByDirection = "desc",
    callback: (() => void) | null = null,
  ) => {
    const [data, setData] = useState<DocumentData[]>([]);

    const get = async () => {
      try {
        const Ref = collection(db, initialCollection);
        const q = query(
          Ref,
          where(key, "==", value),
          orderBy("createdAt", order),
        );
        const querySnapshot = await getDocs(q);
        const getData: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          getData.push(doc.data());
        });

        console.log("good");
        return getData;
      } catch (error) {
        console.error("bad: ", error);
      }
    };

    useEffect(() => {
      get().then((res) => {
        if (res) {
          setData(res);
        }
        if (callback) {
          callback();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return { data, setData };
  };

  const usePostData = (
    initialCollection: string,
    id: string,
    data: Notice | Victory | ChatRoom,
    callback: (() => void) | null = null,
  ) => {
    const post = async () => {
      try {
        if (id === "random") {
          const docRef = await addDoc(collection(db, initialCollection), data);
          const docId = docRef.id;
          const newData = { id: docId, ...data };

          await setDoc(doc(db, initialCollection, docId), newData);
        } else {
          await setDoc(doc(db, initialCollection, id), data);
        }

        console.log("good");
      } catch (error) {
        console.error("bad: ", error);
      }
    };
    if (callback) {
      post().then(callback);
    } else {
      post();
    }
  };

  const deleteById = (initialCollection: string, id: string) => {
    const deleteData = async () => {
      try {
        await deleteDoc(doc(db, initialCollection, id));
        console.log("good");
      } catch (error) {
        console.error("bad: ", error);
      }
    };
    deleteData();
  };

  const updateData = (
    initialCollection: string,
    id: string,
    newData: { [x: string]: any } & AddPrefixToKeys<string, any>,
  ) => {
    const update = async () => {
      try {
        const docRef = doc(db, initialCollection, id);

        await updateDoc(docRef, newData);

        console.log("good");
      } catch (error) {
        console.error("bad: ", error);
      }
    };
    update();
  };

  return { useGetAll, useGetSome, usePostData, deleteById, updateData };
};

export default useFireFetch;
