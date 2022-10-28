import _ from "lodash";
import {FontCollection} from "@hlorenzi/font";
import axios from "axios";

export const isLoggedIn = () => {
  const bol = !_
    .isEmpty
    // DataHandler.getStore().getState().authUser.accessToken
    ();

  return bol;
};

export const payNowOnAnalyticInvoice = (
  invoiceId,
  token,
  successCallBack,
  errorCallBack
) => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard/paynow`, {
    method: "POST",
    body: JSON.stringify({
      invoiceId,
    }),
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data.data) && !_.isNil(data.error)) {
        errorCallBack(data);
      } else {
        successCallBack(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAccountsOrdersEarningsDetails = (
  token,
  successCallBack,
  errorCallBack
) => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard/getaccounts`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data.data) && !_.isNil(data.error)) {
        errorCallBack(data);
      } else {
        successCallBack(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const changeCurrentPassword = (
  email,
  username,
  currentPassword,
  password,
  passwordConfirmation,
  token,
  successCallBack,
  errorCallBack
) => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/account/updatePassword`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      username,
      password,
      currentPassword,
      passwordConfirmation,
    }),

    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data.data) && !_.isNil(data.error)) {
        errorCallBack(data);
      } else {
        successCallBack(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const generateOtp = (email, successCallback = () => { }) => {
  const token = localStorage.getItem("token");

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/account/generateOtp`, {
    method: "POST",
    body: JSON.stringify({email}),
  })
    .then((res) => res.json())
    .then((data) => {
      successCallback(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const validateEmailOtp = (
  email,
  code,
  successCallback = () => { },
  errorCallback = () => { }
) => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/account/validateEmailOtp`, {
    method: "POST",
    body: JSON.stringify({
      email,
      code,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data?.data) && !_.isEmpty(data.error)) {
        errorCallback(data);
      } else successCallback(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const validateForgotPasswordOtp = (
  email,
  code,
  successCallback = () => { },
  errorCallback = () => { }
) => {
  fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/account/validateForgotPasswordOtp`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        code,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data.data) && !_.isEmpty(data.error)) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateForgotPassword = (
  email,
  code,
  password,
  confirmPassword,
  successCallback,
  errorCallback
) => {
  fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/account/updateForgotPassword`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        code,
        password,
        confirmPassword,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (_.isNil(data.data) && !_.isEmpty(data.error)) {
        errorCallback(data);
      } else {
        successCallback(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const GET_GLYPHS = async (fontFileUrl) => {
  try {
    const response = await axios.get(fontFileUrl, {
      responseType: "arraybuffer",
    });
    const fontBuffer = Buffer.from(response.data, "utf-8");

    const fontCollection = FontCollection.fromBytes(fontBuffer);
    const font = fontCollection.fonts[0];
    const allUnicodes = [...font.getUnicodeMap()];

    const allGlyphsGeometry = [];

    allUnicodes.map(async (uniCode) => {
      try {
        const geometry = String.fromCharCode(uniCode[0]);
        allGlyphsGeometry.push(geometry);
      } catch (error) {
        console.error(error);
      }
    });
    return allGlyphsGeometry;
  } catch (error) {
    console.error(error);
    return [];
  }
};
