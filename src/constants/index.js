import { Images } from "../theme";
import { Route } from "react-router-dom";
import { v4 as uuid } from "uuid";

import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";
import image5 from "../assets/image5.svg";
import image6 from "../assets/image6.svg";
import image7 from "../assets/image7.svg";
// import image8 from "../assets/image8.png";
// import image9 from "../assets/images/bkground/bkground.svg";

export const SAGA_ALERT_TIMEOUT = 500;

// URLS
export const URL_WEBSITE = "https://www.kiffgo.com";

// date time formats
export const DATE_FORMAT1 = "Do MMMM YYYY, HH:mm";
export const DATE_FORMAT2 = "Do MMM";
export const DATE_FORMAT3 = "Do MMM YYYY";
export const DATE_FORMAT4 = "DD/MM/YYYY";
export const DATE_TIME_FORMAT1 = "YYYY-MM-DD HH:mm";
export const DATE_TIME_FORMAT2 = "MMM D HH A";
export const DATE_TIME_FORMAT3 = "HH:mm DD-MM-YYYY";
export const DATE_TIME_FORMAT4 = "dddd Do MMM, YYYY @ HH:mm";
export const DATE_TIME_FORMAT5 = "dddd Do MMM, YYYY @ hh: mm a";
export const DATE_TIME_FORMAT6 = "D MMM YYYY at HH: mm";
export const DATE_TIME_FORMAT7 = "HH:mm (DD MMM)";
export const DATE_TIME_FORMAT_BULK = "DD/MM/YYYY HH:mm";

export const TIME_FORMAT1 = "HH:mm";
export const TIME_FORMAT2 = "H [h] : mm [min]";
export const TIME_FORMAT3 = "hh A";
export const TIME_FORMAT4 = "hh:mm A";
export const TIME_DAY_FORMAT3 = "ddd - HH:mm";
export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const SERVER_TIME_ZONE = "Europe/London";

// Messages

export const INVALID_NAME_ERROR = "Invalid name";
export const INVALID_ADDRESS_ERROR = "Invalid address";
export const INVALID_EMAIL_ERROR = "Invalid email";
export const INVALID_PASSWORD =
  "Password must have one number, one special character with minimum characters 6 and maximum 16";
// export const INVALID_PASSWORD = "Use 6 characters or more for your password";
export const CONFRIM_PASSWORD_MISMATCH_ERROR = "Confirm password mismatch";
export const INTERNET_ERROR = "Please connect to the working internet";
export const SESSION_EXPIRED_ERROR = "Session expired, Please login again";
export const SOMETHING_WRONG = "Something went wrong";
export const PASSWORD_RESET_SUCCESS_MSG =
  "Your password has been reset successfully. Use this new password to get logged-in again and enjoy our hassle free services.";
export const IS_REQUIRED_ERROR = "This field is required";
export const PHONE_IS_REQUIRED_ERROR = "Phone field is required";
export const NAME_IS_REQUIRED_ERROR = "Name field is required";
export const INVALID_PHONE_ERROR = "Invalid phone number";
export const SEND_INVOICE_SUCCESSFULLY = "Invoice sent successfully";

// Message types
export const MESSAGE_TYPES = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
};

// Message types
export const USER_LOGIN_THEME = {
  DARK: "dark",
  LIGHT: "light",
};

// File Types
export const FILE_TYPES = { VIDEO: "video", IMAGE: "image", AUDIO: "audi" };

export const FAILED_TO_FETCH = "Failed to fetch, try to refresh the page";
export const DEV_ENV = "dev";
export const PROD_ENV = "prod";

export const ROUTES = {
  HOME: "/",
  RESET_PASSWORD: "/reset-password",
  PAGE_NOT_FOUND: "/PageNotFound",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CODE_CONFIRMATION: "/code-confirmation",
  PAYMENT: "/payment",
  FORGOT_PASSWORD: "/forgot-password",
  NEW_PASSWORD: "/new-password",
  CONNECT: "/connect",
  DASHBOARD: "/dashboard",
  DASHBOARD_CREATE: "/dashboard/create",
  EDIT_TEMPLATE: "/template/edit/:id",
  SETTINGS: "/settings",
  SETTINGS_SUBSCRIBTION: "/settings/subscribtion",
  SETTINGS_PASSWORD: "/settings/password",
  ANALYTICS: "/settings/analytics",
  TERMS_OF_USE: "/terms-of-use",
  PRIVACY_POLICY: "/privacy-policy",
  POLOTNO: "/polotno",
  KONVA: "/konva",
  SELECT_TEMPLATE: "/select-template",
  ETSY_AUTH: "/etsy/auth",
  TEMPLATE_DEMO: "/templates/demo/:demoId",
  TEMPLATE_TRANSACTION: "/template/transaction/:transactionId",
  TEMPLATE_GROUP_DEMO: "/templates/group/demo/:demoId",
  TEMPLATE_GROUP_TRANSACTION: "/templates/group/transaction/:transactionId",
};

