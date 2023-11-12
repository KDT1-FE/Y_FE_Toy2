import styled from "styled-components";
import { useState } from "react";

interface TagProps {
  selected: boolean;
}

const interested = [
  { value: "🎮 게임", label: "게임" },
  { value: "📸 사진", label: "사진" },
  { value: "🏋🏻‍♀️ 운동", label: "운동" },
  { value: "🛍️ 패션/미용", label: "패션/미용" },
  { value: "✈️ 여행", label: "여행" },
  { value: "🚗 드라이브", label: "드라이브" },
  { value: "🌿 봉사활동", label: "봉사활동" },
  { value: "🖥️ IT", label: "IT" },
  { value: "☕️ 맛집/카페", label: "맛집/카페" },
  { value: "📝 자기계발", label: "자기계발" },
  { value: "🐶 반려동물", label: "반려동물" },
  { value: "🏠 인테리어", label: "인테리어" },
  { value: "🎶 노래/악기", label: "노래/악기" },
  { value: "🎫 문화 관람", label: "문화 관람" },
  { value: "📚 문학", label: "문학" },
  { value: "🍳 요리", label: "요리" },
];

export default function OptionalInformation() {
  const [inputCount, setInputCount] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleIntroductionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  }
  
  const handleTagClick = (value: string) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
    console.log(selectedTags);
  };

  return (
    <OptionalInformationWrap>
      <div>
        <p>자기소개</p>
        <Introduction
          placeholder="자기소개를 입력해주세요"
          maxLength={60}
          onChange={handleIntroductionInput}
        />
        <Length>
          <span>{inputCount}</span> 
          <span>/60자</span>
        </Length>
      </div>
        <div>
        <p>관심사</p>
        <TagWrap>
          {interested.map((inter) => (
            <Tag
              key={inter.label}
              onClick={() => handleTagClick(inter.value)}
              selected={selectedTags.includes(inter.value)}
            >
              {inter.value}
            </Tag>
          ))}
        </TagWrap>
      </div>
    </OptionalInformationWrap>
  )
}

const OptionalInformationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Introduction = styled.textarea`
  width: 340px;
  height: 82px;
  resize: none;
  border-radius: 12px;
  padding: 16px;

  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

const Length = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: ${(props) => props.theme.font.smallSize};
  color: ${(props) => props.theme.color.borderGray};
`;

const TagWrap = styled.div`
  padding: 0.5rem;
`;

const Tag = styled.span<TagProps>`
  display: inline-block;
  border-radius: 6px;
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: ${(props) =>
    props.selected ? 
      props.theme.color.primary : 
      props.theme.color.darkGray
    };
  color: ${(props) =>
    props.selected ? 
      props.theme.color.white : 
      props.theme.color.black
    };  

  &:hover {
    cursor: pointer;
  }
`;