// redux를 이용한다?
//import produce from "immer";

// text data 원본
export const backupListData = [
  {
    textcommend: "",
  },
];
// 추가해줄 text
export const backuplistcomment = {
  textcommend: "",
};
export let listclone;
export const ListAdd = "ListAdd";
export const ListDelete = "ListDelete";

// function rootReducer(state = backupListData, action) {
//   switch (action.type) {
//     case ListAdd:
//       return produce(state, (draft) => {
//         state = [...state, backuplistcomment];
//       });
//     case ListDelete:
//       return {};
//     default:
//       return state;
//   }
// }
function rootReducer(state = backupListData, action) {
  if (action.type === "ListAdd") {
    // state.concat(backuplistcomment.textcommend);

    state = [...state, backupListData];
    //state.push(backuplistcomment);
    //state = listclone;
    return state;
  }
  if (action.type === "ListDelete") {
    state.filter((index) => index.textcommend !== state.textcommend);
    return state;
  }
}

export default rootReducer;
