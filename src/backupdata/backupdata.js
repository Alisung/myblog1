// redux를 이용한다?
//import produce from "immer";

// text data 원본
const backupListData = {
  postalls: [],
};
// 댓글

export const ListAdd = "ListAdd";
export const ListDelete = "ListDelete";
export const CommentAdd = "CommentAdd";
export const ToggleComment = "ToggleComment";
export const CommentDelete = "CommentDelete";
export const Revisation = "Revisation";
export const ListAddRequest = "ListAddRequest";
export const ListRemoveRequest = "ListRemoveRequest";
//액션 생성 함수
export const listadd = (data1) => ({
  type: ListAdd,
  data: { textcommend: data1 },
});
export const listdelete = (data1) => ({
  type: ListDelete,
  payload: parseInt(data1),
  payload2: 1,
});
export const listremoverequest = () => ({ type: ListRemoveRequest });
export const listaddrequest = () => ({ type: ListAddRequest });

function rootReducer(state = backupListData.postalls, action) {
  if (action.type === "ListAddRequest") {
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
      toglelist: false,
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
    const filterlist = state.filter((index) => index.id !== action.payload);
    filterlist.map((index) => (index.id = action.payload2++));
    // console.log(filterlist);
    return filterlist;
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
      action.payload2 = 1;
      index.comment.map((index2) => (index2.id = action.payload2++));
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
