import React, {
  createRef,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import PostListAll from "./postListAll";
import {
  ListAdd,
  ListDelete,
  ToggleComment,
  CommentAdd,
  CommentDelete,
} from "../../backupdata/backupdata";
import { useSelector, useDispatch } from "react-redux";
import { cotext1 } from "./postListAll";
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
  // togle 숫자
  // 댓글
  const [cotext1, cotext2] = useState("");

  const coTextChange = (e) => {
    const comendText1 = e.target.value;
    cotext2(comendText1);
  };

  useEffect(() => {
    console.log("listCloneData", listCloneData);
  }, [listCloneData]);

  const textChagnge = (e) => {
    text2(e.target.value);
  };

  const textAdd = () => {
    dispatch({ type: ListAdd, data: { textcommend: text1 } });
  };
  const deleteList = (id) => {
    dispatch({ type: ListDelete, payload: id, payload2: 1 });
  };

  const commentExpend = (id) => {
    dispatch({ type: ToggleComment, payload: id });
  };
  const commendAdd2 = (id) => {
    dispatch({
      type: CommentAdd,
      data: { textcommend2: cotext1 },
      payload: id,
    });
  };
  const commendDelete = (v, commend) => {
    console.log(commend);
    dispatch({
      type: CommentDelete,
      payload: commend,
      payload2: 1,
      payload3: v,
    });
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
          commend={coTextChange}
          commendAdd2={() => commendAdd2(v.id)}
          commendAll={v.comment.map((commend) => (
            <li>
              {commend.textcommend2}
              {<p onClick={() => commendDelete(v.id, commend.id)}>삭제</p>}
            </li>
          ))}
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
