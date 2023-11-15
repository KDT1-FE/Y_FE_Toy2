import styled from "styled-components";

function Footer() {
  return (
    <FooterWrapper>
      <LeftWrapper>
        <div className="first-row">문토 정보</div>
        <div className="first-row">소셜 미디어</div>
        <div className="other-rows">공지사항</div>
        <div className="other-rows">인스타그램</div>
        <div className="other-rows">이벤트</div>
        <div className="other-rows">네이버 블로그</div>
        <div className="other-rows">자주 묻는 질문</div>
        <div className="other-rows"></div>
        <div className="other-rows">제휴 및 입점 문의</div>
        <div className="other-rows"></div>
        <div className="other-rows">채용</div>
        <div className="other-rows"></div>
      </LeftWrapper>
      <RightWrapper>
        주식회사 문토
        <br />
        <br /> 대표 : 홍길동 ・ 개인정보관리책임자 : 홍길동
        <br /> 이메일 : munto@munto.kr ・ 대표번호 : 070-7606-4793 <br />
        주소 : 서울시 강남구 테헤란로 503 하이브로빌딩 <br />
        사업자등록번호 : 846-86-01452 <br />
        고객센터 : 카카오채널・운영시간 : (월~일) 오전 11:00 ~ 오후 5:00
      </RightWrapper>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 1em 13em;
`;
const LeftWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(1.5em, auto);
  width: 50%;
  font-size: 0.8em;
  padding: 2em;
  .first-row {
    font-weight: 400;
    margin-bottom: 1.5em;
  }
  .other-rows {
    font-weight: 700;
  }
`;
const RightWrapper = styled.div`
  padding: 2em 0;
  font-size: 0.8em;
  line-height: 1.4em;
`;
