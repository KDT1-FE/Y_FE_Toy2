import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Chat from "./pages/chat";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Wrapper>
            <Header />
            <MainBanner>
              <h2>메인 배너</h2>
            </MainBanner>
            <MainContent />
            <Outlet />
            <Footer />
          </Wrapper>
        }
      />
      <Route
        path="/chat"
        element={
          <div>
            <Header />
            <MainContent>
              <Chat />
            </MainContent>
          </div>
        }
      />
      <Route path="*" element={<PageNotFound></PageNotFound>} />
    </Routes>
  );
}

export default App;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto 2fr;
`

const MainContent = styled.div`
  width: 100%;
  /* height: calc(100vh - 20rem); */
  height: 100%;
  max-width:1200px;
  margin: 0 auto;
`

const MainBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
`