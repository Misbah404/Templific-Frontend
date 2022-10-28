import React, { useEffect, useState } from "react";
import { css } from "aphrodite";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { TextField, Button } from "../../components";
import { ROUTES, strings } from "../../constants";
import styles from "./styles";
import { Images } from "../../theme";


const FirstDesign = () => {
  return (
    <div
      className={`${css(
        styles.main
      )} d-flex flex-column align-items-center justify-content-center`}
    >
      <img
        src={Images.firstDesign.default}
        className={`${css(styles.emptyImage)}`}
      />
      <h2 className={`${css(styles.mainHeading)} font-weight-bold`}>
        Your first design is going to be amazing
      </h2>
      <Button
        title={`Create Template`}
        className={`${css(styles.connectBtn)}`}
        leftIcon
      >
        <i className={`fa fa-plus ${css(styles.plusBtn)}`} />
      </Button>
    </div>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(FirstDesign);
