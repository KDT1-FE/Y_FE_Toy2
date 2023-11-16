import styled from "styled-components";
import { useState, useEffect } from "react";
import { Message } from "../Chat/ChatRoom";
import SearchImg from "../../assets/images/search.png";

function SearchInput({
  searchText,
  setSearchText,
  messages
}: SearchInputProps) {
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollTo = (id: string) => {
    const targetId = id;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  const handleAddClass = (id: string) => {
    const targetId = id;
    const targetElement = document.getElementById(targetId);

    targetElement?.classList.add("shake");

    setTimeout(() => {
      targetElement?.classList.remove("shake");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const filtered = messages.filter((message) =>
      message.text.includes(searchText)
    );
    setFilteredMessages(filtered.reverse());
  }, [searchText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.length === 0) {
      alert("검색어를 입력해주세요!");
      return;
    }
    try {
      if (
        filteredMessages.length > 0 &&
        filteredMessages.length > currentIndex
      ) {
        handleScrollTo(filteredMessages[currentIndex]?.id);
        handleAddClass(filteredMessages[currentIndex]?.id);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        alert("더 이상 일치하는 메시지가 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SearchInputWrap onSubmit={handleSubmit}>
      <SearchBtn type="submit" typeof="submit" value={""} />
      <Input
        type="text"
        onChange={(e) => {
          handleChange(e);
        }}
        value={searchText}
      ></Input>
    </SearchInputWrap>
  );
}

export default SearchInput;

interface SearchInputProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
}

const SearchInputWrap = styled.form`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: white;
`;
const Input = styled.input`
  border: none;
  outline: none;
  height: 30px;
  color: #999696;
`;

const SearchBtn = styled.input`
  cursor: pointer;
  width: 20px;
  background: url(${SearchImg}) white no-repeat;
  background-size: contain;
  border: none;
  background-color: transparent;
  margin-left: 5px;
`;
