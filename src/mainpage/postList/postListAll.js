import React, { useRef } from "react";
import styled from "styled-components";

const AllList = styled.div`
  margin: 10% 0 0 30%;
  width: 80%;
  max-height: 100px;
  height: auto;
  & .posttext {
    width: 50%;
    height: 100px;
  }
`;

function PostListAll(props) {
  return (
    <>
      <AllList>
        <input className="posttext" readOnly value={props.text}></input>
        <p>삭제</p>
      </AllList>
    </>
  );
}

export default PostListAll;
