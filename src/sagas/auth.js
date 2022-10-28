import { take, fork, call } from "redux-saga/effects";
import { AUTH_SIGNUP } from "../actions/ActionTypes";
import { fbAuth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "../graphQueries";

function* userSignUp() {
  while (true) {
    const {
      payload: { email, password },
    } = yield take(AUTH_SIGNUP.REQUEST);

    try {
      const userCol = collection(db, "users");
      const userSnapShot = yield call(getDocs, userCol);
      const response = yield call(
        [fbAuth, createUserWithEmailAndPassword],
        fbAuth,
        email,
        password
      );
    } catch (err) {
      console.error(err);
    }
  }
}

// function* userLoginReq() {
//   while (true) {
//     const {
//       payload: { email, password },
//     } = yield take(AUTH_LOGIN.REQUEST);

//     try {
//       const res = yield call(useLazyQuery(USER_LOGIN))
//     }
//     catch(err) {
//       // 
//     }
//   }
// }

export default function* root() {
  yield fork(userSignUp);
}