export const EMAIL_REGEX =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';

export const strings = {
  TEMPLIFIC: "templific",
  HOME: "Home",
  TAG_LINE: "easily create and sell templates",
  LOG_IN: "Log in",
  LOGIN: "Login",
  SIGN_UP: "Sign up",
  SIGNUP: "Signup",
  FORGOT_PASSWORD: "Forgot Password",
  EMAIL: "Email",
  CANT_LOGIN: "Can’t log in?",
  NEW_PASSWORD: "New Password",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
  VERIFY_EMAIL: "Verify Email",
  WRONG_EMAIL: "Wrong Email ?",
  DONT_RECEIVED_CODE: "Didn’t receive a code?",
  RESEND_CODE: "Resend Code",
  ENTER4DIGITSCODE: "Please enter the 4 digit code",
  CODE_TIME: 60,
  CREDITCARD_OR_PAYPAL: "Credit Card or Paypal",
  NAME_ON_CREDITCARD: "Name on Credit Card",
  CREDITCARD_NUMBER: "Credit Card Number",
  CREDITCARD_EXPIRY: "mm/yy",
  CREDITCARD_CVC: "Enter CVC Code",
  PAYPAL: "PayPal",
  SEND_LINK: "Send Recovery Code",
  UPDATE_PASSWORD: "Update Password",
  LATER: "Do it later?",
};

export const CHECKBOX_THEME = {
  THEME1: "theme1",
  THEME2: "theme2",
  THEME3: "theme3",
  THEME4: "theme4",
};

export const homeMenuItems = [
  {
    name: "template",
    // link: "/template",
    image: Images.templates,
  },
  {
    name: "group templates",
    // link: "/template",
    image: Images.templateGroup,
  },
  {
    name: "bkground",
    image: Images.bkground,
    imageAlternate: Images.bkgroundWhite,
  },
  {
    name: "text",
    image: Images.text,
  },
  {
    name: "elements",
    image: Images.elements,
  },
  {
    name: "photos",
    image: Images.photos,
  },
  {
    name: "stats",
    link: ROUTES.ANALYTICS,
    image: Images.analytics,
  },
];

export const settingMenuItems = [
  {
    name: "settings",
    link: "/settings",
    bottomAlign: true,
    image: Images.settings,
  },
];

export const settingInnerMenu = [
  {
    name: "payment",
    link: ROUTES.SETTINGS,
    image: Images.creditCard,
  },
  {
    name: "subscribtion",
    link: ROUTES.SETTINGS_SUBSCRIBTION,
    image: Images.subscribe,
  },
  {
    name: "password",
    link: ROUTES.SETTINGS_PASSWORD,
    image: Images.lock,
  },
];

export const DEFAULT_COLORS = [
  [
    { color: "#ffbbcc", id: uuid() },
    { color: "#ffcccc", id: uuid() },
    { color: "#ffddcc", id: uuid() },
    { color: "#ecd3de", id: uuid() },
  ],
  [
    { color: "#f1f3f6", id: uuid() },
    { color: "#000000", id: uuid() },
    { color: "#1b2a49", id: uuid() },
    { color: "#465881", id: uuid() },
  ],
  [
    { color: "#01909e", id: uuid() },
    { color: "#c9d1d3", id: uuid() },
    { color: "#a4d7e1", id: uuid() },
    { color: "#72c4e4", id: uuid() },
  ],
  [
    { color: "#f1dbb1", id: uuid() },
    { color: "#f6edd0", id: uuid() },
    { color: "#d2edf6", id: uuid() },
    { color: "#a7ecf9", id: uuid() },
  ],
];

export const alignMent = [
  { align: "left", icon: Images.alignLeftIcon },
  { align: "center", icon: Images.alignCenterIcon },
  { align: "right", icon: Images.alignRightIcon },
  { align: "justify", icon: Images.alignJustifyIcon },
];

export const textTransform = [
  { name: "aa", val: "lowerCase", icon: Images.lowerCaseIcon },
  { name: "AA", val: "upperCase", icon: Images.upperCaseIcon },
  { name: "Aa", val: "capitalize", icon: Images.capitalIcon },
];

export const positionData = {
  // positions: [
  //   { name: "send to back", action: "back", icon: Images.backIcon },
  //   { name: "send backward", action: "backward", icon: Images.backwardIcon },
  //   { name: "Bring to Front", action: "front", icon: Images.forwardIcon },
  //   { name: "Bring Forward", action: "forward", icon: Images.toForwardIcon },
  // ],
  alignment: [
    { name: "Top", action: "top", icon: Images.topIcon },
    { name: "left", action: "left", icon: Images.leftIcon },
    { name: "middle", action: "middle", icon: Images.middleIcon },
    { name: "center", action: "center", icon: Images.centerIcon },
    { name: "bottom", action: "bottom", icon: Images.bottomIcon },
    { name: "right", action: "right", icon: Images.rightIcon },
  ],
};

