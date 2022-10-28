// @flow

import { GET_VEHICLES } from "./ActionTypes";

export function getVehiclesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_VEHICLES.REQUEST,
  };
}
