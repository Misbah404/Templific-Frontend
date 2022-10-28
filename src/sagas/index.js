import { fork } from "redux-saga/effects";
import general from "./general";
import auth from "./auth";

export default function* root() {
  yield fork(general);
  yield fork(auth)
}
