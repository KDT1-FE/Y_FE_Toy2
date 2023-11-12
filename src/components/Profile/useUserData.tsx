import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface usertData {
  id: string;
  name: string;
  ProfileImgUrl: string;
  BackgroundImgUrl: string;
  introText: string;
  hobby: string[];
}
interface feed {
  id: string;
  feedId: string;
  feedImageUrl: string;
  contentText: string;
  likes: number;
  timeStamp: string;
}
interface feedData {
  [key: string]: feed;
}

export default function useUserData() {
  const [userData, setUserData] = useState<usertData | null>(null);
  const [feedData, setFeedData] = useState<feedData | null>(null);
  const { userid } = useParams<string>();

  useEffect(() => {
    async function fetchUserData() {
      if (userid) {
        const docRef = doc(db, "Users", userid);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData: usertData = {
            id: docSnap.data().id,
            name: docSnap.data().name,
            ProfileImgUrl: docSnap.data().ProfileImgUrl,
            BackgroundImgUrl: docSnap.data().BackgroundImgUrl,
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
        } else {
          setFeedData(null);
        }
      }
    }

    fetchUserData();
    fetchFeedData();
  }, []);

  return { userData, feedData };
}
