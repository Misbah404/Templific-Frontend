import { take, put, call, fork } from "redux-saga/effects";
import { GET_VEHICLES } from "../actions/ActionTypes";
import { SAGA_ALERT_TIMEOUT, SOMETHING_WRONG } from "../constants";
import { getVehiclesSuccess } from "../actions/GeneralActions";
import {
  GET_VEHICLES as GET_VEHICLES_URL,
  callRequest,
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../services/Util";

function alert(message, type = "error") {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getVehicles() {
  while (true) {
    const { responseCallback } = yield take(GET_VEHICLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_VEHICLES_URL,
        {},
        "",
        {},
        ApiSauce
      );

      if (response) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null);
        alert(SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

// function* signin() {
//   while (true) {
//     const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
//     try {
//       const response = yield call(
//         callRequest,
//         USER_SIGNIN_URL,
//         payload,
//         '',
//         {},
//         ApiSauce,
//       );
//       if (response?.status ?? false) {
//         yield put(
//           userSigninSuccess(
//             // manipulateSignInAndPersonsalInfoData(response?.data ?? {}),
//             response.data
//           ),
//         );
//         if (responseCallback) responseCallback(response);
//       } else {
//         if (responseCallback) responseCallback(response);
//         alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
//       }
//     } catch (err) {
//       if (responseCallback) responseCallback({status: false});
//       alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
//     }
//   }
// }

export default function* root() {
  yield fork(getVehicles);
  // yield fork(signin)
}

// const payload = {
//   userId : 9
// }

// userSigninRequest(payload,  (response) => {
//   if(response){
//     Actions.dashboard()
//   }
//   setLoader(false)
// })