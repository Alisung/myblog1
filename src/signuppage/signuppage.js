import React, { useEffect, useState } from "react";
import Header from "../header/header";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP, signup } from "../backupdata/signupdata";
const SignUpBox = styled.div`
  border: 1px solid #333;
  width: 400px;
  height: 300px;
`;
function SignupPage() {
  const signupDatalist = useSelector((state) => state.signupReducer);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("email :", email);
  }, [email]);
  useEffect(() => {
    console.log("id :", id);
  }, [id]);
  useEffect(() => {
    console.log("password :", password);
  }, [password]);
  useEffect(() => {
    console.log("name :", name);
  }, [name]);

  const targetId = (e) => {
    setId(e.target.value);
  };
  const targetPassword = (e) => {
    setPassword(e.target.value);
  };
  const targetName = (e) => {
    setName(e.target.value);
  };
  const targetEmail = (e) => {
    setEmail(e.target.value);
  };
  const addSignupData = () => {
    dispatch(signup(id, password, name, email));
    setId("");
    setPassword("");
    setName("");
    setEmail("");
  };
  return (
    <>
      <Header></Header>
      <SignUpBox>
        id: <input onChange={targetId} value={id}></input>
        <br />
        password : <input onChange={targetPassword} value={password}></input>
        <br />
        name : <input onChange={targetName} value={name}></input>
        <br />
        email : <input onChange={targetEmail} value={email}></input>
        <br />
        <button onClick={addSignupData}>가입</button>
      </SignUpBox>
    </>
  );
}

export default SignupPage;
