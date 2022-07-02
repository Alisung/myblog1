import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../header/header";

const LoginBox = styled.div`
  border: 1px solid #333;
  width: 400px;
  height: 300px;
`;
function LoginPage() {
  const [loginId, setloginId] = useState("");
  const [LoginPassword, setloginPassword] = useState("");
  const [login, setlogin] = useState(false);
  const idOnChange = (e) => {
    setloginId(e.target.value);
  };
  const passwordOnChange = (e) => {
    setloginPassword(e.target.value);
  };

  const loginStart = () => {
    sessionStorage.setItem("loginboolData", true);
    sessionStorage.setItem("loginId", loginId);
    // setlogin(sessionStorage.getItem("loginboolData"));
    window.location.reload(true);
  };
  return (
    <>
      <Header></Header>
      <LoginBox>
        id: <input onChange={idOnChange} value={loginId}></input>
        <br />
        password :{" "}
        <input onChange={passwordOnChange} value={LoginPassword}></input>
        <br />
        <button onClick={loginStart}>Login</button>
      </LoginBox>
    </>
  );
}

export default LoginPage;
