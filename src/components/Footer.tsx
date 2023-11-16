import styled from "styled-components";

function Footer() {
  return (
    <FooterWrapper>
      <LeftWrapper>
        <div className="first-row">GitHub & Blog</div>
        <div className="second-row">
          <IconImg src="/src/assets/images/github.svg" />
          <span>
            <a href="">박용희</a>
          </span>
          <span>
            <a href="">이예인</a>
          </span>
          <span>
            <a href="">윤태관</a>
          </span>
          <span>
            <a href="">이진욱</a>
          </span>
          <span>
            <a href="">김미정</a>
          </span>
        </div>
        <div className="third-row">
          <IconImg src="/src/assets/images/microblog.svg" />
          <span>
            <a href="">박용희</a>
          </span>
          <span>
            <a href="">이예인</a>
          </span>
          <span>
            <a href="">윤태관</a>
          </span>
          <span>
            <a href="">이진욱</a>
          </span>
          <span>
            <a href="">김미정</a>
          </span>
        </div>
      </LeftWrapper>
      <RightWrapper>
        <div className="first-row">토이프로젝트2 참교6조</div>팀장 : 박용희 ・
        팀원 : 이예인 윤태관 이진욱 김미정
        <br /> 대표웹사이트 : github.com/YongYong21/ToyProject2 <br />
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
`;
const IconImg = styled.img`
  width: 2em;
  height: 2em;
`;
