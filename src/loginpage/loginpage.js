import React from "react";
import styled from "styled-components";
import Header from "../header/header";

const loginForm = styled.div`
  clear: both;
`;
function LoginPage() {
  return (
    <>
      <Header></Header>
      <loginForm>login페이지입니다</loginForm>
    </>
  );
}

export default LoginPage;
