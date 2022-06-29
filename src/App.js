import "./App.css";
import React, { useEffect } from "react";
import LoginPage from "./loginpage/loginpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./mainpage/mainpage";
import SignupPage from "./signuppage/signuppage";
import axios from "axios";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
