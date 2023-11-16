import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface usertData {
  id: string;
  name: string;
  profileImgUrl: string;
  backgroundImgUrl: string;
  introText: string;
  hobby: string[];
}
interface feed {
  id: string;
  feedId: number;
  feedImageUrl: string;
  contentText: string;
  likes: number;
  timeStamp: string;
  commentList?: object;
}
interface feedData {
  [key: string]: feed;
}

export default function useUserData() {
  const [userData, setUserData] = useState<usertData | null>(null);
  const [feedData, setFeedData] = useState<feedData | null>(null);
  const { userid } = useParams<string>();
  async function fetchUserData() {
    if (userid) {
      const docRef = doc(db, "Users", userid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData: usertData = {
          id: docSnap.data().id,
          name: docSnap.data().name,
          profileImgUrl: docSnap.data().profileImgUrl,
          backgroundImgUrl: docSnap.data().backgroundImgUrl,
          introText: docSnap.data().introText,
          hobby: docSnap.data().hobby
        };

        setUserData(userData);
      } else {
        window.location.href = "/404";
      }
    }
  }

  async function fetchFeedData() {
    if (userid) {
      const docRef = doc(db, "Feeds", userid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFeedData(docSnap.data());
      } 
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchFeedData();
  }, []);

  const fetchData = async () => {
    await fetchUserData();
    await fetchFeedData();
  };

  return { userData, feedData, fetchData };
}
