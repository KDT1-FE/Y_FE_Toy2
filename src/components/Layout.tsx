import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styled from "styled-components";

function Layout() {
  return (
    <Wrapper>
      <Header />
      <AlignCentered>
        <Outlet />
      </AlignCentered>
      <Footer />
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div``;
const AlignCentered = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
