import React from "react";
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
  .list2 {
    float: right;
    list-style: none;
    margin-top: 30px;
    margin-right: 30px;
  }
  .listList {
    margin-left: 10%;
  }
`;
function Header() {
  return (
    <Formstyle>
      <ul className="listList">
        <Link to="/">
          <li className="list1">Mypage</li>
        </Link>
        <Link to="/sign">
          <li className="list2">회원가입</li>
        </Link>

        <Link to="/login">
          <li className="list2">로그인</li>
        </Link>
      </ul>
    </Formstyle>
  );
}

export default Header;
