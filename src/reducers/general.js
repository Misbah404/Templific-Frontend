// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import { GET_VEHICLES } from "../actions/ActionTypes";
import { MODAL_TYPES } from "../constants";

const defaultModalsState = {};

const initialState = Immutable({
  accessToken: "",
  refreshToken: "",
  selectedIndex: 0,
  vehicleTypes: [],
  showEta: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES.SUCCESS: {
      return Immutable.merge(state, {
        vehicleTypes: action.data,
      });
    }
    default:
      return state;
  }
};
