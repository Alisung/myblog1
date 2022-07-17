import React, { useEffect, useState } from "react";
import Header from "../header/header";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function Chatting() {
  const [text1, setText] = useState("");
  const [textList, setTextList] = useState([]);
  let socketId = sessionStorage.getItem("loginId");
  const textChange = (e) => {
    setText(e.target.value);
  };
  const joinRoom = () => {
    socket.emit("join_room", socketId);
  };
  const sendText = () => {
    socket.emit("sendText", { username: socketId, text: text1 });
    setTextList([
      ...textList,
      {
        id: socketId,
        text: text1,
      },
    ]);
    console.log(textList);
  };
  useEffect(() => {
    socket.on("userTextEmit", (textdata) => {
      // console.log("되긴되나?", textdata);
      setTextList([
        ...textList,
        {
          id: textdata.username2,
          text: textdata.text2,
        },
      ]);
    });
  }, [textList]);
  useEffect(() => {
    console.log("하하 : ", textList);
  }, [textList]);

  return (
    <>
      <Header></Header>
      <button onClick={joinRoom}>입장</button>
      <ChatBox>
        {textList &&
          textList.map((index) => (
            <div>
              <p>{index.id}</p>
              <p>{index.text}</p>
            </div>
          ))}
      </ChatBox>
      <InputBox onChange={textChange} value={text1}></InputBox>
      <button onClick={sendText}>등록</button>
    </>
  );
}

export default Chatting;

const ChatBox = styled.div`
  overflow: auto;
  margin-left: 300px;
  margin-top: 100px;
  width: 250px;
  height: 350px;
  border: 1px solid #333;
`;
const InputBox = styled.input`
  margin-left: 300px;
`;
const InputButton = styled.button`
  margin-left: 300px;
`;
