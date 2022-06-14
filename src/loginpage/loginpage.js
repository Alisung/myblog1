import React from "react";
import styled from "styled-components";
import Header from "../header/header";

const LoginBox = styled.div`
  border: 1px solid #333;
  width: 400px;
  height: 300px;
`;
function LoginPage() {
  return (
    <>
      <Header></Header>
      <LoginBox>
        id: <input></input>
        <br />
        password : <input></input>
        <br />
        <button>Login</button>
      </LoginBox>
    </>
  );
}

export default LoginPage;
