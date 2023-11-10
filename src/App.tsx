import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AuthLayout from './components/common/AuthLayout';
import Openchat from './pages/Openchat';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 상원님 부분 */}
        <Route path="/game" />
        {/* 은지님 부분 */}
        <Route path="/home" />
        {/* 홍규님 부분 */}
        <Route path="/chat" />
        {/* 오픈 채팅 부분 */}
        <Route path="/open" element={<Openchat />} />
      </Route>
      <Route element={<AuthLayout />}>
        {/* 성겸 부분 */}
        <Route index element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
