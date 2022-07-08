export const logInData = {
  id: "",
  password: "",
};
export const logInAction = "logInAction";
export const loginaction = (id, password) => ({
  type: logInAction,
  idData: id,
  passwordData: password,
});
function logInReducer(state = logInData, action) {
  if (action.type === "logInAction") {
    let setstate = {
      ...state,
      id: action.idData,
      password: action.passwordData,
    };

    return setstate;
  }
  return state;
}

export default logInReducer;
