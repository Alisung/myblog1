import React from "react";
import Header from "../header/header";
import PostList from "./postList/postList";
import styled from "styled-components";

function MainPage() {
  return (
    <>
      <Header></Header>

      <PostList></PostList>
    </>
  );
}

export default MainPage;
