import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm"


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register/:userType" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;