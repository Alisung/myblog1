// redux를 이용한다?
//import produce from "immer";

import axios from "axios";
// text data 원본

// 댓글
export const ListRoad = "ListRoad";
export const ListAdd = "ListAdd";
export const ListDelete = "ListDelete";
export const CommentLoad = "CommentLoad";
export const CommentAdd = "CommentAdd";
export const ToggleComment = "ToggleComment";
export const CommentDelete = "CommentDelete";
export const Revisation = "Revisation";
export const ListRoadRequest = "ListRoadRequest";
export const ListAddRequest = "ListAddRequest";
export const ListRemoveRequest = "ListRemoveRequest";
export const CommentLoadRequest = "CommentLoadRequest";
//액션 생성 함수
export const listadd = (data1) => ({
  type: ListAdd,
  data: { textcommend: data1 },
});
export const listdelete = (data1, data2) => ({
  type: ListDelete,
  payload: parseInt(data1),
  payload2: 1,
  payload3: data2,
});
export const commentloadrequest = () => ({ type: CommentLoadRequest });
export const listroadrequest = () => ({ type: ListRoadRequest });
export const listremoverequest = () => ({ type: ListRemoveRequest });
export const listaddrequest = () => ({ type: ListAddRequest });

export const backupListData = {
  postalls: [],
};

function rootReducer(state = backupListData.postalls, action) {
  if (action.type === "ListRoadRequest") {
    return console.log("목록 불러오는중");
  } else if (action.type === "ListRoad") {
    const newstate = [...action.payload];
    console.log("new: ", newstate);
    return newstate;
  } else if (action.type === "ListAddRequest") {
    const newstate = state;
    console.log("리스트 목록 요청중");
    return newstate;
  } else if (action.type === "ListRemoveRequest") {
    const newstate = state;
    console.log("삭제준비중");
    return newstate;
  } else if (action.type === "ListAdd") {
    const newstate = state.concat({
      id: state.length + 1,
      textcommend: action.data.textcommend,
      comment: [],
      toglelist: 0,
      userId: "",
    });

    return newstate;
  } else if (action.type === "Revisation") {
    const Ravisation = state.map((index) =>
      index.id === action.payload
        ? {
            ...index,
            textcommend: action.data.changeText,
          }
        : index
    );
    return Ravisation;
  } else if (action.type === "ListDelete") {
    const payloadNum = action.payload;
    // const databaseArr = [...action.payload3];
    const filterlist = state.filter((index) => index.id !== action.payload);
    filterlist.map((index) => (index.id = action.payload2++));
    // databaseArr.comment.map((index) => {
    //   if (payloadNum < index.IdNumber) {
    //     index.IdNumber--;
    //   }
    // });
    // console.log(filterlist);
    return filterlist;
  } else if (action.type === "CommentLoad") {
    //댓글 불러오기
    const payloadArr2 = [...action.payload];

    let payloadValue = [];
    let payloadValue2 = [];
    const setState = state.map((index) => {
      payloadValue = [];
      function payloadFunc() {
        let i = 0;
        payloadArr2.map((index2) => {
          if (index2.IdNumber === index.id) {
            payloadValue2 = payloadValue.concat(index2);
            i++;
            payloadValue = [...payloadValue2];
          }
        });
      }
      function numSort() {
        let x = 1;
        payloadValue.map((index) => {
          index.id = x;
          x++;
        });
      }
      payloadFunc();
      numSort();
      return true
        ? {
            ...index,
            comment: [...payloadValue],
          }
        : index;
    });

    return setState;
  } else if (action.type === "CommentAdd") {
    const statecomment = state.map((index) =>
      index.id === action.payload
        ? {
            ...index,
            comment: [
              ...index.comment,
              {
                id: index.comment.length + 1,
                textcommend2: action.data.textcommend2,
                // 게시물 idnumber
                IdNumber: index.id,
                // 게시물 등록한 iD
                userId: "",
                // 댓글 등록한 id
                postId: "",
                count: action.data.count,
              },
            ],
          }
        : index
    );
    return statecomment;
  } else if (action.type === "CommentDelete") {
    const statecomment1 = state.map((index) =>
      index.id === action.payload3
        ? {
            ...index,
            comment: index.comment.filter(
              (index) => index.id !== action.payload
            ),
          }
        : index
    );
    statecomment1.map((index) => {
      let count = 1;
      index.comment.map((index2) => {
        index2.id = count++;
        index2.count = index2.id;
      });
    });

    return statecomment1;
  } else if (action.type === "ToggleComment") {
    const togleFliterList = state.map((index) =>
      index.id === action.payload
        ? {
            ...index,
            toglelist: !index.toglelist,
          }
        : index
    );
    return togleFliterList;
  }
}

export default rootReducer;
