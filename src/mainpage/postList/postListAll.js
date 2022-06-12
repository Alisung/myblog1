import React, { useRef, useState } from "react";
import styled from "styled-components";

const AllList = styled.div`
  margin: 10% 0 0 30%;
  width: 600px;

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
`;

const ContextlistAll = styled.div`
  border: 1px solid #333;
  width: 600px;
  height: 100px;
`;
const Contextlist = styled.div`
  display: ${(props) => (props.display ? "none" : "block")};
  border: 1px solid #333;
  width: 600px;
  height: 100%;
`;
function PostListAll({
  text,
  deletelist,
  comment,
  commentList,
  commendAdd2,
  commend,
  commendAll,
}) {
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
        <Contextlist display={comment}>
          <input onChange={commend}></input>
          <p onClick={commendAdd2}>댓글등록</p>
          <ul>{commendAll}</ul>
        </Contextlist>
      </AllList>
    </>
  );
}

export default PostListAll;
