import React from "react";
import Header from "../header/header";
import PostList from "./postList";
import styled from "styled-components";
import FooterMain from "../footer/footer";
function MainPage() {
  return (
    <>
      <Header></Header>
      <PostList></PostList>
      <FooterMain></FooterMain>
    </>
  );
}

export default MainPage;
