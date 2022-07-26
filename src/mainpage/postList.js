import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostListAll from "./postListAll";
import { Link } from "react-router-dom";
import {
  ListRoad,
  listroad,
  listadd,
  listdelete,
  ListAdd,
  ListDelete,
  ToggleComment,
  CommentAdd,
  CommentDelete,
  Revisation,
  listroadrequest,
  listaddrequest,
  listremoverequest,
  commentloadrequest,
} from "../backupdata/backupdata";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function PostList() {
  //불러오기
  // const [testcase1, testcase2] = useState([]);

  // const callApi = () => {
  //   axios.get("/api/postlist").then((res) => {
  //     console.log(res.data.array1);
  //     testcase2(res.data.array1);
  //   });

  //   // dispatch({ type: ListRoad, data: testcase1 });
  // };
  // DB INSERT
  const insertApi = (text, loginid) => {
    axios
      .post("/api/postlist", {
        textcommend: text,
        toglelist: 0,
        userId: loginid,
      })
      .then((res) => {
        console.log("Ist_DB : ", res.data);
      });
  };

  const deleteApi = (text) => {
    axios.post(`/api/postlist/:id`, { id: text }).then((res) => {
      console.log("Del_DB : ", res.data);
    });
  };

  const changeData = (value, text) => {
    axios
      .post(`/api/postlist/:id/edit`, {
        id: value,
        textcommend: text,
      })
      .then((res) => {
        console.log("Change_DB : ", res.data);
      });
  };
  // 댓글을 DB에 추가
  const commendInsertdata = (Id, text, count, postid) => {
    axios
      .post(`/api/postlist/:id/editcommend`, {
        textcommend2: text,
        userId: "",
        postId: postid,
        IdNumber: Id,
        count: count,
      })
      .then((res) => {
        console.log("commend_DB : ", res.data);
      });
  };
  const commendDeletedata = (idnum, commnedid, IdNumber) => {
    axios
      .post(`/api/postlist/:id/delCommend`, {
        id: idnum,
        id2: commnedid,
        IdNumber: IdNumber,
      })
      .then((res) => {
        console.log("del-commend", res.data);
      });
  };
  //    위쪽은
  //    axios DB연동
  //
  //
  const listCloneData = useSelector((state) => state.postReducer);
  const loginCloneData = useSelector((state) => state.logInReducer);
  const dispatch = useDispatch();

  // 두 개 만들어서 하나는 입력필드, 하나는 출력 필드에 출력하는 방법.
  // 입력시 text 변환 객체
  const [text1, text2] = useState("");
  const [cotext1, cotext2] = useState("");

  const coTextChange = (e) => {
    cotext2(e.target.value);
  };
  useEffect(() => {
    dispatch(listroadrequest());

    dispatch(commentloadrequest());
  }, []);

  useEffect(() => {
    console.log("listCloneData", listCloneData);
    console.log("logindata", loginCloneData);
  }, [listCloneData]);

  const textChagnge = (e) => {
    text2(e.target.value);
  };

  const textAdd = (text) => {
    const logInId = sessionStorage.getItem("loginId");

    if (text === "") {
      return;
    }
    sessionStorage.setItem("Text1", text);
    insertApi(text, logInId);
    //dispatch({ type: ListAdd, data: { textcommend: text1 } });
    dispatch(listaddrequest());
    // dispatch(listadd(text1));

    text2("");
  };
  const deleteList = (id) => {
    sessionStorage.setItem("DelelteNum", id);
    deleteApi(id);
    // sessionStorage.setItem("DelelteNum2", 1);
    //dispatch({ type: ListDelete, payload: id, payload2: 1 });
    dispatch(listremoverequest());
  };
  // 댓글 숨기기
  const commentExpend = (id) => {
    dispatch({ type: ToggleComment, payload: id });
  };
  //댓글 등록
  const [commendcount, commendcount2] = useState(null);
  const [vid, vid2] = useState(0);

  const commendAdd2 = (v) => {
    // setPostId(sessionStorage.getItem("loginId"));
    const postId = sessionStorage.getItem("loginId");
    let IdnumberMax = [...v.comment];
    commendcount2(IdnumberMax.length + 1);
    cotext2(sessionStorage.getItem("commendText"));
    if (cotext1 == "") {
      return;
    }

    console.log("크기 : ", IdnumberMax.length);
    console.log(v.id, vid);
    if (v.id !== vid) {
      commendcount2(IdnumberMax.length);
    }
    vid2(v.id);
    commendcount2(IdnumberMax.length);
    console.log("count : ", commendcount);
    dispatch({
      type: CommentAdd,
      data: {
        textcommend2: cotext1,
        count: commendcount,
        userid: v.id,
        postid: postId,
      },
      payload: v.id,
    });
    commendInsertdata(v.id, cotext1, commendcount, postId);

    sessionStorage.setItem("commendText", "");
    cotext2("");
  };
  const commendDelete = (v, commendId, IdNumber) => {
    console.log("삭제대상 : ", commendId);
    dispatch({
      type: CommentDelete,
      payload: commendId,
      payload2: 1,
      payload3: v,
    });
    commendDeletedata(v, commendId, IdNumber);
  };
  // 게시물 수정
  const [revisation1, revisation2] = useState("");
  // 게시물 수정버튼을 Click한 객체의 id를 저장할 변수
  const [getRevisation1, getRevisation2] = useState("");
  // 게시물 수정란의 toggle 여부
  const [readBoolean, readBoolean2] = useState(false);

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
  const postEqulsLoginId = (userId) => {
    const loginidBool = sessionStorage.getItem("loginId");
    if (loginidBool === userId) {
      return false;
    } else {
      return true;
    }
  };
  const commendRevisationLoginId = (postId) => {
    const loginidBool = sessionStorage.getItem("loginId");
    if (loginidBool === postId) {
      return true;
    } else {
      return false;
    }
  };
  // 수정 버튼을 클릭시 게시물 수정하는 함수
  const revisationText2 = () => {
    listCloneData.map((index) => {
      if (index.id == getRevisation1) {
        if (reivisationChagnge) {
          changeData(getRevisation1, revisation1);
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
  const coTextChangeFung = (e) => {
    coTextChange(e);
  };

  const listOutput =
    listCloneData &&
    listCloneData.map((v) => (
      <>
        <PostListAll
          key={v.id}
          name={v}
          text={v.textcommend}
          userid={v.userId}
          deletelist={() => deleteList(v.id)}
          commentList={() => commentExpend(v.id)}
          comment={v.toglelist}
          commend={coTextChangeFung}
          commend2={cotext1}
          commendAdd2={() => commendAdd2(v)}
          revisationText={() => revisationText(v)}
          revisationToggle={postEqulsLoginId(v.userId)}
          deleteToggle={postEqulsLoginId(v.userId)}
          onChangeText={reivisationChagnge}
          commendAll={
            v.comment &&
            v.comment.map((commend) => (
              <Commend>
                {commend.postId} : {commend.textcommend2}
                {
                  <DeleteCommend
                    display1={commendRevisationLoginId(commend.postId)}
                    onClick={() =>
                      commendDelete(v.id, commend.id, commend.IdNumber)
                    }
                  >
                    삭제
                  </DeleteCommend>
                }
                {/* {<p className="Revisation">수정</p>} */}
              </Commend>
            ))
          }
        ></PostListAll>
      </>
    ));
  return (
    <>
      <Post>
        <p type="button" className="ptag" onClick={() => textAdd(text1)}>
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
    display: ${(props) => (props.display ? "block" : "none")};
  }
  & .Revisation {
    float: right;
  }
`;
const DeleteCommend = styled.p`
  float: right;
  display: ${(props) => (props.display1 ? "block" : "none")};
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
{
  /* <p type="button" onClick={() => callApi()}>
        잠깐테스트
      </p>
      <input onChange={handleChange} />
      <button onClick={insertApi}>Submit</button>
      <button onClick={deleteApi}>del</button>
      <ul>
        {testcase1 &&
          testcase1.map((user) => (
            <div>
              <li key={user.id}>
                {user.id} : {user.textcommend}
              </li>
              <button onClick={() => changeData(user.id)}>수정</button>
              <Link to={`/user:${user.id}`}>이동</Link>
            </div>
          ))}
      </ul> */
}
