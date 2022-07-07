import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const AllList = styled.div`
  margin: 5% 0 0 26%;
  width: 600px;

  height: auto;
  border: solid 1px #333;
  & .posttext {
    width: 500px;
    height: 100px;
    border: solid 1px #333;
  }
  & .deletebox {
    float: right;
  }
  & .commentlist {
    float: right;
  }
`;
const RavisationTag = styled.p`
  display: ${(props) => (props.display1 ? "none" : "block")};
  float: right;
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
  userid,
  deletelist,
  comment,
  commentList,
  commendAdd2,
  commend,
  commend2,
  commendAll,
  revisationText,
  readBoolean,

  onChangeValue,
  revisationToggle,
}) {
  const [contextvalue, contextvalue2] = useState("");
  function changeValue(e) {
    contextvalue2(e.target.value);
  }

  useEffect(() => {
    sessionStorage.setItem("commendText", contextvalue);
    // const text = sessionStorage.getItem("commendText");
    // if (text !== "") {
    // }
  }, [contextvalue]);

  function clearText() {
    const a = sessionStorage.getItem("commendText");
    contextvalue2(a);
  }
  return (
    <>
      <AllList>
        <div className="posttext" readOnly>
          <p>
            {userid} : {text}
          </p>
        </div>
        <p className="deletebox" onClick={deletelist}>
          삭제
        </p>
        <p className="commentlist" onClick={commentList}>
          댓글
        </p>
        <RavisationTag onClick={revisationText} display1={revisationToggle}>
          수정
        </RavisationTag>
        <Contextlist display={comment}>
          <input onChange={changeValue} value={contextvalue}></input>
          <p
            onClick={() => {
              commendAdd2();
              clearText();
            }}
          >
            댓글등록
          </p>

          <ul>{commendAll}</ul>
        </Contextlist>
      </AllList>
    </>
  );
}

export default PostListAll;
