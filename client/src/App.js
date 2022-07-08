import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import MyPage from "./pages/MyPage";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register/:userType" element={<RegisterForm />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;