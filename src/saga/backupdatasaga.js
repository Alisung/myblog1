import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import {
  ListAddRequest,
  ListRemoveRequest,
  listadd,
  ListAdd,
  ListDelete,
  listdelete,
  CommentAdd,
  ToggleComment,
  CommentDelete,
  Revisation,
} from "../backupdata/backupdata";

function* addPost() {
  const callText = sessionStorage.getItem("Text1");
  console.log("포스트 등록");
  yield delay(1000);
  yield put(listadd(callText));
}
function* removePost() {
  const calltext = sessionStorage.getItem("DelelteNum");
  yield delay(1000);
  yield put(listdelete(calltext));
}
function* watchAddPost() {
  yield takeLatest(ListAddRequest, addPost);
}
function* watchRemovePost() {
  yield takeLatest(ListRemoveRequest, removePost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost)]);
}
