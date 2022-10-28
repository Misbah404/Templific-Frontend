// @flow
import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "aphrodite";
import styles from "./PageNotFoundStyles";
import { WebHeader, WebFooter } from "../../components";
import { Images, AppStyles, Colors } from "../../theme";

export default function PageNotFoundView(props) {
  return (
    <div>
      <WebHeader />
      <section className={` ${css([styles.heroSection, AppStyles.pxy_12])}`}>
        <div
          className={`container ${css(styles.container)} ${css(
            styles.HeightVhs
          )}`}
        >
          <div className={`row mt-5 `}>
            <div className={`col-lg-6 col-md-12 col-sm-12 mt-3`}>
              <h2
                className={`mt-5 mb-3 mb-4 ${css([
                  AppStyles.headingOne,
                  AppStyles.blackColor,
                  styles.lineHeight12,
                ])}`}
              >
                Oops page under construction…
                <br />
                Coming Soon
              </h2>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 position-static px-0">
              <img
                className={css(styles.headerGraphics)}
                src={Images.delivery_in_town}
              />
            </div>
          </div>
        </div>
      </section>
      <WebFooter />
    </div>
  );
}
