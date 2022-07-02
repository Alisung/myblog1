import axios from "axios";
import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import {
  ListRoad,
  ListAddRequest,
  ListRemoveRequest,
  listadd,
  ListAdd,
  ListDelete,
  listdelete,
  CommentAdd,
  CommentLoad,
  commentloadrequest,
  ToggleComment,
  CommentDelete,
  Revisation,
  ListRoadRequest,
  CommentLoadRequest,
} from "../backupdata/backupdata";

function getPostApi() {
  return axios.get("/api/postlist");
}
function* loadCommend() {
  const response = yield call(getPostApi);
  console.log("res-commend:", response.data.array2);
  yield put({ type: CommentLoad, payload: response.data.array2 });
}
function* loadpost() {
  const response = yield call(getPostApi);
  console.log("res-post:", response.data.array1);
  yield put({ type: ListRoad, payload: response.data.array1 });
}
function* addPost() {
  const callText = sessionStorage.getItem("Text1");
  console.log("포스트 등록");
  yield delay(1000);
  yield put(listadd(callText));
}
function removepostApi() {
  return axios.get("/api/postlist");
}
function* removePost() {
  const response = yield call(removepostApi);
  const calltext = sessionStorage.getItem("DelelteNum");
  yield delay(1000);
  yield put(listdelete(calltext, response.data.array2));
}
function* watchPostload() {
  yield takeLatest(ListRoadRequest, loadpost);
}
function* watchCommentload() {
  yield takeLatest(CommentLoadRequest, loadCommend);
}
function* watchAddPost() {
  yield takeLatest(ListAddRequest, addPost);
}
function* watchRemovePost() {
  yield takeLatest(ListRemoveRequest, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchPostload),
    fork(watchCommentload),
  ]);
}
