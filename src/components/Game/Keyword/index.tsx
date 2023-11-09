import { useEffect, useState } from "react";
import data from "../../../data/category.json";

const Keyword = () => {
  const getRandNum = (length: number): number => {
    const randNum = Math.floor(Math.random() * length);

    return randNum;
  };

  const categories = data.CategoryList;
  const category = categories[getRandNum(categories.length)];
  const keyword = category.keyword[getRandNum(category.keyword.length)];

  const users = data.users;
  const liar = users.name[getRandNum(users.name.length)];

  const myName = "연수";

  const [isLiar, setIsLiar] = useState(false);

  useEffect(() => {
    if (liar === myName) {
      setIsLiar(true);
    }
    return () => {
      setIsLiar(false);
    };
  }, [liar]);

  return (
    <div>
      <p>카테고리: {category.category}</p>
      {isLiar ? (
        <p>당신은 Liar 입니다. 키워드를 추리하세요.</p>
      ) : (
        <p>키워드: {keyword}</p>
      )}
    </div>
  );
};

export default Keyword;
