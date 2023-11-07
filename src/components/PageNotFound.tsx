import styled from "styled-components";

const PageNotFoundContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-y: hidden;
`;
const PageNotFoundTitleWrap = styled.div`
  text-align: center;
  margin-bottom: 24px;
  span:nth-child(1) {
    font-size: 192px;
    font-weight: 700;
    color: #f43630;
    text-shadow: 12px 6px 1px #333;
  }
  span:nth-child(3) {
    text-align: center;
    background: linear-gradient(to left, #ff8a7a 0%, #f43630 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: 128px;
    font-weight: 700;
    line-height: 1.5;
  }
`;
const PageNotFoundContentWrap = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #383535;
`;
function PageNotFound() {
  return (
    <PageNotFoundContainer>
      <PageNotFoundTitleWrap>
        <span>404</span>
        <br />
        <span>Page Not Found</span>
      </PageNotFoundTitleWrap>
      <PageNotFoundContentWrap>
        <span>Sorry, we couldn't find the page you were looking for.</span>
        <br />
        <span>Please check the URL and try again</span>
      </PageNotFoundContentWrap>
    </PageNotFoundContainer>
  );
}

export default PageNotFound;
