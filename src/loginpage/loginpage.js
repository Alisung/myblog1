import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../header/header";
import { loginaction, logInAction } from "../backupdata/logindata";
const LoginBox = styled.div`
  border: 1px solid #333;
  width: 400px;
  height: 300px;
`;
function LoginPage() {
  const loginDatalist = useSelector((state) => state.logInReducer);
  const signupDatalist = useSelector((state) => state.signupReducer);
  const dispatch = useDispatch();
  const [loginId, setloginId] = useState("");
  const [LoginPassword, setloginPassword] = useState("");
  const [login, setlogin] = useState(false);
  const idOnChange = (e) => {
    setloginId(e.target.value);
  };
  const passwordOnChange = (e) => {
    setloginPassword(e.target.value);
  };

  useEffect(() => {
    console.log("loginDatalist", loginDatalist);
  }, [loginDatalist]);

  const loginEquels = () => {
    signupDatalist.map((index) => {
      if (
        index.id === loginDatalist.id &&
        index.password === loginDatalist.password
      ) {
        return true;
      } else return false;
    });
  };

  const loginStart = () => {
    dispatch(loginaction(loginId, LoginPassword));
    console.log("로그인리스트 : ", loginDatalist);
    console.log("회원가입리스트 : ", signupDatalist);
    if (loginEquels) {
      sessionStorage.setItem("loginboolData", true);
      sessionStorage.setItem("loginId", loginId);
      // setlogin(sessionStorage.getItem("loginboolData"));
      // window.location.reload(true);
    } else {
      console.log("회원정보가 일치하지 않습니다");
      return;
    }
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
        <button onClick={() => loginStart()}>Login</button>
      </LoginBox>
    </>
  );
}

export default LoginPage;
