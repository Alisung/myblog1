import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PostListAll from "./postListAll";
import {
  ListAdd,
  ListDelete,
  ToggleComment,
  CommentAdd,
} from "../../backupdata/backupdata";
import { useSelector, useDispatch } from "react-redux";
const Post = styled.form`
  width: 50%;
  height: 100px;
  margin: 5% 0 10% 25%;
  border: 1px solid #333;

  & .comment1 {
    margin: 1% 0 0 5%;
    width: 89%;
    height: 50px;
  }
  .ptag {
    float: right;
    padding: 1% 1% 0 0;
  }
`;
function PostList() {
  const listCloneData = useSelector((state) => state);
  const dispatch = useDispatch();

  // 두 개 만들어서 하나는 입력필드, 하나는 출력 필드에 출력하는 방법.
  // 입력시 text 변환 객체
  const [text1, text2] = useState("");
  // 댓글 Toggle 기능

  // const textOnsubmit = (e) => {
  //   e.preventDefault();
  //   textchange2(text1);
  // };
  useEffect(() => {
    console.log("listCloneData", listCloneData);
  }, [listCloneData]);

  const textChagnge = (e) => {
    text2(e.target.value);
  };
  const textAdd = () => {
    // dataList2([...dataList, text1]);
    // console.log(dataList);

    dispatch({ type: ListAdd, data: { textcommend: text1 } });

    // console.log(listCloneData);
  };
  const deleteList = (id) => {
    dispatch({ type: ListDelete, payload: id, payload2: 1 });
  };
  let togle;
  const commentExpend = (id) => {
    dispatch({ type: ToggleComment, payload: id });
  };

  const [commentToogle, commentToogle2] = useState("none");
  const commentExpend2 = (i) => {
    if (i == "none") {
      commentToogle2("block");
    } else if (i == "block") {
      commentToogle2("none");
    }
  };

  const listOutput =
    listCloneData &&
    listCloneData.map((v) => (
      <>
        <PostListAll
          key={v.id}
          name={v}
          text={v.textcommend}
          deletelist={() => deleteList(v.id)}
          commentList={() => commentExpend(v.id)}
          comment={v.toglelist}
        ></PostListAll>
      </>
    ));
  return (
    <>
      <Post>
        <p type="button" className="ptag" onClick={textAdd}>
          게시물등록
        </p>
        <input
          onChange={textChagnge}
          className="comment1"
          value={text1}
        ></input>
      </Post>
      <div>{listOutput}</div>
    </>
  );
}

export default PostList;
