import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    if (login === true) {
      console.log("로그인리스트 : ", loginDatalist);
      console.log("회원가입리스트 : ", signupDatalist);
      if (loginEquels()) {
        sessionStorage.setItem("loginboolData", true);
        sessionStorage.setItem("loginId", loginId);
        // setlogin(sessionStorage.getItem("loginboolData"));
        // window.location.reload(true);
      } else {
        console.log("회원정보가 일치하지 않습니다");
        alert("회원정보가 일치하지 않습니다.");
      }
      setloginId("");
      setloginPassword("");
    }
  }, [loginDatalist]);

  const loginEquels = () => {
    for (let i = 0; i < signupDatalist.length; i++) {
      if (
        signupDatalist[i].id === loginDatalist.id &&
        signupDatalist[i].password === loginDatalist.password
      ) {
        return true;
      }
    }
  };
  const loginDispatch = () => {
    dispatch(loginaction(loginId, LoginPassword));
  };
  const loginStart = () => {};
  return (
    <>
      <Header></Header>
      <LoginBox>
        id: <input onChange={idOnChange} value={loginId}></input>
        <br />
        password :{" "}
        <input onChange={passwordOnChange} value={LoginPassword}></input>
        <br />
        <button
          onClick={() => {
            dispatch(loginaction(loginId, LoginPassword));
            setlogin(true);
            window.location.reload();
          }}
        >
          Login
        </button>
      </LoginBox>
    </>
  );
}

export default LoginPage;
