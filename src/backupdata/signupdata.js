// 회원가입 reducer구현
export const singupData = [];

export const SIGN_UP = "SIGN_UP";

export const signup = (id, password, name, email) => ({
  type: SIGN_UP,
  data: { id: id, password: password, name: name, email: email },
});

function signupReducer(state = singupData, action) {
  if (action.type === "SIGN_UP") {
    let setstate = state;
    setstate = [
      ...setstate,
      {
        id: action.data.id,
        password: action.data.password,
        name: action.data.name,
        email: action.data.email,
      },
    ];
    console.log("회원가입 리스트 : ", setstate);
    return setstate;
    // setstate = setstate.concat({
    //   id: action.data.id,
    //   password: action.data.password,
    //   name: action.data.name,
    //   email: action.data.email,
    // });
  } else return state;
}

export default signupReducer;
