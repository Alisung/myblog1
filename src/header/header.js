import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Formstyle = styled.div`
  background-color: azure;
  width: 100%;
  height: 100px;

  & .list1 {
    list-style: none;
    float: left;
    margin-top: 30px;
    margin-right: 30px;
  }
  .list21 {
    float: right;
    list-style: none;
    margin-top: 30px;
    margin-right: 30px;
  }

  .list3 {
    float: right;
    list-style: none;
    margin-top: 30px;
    margin-right: 30px;
  }
  .listList {
    margin-left: 10%;
  }
`;
const LoginText = styled.li`
  float: right;
  list-style: none;
  margin-top: 30px;
  margin-right: 30px;
`;
const LogoutText = styled.li`
  float: right;
  list-style: none;
  margin-top: 30px;
  margin-right: 30px;
`;
function Header({ props, propsBool }) {
  // let loginid2 = props;
  // let successBool = propsBool;
  const loginId = sessionStorage.getItem("loginId");
  let logInSuccess2 = sessionStorage.getItem("loginboolData");
  const [logoutSuccess, setlogoutSuccess] = useState(null);
  const [logInSuccess, setlogInSuccess] = useState(
    sessionStorage.getItem("loginboolData")
  );
  useEffect(() => {
    console.log(loginId);
  }, [logoutSuccess]);
  const logoutEvent = () => {
    if (logInSuccess === "true") {
      // window.location.reload();
    }

    sessionStorage.setItem("loginboolData", false);
    sessionStorage.setItem("loginId", "");
    setlogInSuccess(sessionStorage.getItem("loginboolData"));
    logInSuccess2 = sessionStorage.getItem("loginboolData");
    setlogoutSuccess(logInSuccess2);
    console.log(logInSuccess2);
    console.log(logoutSuccess);
  };

  return (
    <Formstyle>
      <ul className="listList">
        <Link to="/">
          <li className="list1">Mypage</li>
        </Link>
        <Link to="/sign">
          <li className="list21">회원가입</li>
        </Link>
        <Link to="/login">
          <li className="list3" onClick={logoutEvent}>
            {logInSuccess2 == "true" ? `${loginId} 로그아웃` : "로그인"}
          </li>
        </Link>
      </ul>
    </Formstyle>
  );
}

export default Header;