export const textFilesExtensions = ["ttf", "woff", "woff2", "otf"];
export const imageFilesExtension = ["png", "jpg", "svg", "jpeg", "gif"];

// export const RANDOM_ELEMENTS = [
//   {
//     color: "#00A1FF",
//     isLocked: false,
//     name: "ellipse",
//     opacity: 1,
//     type: "ellipse",
//     icon: Images.circleIcon,
//     name2: "circle",
//   },

//   {
//     color: "#00A1FF",
//     isLocked: false,
//     name: "rect",
//     opacity: 1,
//     type: "rect",
//     icon: Images.rectIcon,
//     name2: "square",
//   },

//   {
//     name: "star",
//     type: "star",
//     icon: Images.starIcon,
//     name2: "star",
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "triangle",
//     opacity: 1,
//     name2: "triangle",
//     icon: Images.triangleIcon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [0, pointValue + pointValue],
//         [pointValue + pointValue, pointValue + pointValue],

//         // [pointValue - pointValue / 2, pointValue + pointValue / 2],
//         // [pointValue + pointValue / 2, pointValue + pointValue / 2],
//       ];
//     },
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "triangle2",
//     name2: "triangle",
//     opacity: 1,
//     icon: Images.triangle2Icon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [pointValue, pointValue + pointValue / 2],
//         [pointValue + pointValue / 2, pointValue + pointValue / 2],
//       ];
//     },
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "fiveSide",
//     name2: "pentagon",
//     opacity: 1,
//     icon: Images.poly5Icon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [pointValue - pointValue / 3, pointValue + pointValue / 4],
//         [pointValue - pointValue / 4, pointValue * 2 - pointValue / 4],
//         [pointValue + pointValue / 4, pointValue * 2 - pointValue / 4],
//         [pointValue + pointValue / 3, pointValue + pointValue / 4],
//       ];
//     },
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "hexa",
//     name2: "hexagon",
//     opacity: 1,
//     icon: Images.poly6Icon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [pointValue - pointValue / 2, pointValue + pointValue / 2],
//         [pointValue, pointValue * 2],
//         [pointValue * 2, pointValue * 2],
//         [pointValue * 2 + pointValue / 2, pointValue + pointValue / 2],
//         [pointValue * 2, pointValue],
//       ];
//     },
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "arrow",
//     name2: "arrow",
//     opacity: 1,
//     icon: Images.arrowElementIcon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [pointValue * 2, pointValue],
//         [pointValue * 2, pointValue - pointValue / 8],
//         [pointValue * 2.25, pointValue + pointValue / 16],
//         [pointValue * 2, pointValue + pointValue / 8 + pointValue / 8],
//         [pointValue * 2, pointValue + pointValue / 8],
//         [pointValue, pointValue + pointValue / 8],

//         // [pointValue * 3, pointValue],
//         // [pointValue * 3, pointValue - pointValue / 4],
//         // [pointValue * 3.5, pointValue + pointValue / 8],
//         // [pointValue * 3, pointValue + pointValue / 4 + pointValue / 4],
//         // [pointValue * 3, pointValue + pointValue / 4],
//         // [pointValue, pointValue + pointValue / 4],
//       ];
//     },
//   },

//   {
//     color: "#00A1FF",
//     isFinished: true,
//     isLocked: false,
//     name: "polygon",
//     type: "save",
//     name2: "bookmark",
//     opacity: 1,
//     icon: Images.polySaveIcon,
//     getPoints(pointValue) {
//       return [
//         [pointValue, pointValue],
//         [pointValue, pointValue * 2],
//         [pointValue + pointValue / 2, pointValue * 2 - pointValue / 2],
//         [pointValue * 2, pointValue * 2],
//         [pointValue * 2, pointValue],
//       ];
//     },
//   },
// ];

export const contextMenuData = [
  { name: "Copy", icon: Images.copyIcon },
  { name: "Paste", icon: Images.pasteIcon },
  { name: "Delete", icon: Images.trashIcon },
  { name: "Clone", icon: Images.cloneIcon },
  { name: "Send Backward", icon: Images.backwardIcon },
  { name: "Send Back", icon: Images.backIcon },
  { name: "Send Forward", icon: Images.forwardIcon },
  { name: "Send to Front", icon: Images.toForwardIcon },
];

export const LOCAL_IMAGES = {
  image1: {
    isDeleted: false,
    url: image1,
  },
  image2: {
    isDeleted: false,
    url: image2,
  },
  image3: {
    isDeleted: false,
    url: image3,
  },
  image4: {
    isDeleted: false,
    url: image4,
  },
  image5: {
    isDeleted: false,
    url: image5,
  },
  image6: {
    isDeleted: false,
    url: image6,
  },
  image7: {
    isDeleted: false,
    url: image7,
  },
};
