import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AuthLayout from './components/common/AuthLayout';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 상원님 부분 */}
        <Route path="/game" />
        {/* 은지님 부분 */}
        <Route path="/home" element={<Home />} />
        {/* 홍규님 부분 */}
        <Route path="chat" />
      </Route>
      <Route element={<AuthLayout />}>
        {/* 성겸 부분 */}
        <Route index element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
