import React, { useState } from "react";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  gap: 128px;
  margin-bottom: 32px;

  .commentContentWrap {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    gap: 24px;

    padding-top: 16px;

    font-size: 18px;

    .name {
      color: #000;
      font-weight: 600;
    }
    .text {
      color: #383535;
    }
    .timeStamp {
      color: #999696;
      font-size: 16px;
    }
  }
  .buttonWrap {
    margin-top: 16px;
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
    name: string;
    text: string;
    timeStamp: string;
  };
  index: number | null;
  handleEditComment: (commentId: string, newText: string) => void;
  handleDeleteComment: (commentId: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.comment.text);

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
            <div className="name">{props.comment.name}</div>
            <div className="text">{props.comment.text}</div>
            <div className="timeStamp">{props.comment.timeStamp}</div>
          </div>
        )}
      </div>
      <div className="buttonWrap">
        {isEditing ? (
          <button onClick={handleSaveClick}>저장</button>
        ) : (
          <button onClick={handleEditClick}>수정</button>
        )}
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </Container>
  );
}
