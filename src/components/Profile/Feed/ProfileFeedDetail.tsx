import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useUserData from "../useUserData";
import { useCallback, useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  deleteField
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import ProfileFeedComment from "./ProfileFeedComment";

const ProfileFeedDetailContainer = styled.div`
  width: 850px;

  padding: 64px 32px;
  box-sizing: border-box;
`;
const WriterInfoWrap = styled.div`
  display: flex;
  align-items: center;

  font-size: 20px;
  font-weight: 600;

  margin-bottom: 24px;

  position: relative;
  .name {
    cursor: pointer;
  }
  .ProfileImg {
    width: 100px;
    height: 100px;

    border-radius: 50%;

    background-image: url("https://images.pexels.com/photos/3974145/pexels-photo-3974145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    margin-right: 16px;
  }

  .timeStamp {
    display: flex;
    flex-direction: column;

    font-size: 16px;
    opacity: 0.5;
    font-weight: 500;

    position: absolute;
    right: 0;
  }

  button {
    position: absolute;
    right: 0;

    width: 80px;
    height: 30px;

    margin-top: 32px;

    border: none;
    border-radius: 12px;

    cursor: pointer;

    font-family: "Pretendard";

    background-color: #0d6efd;
    color: white;
  }
`;
const ContentsWrap = styled.div`
  .FeedImg {
    width: 100%;
    height: 610px;

    margin-bottom: 16px;
  }

  .ContentText {
    padding: 8px;
  }
`;
const CommentWrap = styled.div`
  width: 100%;

  margin-top: 20px;
  padding-top: 20px;

  border-top: 1px solid #E4E4E4;
`;
const CommentInputWrap = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 56px;
  .loginUserProfileImage {
    flex: 0 0 50px;
    width: 50px;
    height: 50px;

    border-radius: 50%;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    margin-right: 20px;
  }
  input {
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 24px;

    padding: 0px 16px;
    margin-right: 20px;

    font-family: "Pretendard";
  }
  input:focus {
    outline: none;
  }
  button {
    width: 90px;
    height: 50px;

    border: none;
    border-radius: 20px;

    cursor: pointer;

    font-family: "Pretendard";

    background-color: #FF4747;
    color: white;
  }
`;
const CommentListWrap = styled.div`
  display: flex;

  margin-bottom: 10px;
  .userProfile {
    flex: 0 0 50px;
    width: 50px;
    height: 50px;

    border-radius: 50%;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    margin-right: 24px;
  }
`;
interface userData {
  id: string;
  name: string;
  profileImgUrl: string;
  backgroundImgUrl: string;
  introText: string;
  hobby: string[];
}
interface allUserData {
  [key: string]: userData;
}

function ProfileFeedDetail() {
  const navigate = useNavigate();
  const { userid, feedid } = useParams<string>();
  const { userData, feedData, fetchData } = useUserData();
  if (feedData && feedid) {
    console.log(feedData[feedid]);
  }
  const [commentValue, setCommentValue] = useState("");

  const [commentList, setCommentList] = useState<{}>({});

  const [allUserData, setAllUserData] = useState<allUserData>({});

  const loginId = sessionStorage.getItem("userId");

  if (feedData && feedid) {
    if (!feedData || feedData[feedid] === undefined) {
      navigate("/404");
    }
  }

  useEffect(() => {
    fetchData();
  }, [commentList]);

  useEffect(() => {
    async function getAllUsers() {
      const usersCollection = collection(db, "Users");

      try {
        const querySnapshot = await getDocs(usersCollection);

        const userDataObject: allUserData = {};
        querySnapshot.forEach((doc) => {
          userDataObject[doc.id] = doc.data() as userData;
        });

        setAllUserData(userDataObject);
      } catch (error) {
        alert("유저 조회오류");
      }
    }
    getAllUsers();
  }, []);

  const handleChangeComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setCommentValue(e.target.value);
    },
    [commentValue]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleClickCommentButton();
        setCommentValue("");
      }
    },
    [commentValue]
  );

  const handleClickCommentButton = async () => {
    const loginId = sessionStorage.getItem("userId");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);
    const hours = `0${currentDate.getHours()}`.slice(-2);
    const minutes = `0${currentDate.getMinutes()}`.slice(-2);

    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

    if (userData && feedData) {
      const feedInfo = feedData[feedid ? feedid : "1"];

      const commentNumber = Object.keys(
        feedInfo.commentList ? feedInfo.commentList : {}
      ).length;

      const newComment = {
        id: loginId,
        name: allUserData[loginId ? loginId : ""].name,
        text: commentValue,
        timeStamp: formattedDate,
        commentId: commentNumber
      };

      const updatedCommentList = {
        ...feedInfo.commentList,
        [`${commentNumber}`]: newComment
      };

      setCommentList(updatedCommentList);

      const updatedData = {
        ...feedInfo,
        commentList: updatedCommentList
      };

      const feedDocRef = doc(db, "Feeds", userData.id);

      await updateDoc(feedDocRef, {
        [`${feedid}`]: updatedData
      });

      setCommentValue("");
    }
  };

  const handleEditComment = (commentId: string, updateComment: string) => {
    const loginId = sessionStorage.getItem("userId");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);
    const hours = `0${currentDate.getHours()}`.slice(-2);
    const minutes = `0${currentDate.getMinutes()}`.slice(-2);

    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

    if (userData && feedData) {
      const feedInfo = feedData[feedid ? feedid : "1"];

      const editComment = {
        id: loginId,
        name: allUserData[loginId ? loginId : ""].name,
        text: updateComment,
        timeStamp: formattedDate,
        commentId: commentId
      };

      const updatedCommentList = {
        ...feedInfo.commentList,
        [`${commentId}`]: editComment
      };

      setCommentList(updatedCommentList);

      const updatedData = {
        ...feedInfo,
        commentList: updatedCommentList
      };

      const feedDocRef = doc(db, "Feeds", userData.id);

      updateDoc(feedDocRef, {
        [`${feedid}`]: updatedData
      });

      setCommentValue("");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (userData && feedData) {
      const feedRef = doc(db, "Feeds", userData.id);

      try {
        const feedDoc = await getDoc(feedRef);
        const currentFeedData = feedDoc.data();

        if (currentFeedData && currentFeedData[feedid ? feedid : "1"]) {
          const updatedCommentList = {
            ...currentFeedData[feedid ? feedid : "1"].commentList
          };

          delete updatedCommentList[commentId];

          const newIndex = parseInt(commentId, 10);
          for (
            let i = newIndex;
            i < Object.keys(updatedCommentList).length;
            i++
          ) {
            const nextIndex = i + 1;

            if (updatedCommentList[nextIndex] !== undefined) {
              updatedCommentList[i] = updatedCommentList[nextIndex];
            } else {
              delete updatedCommentList[i];
            }
          }

          await updateDoc(feedRef, {
            [`${feedid}.commentList`]: updatedCommentList
          });

          setCommentValue("");

          fetchData();
        } else {
          alert("해당 피드 또는 댓글 목록이 존재하지 않습니다.");
        }
      } catch {
        alert("문서를 가져오거나 업데이트하는 도중 오류가 발생했습니다:");
      }
    }
  };
  const handleDeleteFeed = async () => {
    if (userData && feedData) {
      const feedRef = doc(db, "Feeds", userData.id);
      try {
        const feedDoc = await getDoc(feedRef);
        const currentFeedData = feedDoc.data();
        const deleteFeedid = feedid ? feedid : "1";

        if (currentFeedData && currentFeedData[deleteFeedid]) {
          const deleteIndex = parseInt(deleteFeedid, 10);

          updateDoc(feedRef, {
            [deleteFeedid]: deleteField()
          });

          for (
            let i = deleteIndex + 1;
            i <= Object.keys(currentFeedData).length;
            i++
          ) {
            const nextIndex = i - 1;
            const currentFeed = currentFeedData[i];

            if (currentFeed !== undefined) {
              updateDoc(feedRef, {
                [nextIndex]: currentFeed,
                [i]: deleteField()
              });

              updateDoc(feedRef, {
                [`${nextIndex}.feedId`]: nextIndex
              });
            } else {
              updateDoc(feedRef, {
                [nextIndex]: deleteField()
              });
            }
          }

          await fetchData();
          navigate(`/profiles/${userid}`);
        } else {
          alert("해당 피드가 존재하지 않습니다.");
        }
      } catch (error) {
        alert(
          `문서를 가져오거나 업데이트하는 도중 오류가 발생했습니다: ${error}`
        );
      }
    }
  };
  return (
    <ProfileFeedDetailContainer>
      <WriterInfoWrap>
        <div
          className="ProfileImg"
          style={{ backgroundImage: `url(${userData?.profileImgUrl})` }}
        ></div>
        <div
          className="name"
          onClick={() => {
            navigate(`/profiles/${userData?.id}`);
          }}
        >
          {userData?.name}
        </div>
        <div className="timeStamp">
          {feedData && feedid ? feedData[feedid]?.timeStamp : ""}
          {userid === loginId ? (
            <button onClick={handleDeleteFeed}>삭제</button>
          ) : null}
        </div>
      </WriterInfoWrap>
      <ContentsWrap>
        <div
          className="FeedImg"
          style={{
            backgroundImage: `url(${
              feedData && feedid ? feedData[feedid]?.feedImageUrl : ""
            })`
          }}
        ></div>
        <div className="ContentText">
          {feedData && feedid ? feedData[feedid]?.contentText : ""}
        </div>
        <CommentWrap>
          <CommentInputWrap>
            <div
              className="loginUserProfileImage"
              style={{
                backgroundImage: `url(${
                  loginId && allUserData[loginId]
                    ? allUserData[loginId].profileImgUrl
                    : ""
                })`
              }}
            ></div>

            <input
              type="text"
              value={commentValue}
              onChange={handleChangeComment}
              onKeyDown={handleKeyDown}
              placeholder="댓글 달기..."
            />
            <button onClick={handleClickCommentButton}>등록</button>
          </CommentInputWrap>

          {feedData && feedid && feedData[feedid]
            ? Object.values(feedData[feedid].commentList || {}).map(
                (comment, index) => (
                  <CommentListWrap key={index}>
                    <ProfileFeedComment
                      feedData={feedData}
                      comment={comment}
                      index={index}
                      handleEditComment={handleEditComment}
                      handleDeleteComment={handleDeleteComment}
                      loginId={loginId}
                      allUserData={allUserData}
                    ></ProfileFeedComment>
                  </CommentListWrap>
                )
              )
            : null}
        </CommentWrap>
      </ContentsWrap>
    </ProfileFeedDetailContainer>
  );
}

export default ProfileFeedDetail;
