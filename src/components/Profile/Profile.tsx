import styled from "styled-components";
import ProfileInfo from "./ProfileInfo";
import ProfileFeed from "./ProfileFeed";
import { doc, setDoc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';

const ProfileContainer = styled.div`
  width: 100%;

  position: relative;
`;
const ProfileHeaderImg = styled.div`
  width: 100%;
  height: 492px;

  position: relative;

  background-image: url("https://images.pexels.com/photos/3974145/pexels-photo-3974145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 50px;
  padding-bottom: 190px;
`;

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
function useUserData() {
  const [userData, setUserData] = useState<usertData | null>(null);
  const [feedData, setFeedData] = useState<feedData | null>(null);
  const { userid } = useParams<string>();
  

  useEffect(() => {
    async function fetchUserData() {
      if(userid) {
        const docRef = doc(db, "Users", userid);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData: usertData = {
            id: docSnap.data().id,
            name: docSnap.data().name,
            ProfileImgUrl: docSnap.data().ProfileImg,
            BackgroundImgUrl: docSnap.data().BackgroundImg,
            introText: docSnap.data().introText,
            hobby: docSnap.data().hobby
          };
  
          setUserData(userData);
        } else {
          
          window.location.href = '/404';
        }
      }
      }
     


    async function fetchFeedData() {
      if(userid) {
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

function Profile() {
  // const user = {
  //   id: "test1",
  //   name: "홍길동",
  //   ProfileImg:
  //     "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2Fdefault.jpg?alt=media&token=81c126bd-3510-457d-b049-281a66b6f286",
  //   BackgroundImg:
  //     "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2Fdefault.jpg?alt=media&token=81c126bd-3510-457d-b049-281a66b6f286",
  //   introText: "반갑습니다.",
  //   hobby: ["취미", "축구", "밥"]
  // };

  // const cityRef = doc(db, "Users", user.id);

  // setDoc(cityRef, user, { merge: true });

  // const Feed = {
  //   id: "test1",
  //   feedId: "1",
  //   feedImageUrl:
  //     "https://firebasestorage.googleapis.com/v0/b/toy-project2-85c0e.appspot.com/o/Users%2Fdefault.jpg?alt=media&token=81c126bd-3510-457d-b049-281a66b6f286",
  //   contentText: "사진",
  //   likes: 0,
  //   timeStamp: "231109"
  // };
  // const cityRef = doc(db, "Feeds", user.id);

  // updateDoc(cityRef, {
  //   [`${Feed.feedId}`]: Feed
  // });

  // async function someFunction() {
  //   const docRef = doc(db, "Users", "test1");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // }
  // someFunction();
  const [imageURL, setImageURL] = useState("");

  const { userData, feedData } = useUserData();

  const [ isProfileMatchingLogin, setIsProfileMatchingLogin ] = useState(false);

  // console.log("User data:", userData)
  // console.log("Feed data:", feedData)
  const loginId = sessionStorage.getItem('userId'); 
  
  useEffect(() => {
    
if(userData){
  if(loginId == userData.id){
    setIsProfileMatchingLogin(true);
  }else {
    setIsProfileMatchingLogin(false);
  }
}
console.log(loginId)
  },[userData])


  // 세션 스토리지에서 값 가져오기



  // useEffect(() => {
  //   if (userData) {
  //     const storage = getStorage();
  //     const imageRef = ref(storage, "Users/default.jpg");

  //     getDownloadURL(imageRef)
  //       .then((url) => {
  //         console.log("Image URL:", url);
  //         setImageURL(url);
  //       })
  //       .catch((error) => {
  //         console.error("Error getting download URL:", error);
  //       });

  //     setImageURL(userData.BackgroundImgUrl);
  //   }
  // }, [userData]);
  return (
    <ProfileContainer>
      <ProfileHeaderImg
        style={{ backgroundImage: `url(${userData?.BackgroundImgUrl})` }}
      ></ProfileHeaderImg>

      <ProfileBodyContainer>
        <ProfileInfo userData={userData} isProfileMatchingLogin = {isProfileMatchingLogin}></ProfileInfo>
        <ProfileFeed feedData={feedData}></ProfileFeed>
      </ProfileBodyContainer>
    </ProfileContainer>
  );
}

export default Profile;
