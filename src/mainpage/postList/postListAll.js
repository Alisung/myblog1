import React, { useRef } from "react";
import styled from "styled-components";

const AllList = styled.div`
  margin: 10% 0 0 30%;
  width: 600px;
  max-height: 200px;
  height: auto;
  border: solid 1px #333;
  & .posttext {
    width: 500px;
    height: 100px;
  }
  & .deletebox {
    float: right;
  }
  & .commentlist {
    float: right;
  }
  & .listView {
    display: "block";
    border: 1px solid #333;
    width: 600px;
    height: 100%;
  }
  & .listUnView {
    display: "none";
    border: 1px solid #333;
    width: 600px;
    height: 100%;
  }
`;

const ContextlistAll = styled.div`
  border: 1px solid #333;
  width: 600px;
  height: 100px;
`;
const Contextlist = styled.div`
  display: ${(props) => props.display || "none"};
  border: 1px solid #333;
  width: 600px;
  height: 100%;
`;
function PostListAll({ text, deletelist, comment, commentList }) {
  return (
    <>
      <AllList>
        <input className="posttext" readOnly value={text}></input>
        <p className="deletebox" onClick={deletelist}>
          삭제
        </p>
        <p className="commentlist" onClick={commentList}>
          댓글
        </p>
        <div className={comment ? "listUnView" : "listView"}>
          <input></input>
          <ContextlistAll>
            <input></input>
          </ContextlistAll>
        </div>
      </AllList>
    </>
  );
}

export default PostListAll;
