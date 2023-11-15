import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 128px;
  margin-bottom: 32px;

  .commentContentWrap {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    gap: 24px;

    padding-top: 16px;

    font-size: 18px;

    .name span {
      color: #000;
      font-weight: 600;
      cursor: pointer;
    }
    .text span{
      color: #383535;
    }
    .timeStamp span{
      color: #999696;
      font-size: 16px;
    }
  }
  input {
    width: 600px;
    height: 50px;
    border: none;
    border-radius: 24px;

    padding: 0px 16px;
    margin-right: 32px;

    font-family: "Pretendard";
  }
  input:focus {
    outline: none;
  }
  .buttonWrap {
    margin-top: 16px;

    button {
      margin-right: 16px;

      border: none;

      cursor: pointer;
    }
  }
`;

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

export default function ProfileFeedComment(props: {
  feedData: feedData | null;
  comment: {
    id: string;
    name: string;
    text: string;
    timeStamp: string;
  };
  index: number | null;
  loginId: string | null;
  handleEditComment: (commentId: string, newText: string) => void;
  handleDeleteComment: (commentId: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.comment.text);
  const navigate = useNavigate()
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.handleEditComment(`${props.index}`, editedText);
    console.log(props.index);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    props.handleDeleteComment(`${props.index}`);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  return (
    <Container>
      <div className="commentContainer">
        {isEditing ? (
          <input type="text" value={editedText} onChange={handleTextChange} />
        ) : (
          <div className="commentContentWrap">
            <div className="name"><span onClick={()=>{
              navigate(`/profiles/${props.comment.id}`)
            }}>{props.comment.name}</span></div>
            <div className="text"><span>{props.comment.text}</span></div>
            <div className="timeStamp"><span>{props.comment.timeStamp}</span></div>
          </div>
        )}
      </div>
      {props.loginId == props.comment.id ? (
        <div className="buttonWrap">
          {isEditing ? (
            <button onClick={handleSaveClick}>저장</button>
          ) : (
            <button onClick={handleEditClick}>수정</button>
          )}
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      ) : null}
    </Container>
  );
}
