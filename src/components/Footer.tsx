import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";
import { darkTheme } from "../style/theme";
import GitHubDarkImg from "../assets/images/github-dark.svg";
import GitHubImg from "../assets/images/github.svg";
import BlogDarkImg from "../assets/images/blog-dark.svg";
import BlogImg from "../assets/images/blog.svg";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <FooterWrapper>
      <LeftWrapper>
        <div className="first-row">GitHub & Blog</div>
        <div className="second-row">
          <IconImg
            src={theme === darkTheme ? GitHubDarkImg : GitHubImg}
            alt="GitHub icon"
            theme={theme}
          />
          <span>
            <a href="https://github.com/YongYong21">박용희</a>
          </span>
          <span>
            <a href="https://github.com/furaha707">이예인</a>
          </span>
          <span>
            <a href="https://github.com/tkyoun0421">윤태관</a>
          </span>
          <span>
            <a href="https://github.com/KittelLee">이진욱</a>
          </span>
          <span>
            <a href="https://github.com/mysdpy30s">김미정</a>
          </span>
        </div>
        <div className="third-row">
          <IconImg
            src={theme === darkTheme ? BlogDarkImg : BlogImg}
            alt="Blog icon"
            theme={theme}
          />
          <span>
            <a href="https://velog.io/@yongyong_21">박용희</a>
          </span>
          <span>
            <a href="https://furaha.tistory.com">이예인</a>
          </span>
          <span>윤태관</span>
          <span>
            <a href="https://projectlog.tistory.com">이진욱</a>
          </span>
          <span>
            <a href="https://mysdpy30s.tistory.com">김미정</a>
          </span>
        </div>
      </LeftWrapper>
      <RightWrapper theme={theme}>
        <div className="first-row">토이프로젝트2 참교6조</div>팀장 : 박용희 ・
        팀원 : 이예인 윤태관 이진욱 김미정
        <br /> 대표웹사이트 :{" "}
        <a href="https://github.com/YongYong21/ToyProject2">
          github.com/YongYong21/ToyProject2
        </a>
        <br />
        주소 : 서울 영등포구 영등포로67가길 9 1층 <br />
        운영기간 : 2023.11.6 ~ 2023.11.16
      </RightWrapper>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 13em;
  border-top: 1px solid #e8e8e8;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8em;
  padding: 2em;
  .first-row {
    font-weight: 500;
    font-size: 1.2em;
    margin-bottom: 1.5em;
  }
  .second-row,
  .third-row {
    font-weight: 500;
    font-size: 1.1em;
    span {
      padding: 0.2em;
      a {
        text-decoration: none;
        color: inherit;
        &:hover {
          color: #f43530;
          font-weight: 500;
        }
      }
    }
  }
`;
const RightWrapper = styled.div`
  padding: 2em 0;
  font-size: 0.8em;
  line-height: 1.4em;
  .first-row {
    font-weight: 500;
    font-size: 1.2em;
    margin-bottom: 1.5em;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => (theme === darkTheme ? "white" : "#373636")};
    &:hover {
      text-decoration: underline;
      color: #f43530;
    }
  }
`;
const IconImg = styled.img`
  width: 2em;
  height: 2em;
`;
