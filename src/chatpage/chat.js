import React, { useEffect, useState } from "react";
import Header from "../header/header";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function Chatting() {
  const [text1, setText] = useState("");
  const [textList, setTextList] = useState([]);
  // let roomId = 1;
  const [roomId1, setRoomId] = useState([1, 2]);
  const [roomChange, setRoomChange] = useState(roomId1);
  // 자신이 작성한 글은 왼쪽에, 다른 사용자가 작성한 글은 오른쪽에
  const [alignBool, setAlignBool] = useState(null);
  let socketId = sessionStorage.getItem("loginId");
  const textChange = (e) => {
    setText(e.target.value);
  };

  const joinRoom = (roomid) => {
    setRoomChange(roomid);

    socket?.emit("join_room", socketId, roomid);
  };
  const leaveRoom = (index) => {
    setTextList([]);
    socket.emit("leaveroom", socketId, index);
  };
  const sendText = () => {
    socket?.emit("sendText", { username: socketId, text: text1 });
    setTextList([
      ...textList,
      {
        id: socketId,
        text: text1,
        align: true,
      },
    ]);
    console.log(textList);
  };
  useEffect(() => {
    socket?.on("userTextEmit", (textdata) => {
      // console.log("되긴되나?", textdata);
      if (textdata.username2 === socketId) {
        setAlignBool(true);
      } else {
        setAlignBool(false);
      }

      setTextList([
        ...textList,
        {
          id: textdata.username2,
          text: textdata.text2,
          align: false,
        },
      ]);
    });
    socket?.on("join_msg", (textdata) => {
      setTextList([...textList, { text: textdata.message }]);
    });
    socket?.on("leave_msg", (textdata) => {
      setTextList([...textList, { text: textdata.message }]);
    });
    // return () => {
    //   socket.off("userTextEmit");
    // };
  }, [textList]);
  useEffect(() => {
    console.log("하하 : ", textList);
  }, [textList]);

  const roomList =
    roomId1 &&
    roomId1.map((index) => (
      <>
        <button onClick={() => joinRoom(index)}>방 {index} 입장</button>
        <button onClick={() => leaveRoom(index)}>나가기</button>
      </>
    ));
  return (
    <>
      <Header></Header>
      {roomList}
      <ChatBox>
        {textList &&
          textList.map((index) => (
            <Alignbox align={index.align}>
              <p>{index.id}</p>
              <p>{index.text}</p>
            </Alignbox>
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
const Alignbox = styled.div`
  text-align: ${(props) => (props.align ? "left" : "right")}; ;
`;
