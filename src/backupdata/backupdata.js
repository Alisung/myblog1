import { List } from "immutable";

// redux를 이용한다?
//import produce from "immer";

// text data 원본
const backupListData = [];
// 댓글

export const ListAdd = "ListAdd";
export const ListDelete = "ListDelete";
export const CommentAdd = "CommentAdd";
export const ToggleComment = "ToggleComment";

export let count = 1;
function rootReducer(state = backupListData, action) {
  if (action.type === "ListAdd") {
    const newstate = state.concat({
      id: state.length + 1,
      textcommend: action.data.textcommend,
      comment: [],
      toglelist: true,
    });
    count++;

    return newstate;
  } else if (action.type === "ListDelete") {
    const filterlist = state.filter((index) => index.id !== action.payload);
    state.map((index) => (index.id = action.payload2++));
    // console.log(filterlist);
    return filterlist;
  } else if (action.type === "CommentAdd") {
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
