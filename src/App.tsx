import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";

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
      <Route path="*" element={<PageNotFound></PageNotFound>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto 2fr;
`;
const MainContent = styled.div`
  width: 100%;
  height: calc(100vh - 20rem);
`;
const MainBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
`;
