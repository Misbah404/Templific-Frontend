// @flow
import _ from "lodash";
import {
  API_LOG,
  ERROR_SOMETHING_WENT_WRONG,
  BASE_URL,
  REQUEST_TYPE,
  ERROR_SESSION_EXPIRED,
  ERROR_NETWORK_NOT_AVAILABLE,
  ABORT_REQUEST_MESSAGE,
  API_TIMEOUT,
} from "../config/WebService";
import DataHandler from "../services/DataHandler";

import Util from "../services/Util";
import { FAILED_TO_FETCH, INTERNET_ERROR, SOMETHING_WRONG } from "../constants";

const getOptions = (reqType, data, headers) => {
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, API_TIMEOUT);
  const options = Object.assign({ method: reqType });
  options.credentials = "include";
  if (reqType !== REQUEST_TYPE.GET) options.body = JSON.stringify(data);
  options.headers = {
    ...headers,
    ...{
      Accept: "application/json",
      "Content-Type": "application/json",
      dataType: "json",
    },
  };
  options.signal = controller.signal;
  return options;
};

const onForbidden = async () => {
  const newToken = await Util.refreshAccessToken();
  if (newToken) {
    return newToken;
  }

  return false;
};
class RequestAbort extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ForcedAbortRequest"; // (2)
  }
}

class ApiSauce {
  async post(url, data, headers, baseUrl) {
    // if (_.isEmpty(data._csrf)) {
    //   try {
    //     // Below function will store new CSRF token
    //     const newToken = await Util.getCsrfToken();
    //     data._csrf = newToken;
    //   } catch (err) {
    //     Util.topAlertError('Network error');
    //   }
    // }
    if (API_LOG) {
      //
    }
    try {
      const response = await fetch(
        `${baseUrl || BASE_URL}${url}`,
        getOptions(REQUEST_TYPE.POST, data, headers)
      );

      // return this.manipulateResponse(response);

      if (response.status === 403) {
        try {
          // Below function will store new CSRF token
          const newToken = await onForbidden();

          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`;
          } else {
            return false;
          }
        } catch (err) {
          Util.topAlertError(SOMETHING_WRONG);
        }

        const responseNew = await fetch(
          `${baseUrl || BASE_URL}${url}`,
          getOptions(REQUEST_TYPE.POST, data, headers)
        );

        return this.manipulateResponse(responseNew);
      } else {
        return this.manipulateResponse(response);
      }
    } catch (err) {
      return this.catchResponseError(err);
    }
  }
  catchResponseError(err) {
    if (err.name === "AbortError") {
      throw new RequestAbort(ABORT_REQUEST_MESSAGE);
    } else {
      console.error("Uh oh, an error!", err);
      return {
        status: false,
        message:
          err.message == "Failed to fetch" ? FAILED_TO_FETCH : err.message,
      };
    }
  }
  async get(url, data, headers, baseUrl) {
    try {
      const response = await fetch(
        `${baseUrl || BASE_URL}${url}`,
        getOptions(REQUEST_TYPE.GET, data, headers)
      );

      if (API_LOG) {
        //
      }
      return this.manipulateResponse(response);
    } catch (err) {
      return this.catchResponseError(err);
    }
  }

  async manipulateResponse(response) {
    try {
      const responseJson = await response.json();

      return new Promise((resolve, reject) => {
        if (response) {
          if (response.status === 200) {
            resolve(responseJson);
          } else {
            if (response.status === 403) {
              reject(ERROR_SESSION_EXPIRED);
            }
            reject(responseJson || ERROR_SOMETHING_WENT_WRONG);
          }
        } else {
          reject(responseJson || ERROR_SOMETHING_WENT_WRONG);
        }
      });
    } catch (err) {
      return err;
    }
  }
}

export default new ApiSauce();
