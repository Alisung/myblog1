import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostListAll from "./postListAll";
import {
  ListAdd,
  ListDelete,
  ToggleComment,
  CommentAdd,
  CommentDelete,
  Revisation,
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
const Commend = styled.li`
  list-style-type: none;
  & .DeleteCommend {
    float: right;
  }
  & .Revisation {
    float: right;
  }
`;
const OnChangeDiv = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  width: 500px;
  height: 200px;
  border: 1px solid #333;
  position: fixed;
  background-color: white;
  top: 30%;
  left: 30%;
`;
const OnChangeInput = styled.input`
  width: 400px;
  height: 50px;
`;
function PostList() {
  const listCloneData = useSelector((state) => state);

  const dispatch = useDispatch();

  // 두 개 만들어서 하나는 입력필드, 하나는 출력 필드에 출력하는 방법.
  // 입력시 text 변환 객체
  const [text1, text2] = useState("");

  const [cotext1, cotext2] = useState("");

  const coTextChange = (e) => {
    cotext2(e.target.value);
  };

  useEffect(() => {
    console.log("listCloneData", listCloneData);
  }, [listCloneData]);

  const textChagnge = (e) => {
    text2(e.target.value);
  };

  const textAdd = () => {
    dispatch({ type: ListAdd, data: { textcommend: text1 } });
    text2("");
  };
  const deleteList = (id) => {
    dispatch({ type: ListDelete, payload: id, payload2: 1 });
  };

  const commentExpend = (id) => {
    dispatch({ type: ToggleComment, payload: id });
  };
  const commendAdd2 = (id) => {
    if (cotext1 == "") {
      return;
    }
    dispatch({
      type: CommentAdd,
      data: { textcommend2: cotext1 },
      payload: id,
    });
    cotext2("");
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
  // 게시물 수정
  const [revisation1, revisation2] = useState("");
  // 게시물 수정버튼을 Click한 객체의 id를 저장할 변수
  const [getRevisation1, getRevisation2] = useState("");
  // 게시물 수정란의 toggle 여부
  const [readBoolean, readBoolean2] = useState(false);
  // 수정하는 게시물의 input값을 받아와 변색 표시하는 변수
  const [revisationYellow, revisationYellow2] = useState("");

  const reivisationChagnge = (e) => {
    revisation2(e.target.value);
    return true;
  };
  // 수정 버튼을 클릭시 게시물 수정란을 보이도록 하는 함수
  const revisationText = (text) => {
    revisation2(text.textcommend);
    getRevisation2(text.id);
    readBoolean2(!readBoolean);
  };
  // 취소 버튼을 클릭시 다시 reset 시키는 함수
  const revisationCancle = () => {
    revisation2("");
    readBoolean2(!readBoolean);
  };
  // 수정 버튼을 클릭시 게시물 수정하는 함수
  const revisationText2 = () => {
    listCloneData.map((index) => {
      if (index.id == getRevisation1) {
        if (reivisationChagnge) {
          dispatch({
            type: Revisation,
            payload: getRevisation1,
            data: { changeText: revisation1 },
          });
        }
      }
    });
    readBoolean2(!readBoolean);
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
          commend={(e) => {
            coTextChange(e);
          }}
          commend2={cotext1}
          commendAdd2={() => commendAdd2(v.id)}
          revisationText={() => revisationText(v)}
          revisationToggle={readBoolean}
          onChangeText={reivisationChagnge}
          commendAll={v.comment.map((commend) => (
            <Commend>
              {commend.textcommend2}
              {
                <p
                  className="DeleteCommend"
                  onClick={() => commendDelete(v.id, commend.id)}
                >
                  삭제
                </p>
              }
              {<p className="Revisation">수정</p>}
            </Commend>
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
          onChange={(e) => {
            if (true) {
              textChagnge(e);
            }
          }}
          className="comment1"
          value={text1}
        ></input>
      </Post>
      <OnChangeDiv display={readBoolean}>
        <OnChangeInput
          onChange={reivisationChagnge}
          value={revisation1}
        ></OnChangeInput>
        <p onClick={() => revisationText2()}>수정</p>
        <p onClick={() => revisationCancle()}>취소</p>
      </OnChangeDiv>

      <div>{listOutput}</div>
    </>
  );
}

export default PostList;
