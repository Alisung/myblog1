import React from "react";
import Header from "../header/header";
import styled from "styled-components";

const SignUpBox = styled.div`
  border: 1px solid #333;
  width: 400px;
  height: 300px;
`;
function SignupPage() {
  return (
    <>
      <Header></Header>
      <SignUpBox>
        id: <input></input>
        <br />
        password : <input></input>
        <br />
        name : <input></input>
        <br />
        email : <input></input>
        <br />
        <button>가입</button>
      </SignUpBox>
    </>
  );
}

export default SignupPage;
