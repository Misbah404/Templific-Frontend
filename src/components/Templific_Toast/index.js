import { css } from "aphrodite";
import React, { useState } from "react";
// import { ToastContainer, Toast } from 'react-bootstrap'
import Toast from "react-bootstrap/Toast";
import styles from "./styles";

const Templific_Toast = ({ toastTitle, toastBody }) => {
  const [show, setShow] = useState(true);
  return (
    <div className={`position-absolute lightbrown ${css(styles.toastWrapper)}`}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={6000000000000000000000}
        autohide
        className={`border-0 ${css(styles.bg)}`}
      >
        <Toast.Header
          className={`justify-content-between align-items-start border-0 bg-transparent`}
        >
          <div className={`${css(styles.contentWrap)}`}>
            <strong className={`${css(styles.text)}`}>{toastTitle}</strong>
          </div>
        </Toast.Header>
        {toastBody && <Toast.Body>{toastBody}</Toast.Body>}
      </Toast>
    </div>
  );
};

export default Templific_Toast;
