import React, { createRef, useRef, useState } from "react";
import styled from "styled-components";
import PostListAll from "./postListAll";
import {
  backupListData,
  backuplistcomment,
  ListAdd,
  ListDelete,
  listclone,
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
  // const [dataList, dataList2] = useState([
  //   {
  //     textcommend: "",
  //   },
  // ]);
  //출력시 필요한 text 객체
  //const [textchange1, textchange2] = useState("");

  // const textOnsubmit = (e) => {
  //   e.preventDefault();
  //   textchange2(text1);
  // };
  const textChagnge = (e) => {
    text2(e.target.value);
  };
  const textAdd = () => {
    // dataList2([...dataList, text1]);
    // console.log(dataList);

    backuplistcomment.textcommend = text1;
    dispatch({ type: ListAdd });
    console.log(listCloneData);

    //console.log(backuplistcomment.textcommend);
    //console.log(backupListData);
  };
  const deleteList = () => {
    dispatch({ type: ListDelete });
  };
  const listOutput = backupListData.map((v) => (
    <PostListAll key="v" name={v} text={v.textcommend}></PostListAll>
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
