// @flow
import React from "react";
import { css } from "aphrodite";
import styles from "./PrivacyPolicyStyles";
import { AppStyles } from "../../theme";
import { WebHeader, WebFooter } from "../../components";

export default function PrivacyPolicyView(props) {
  return (
    <div>
      <section>
        <div className={` ${css(AppStyles.container)}`}>
          <div className={`my-4 mb-5`}>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Please read this Privacy Policy carefully to understand how we
              handle your data.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-4 mt-5  ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              1. Information Collection
            </h2>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              1.1 Personal Data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you (“Personal Data”). Personally identifiable
              information may include, but is not limited to:
            </p>
            <p className={`mb-3 ml-3 ${css(AppStyles.pera18)}`}>
              Email address <br />
              First name and last name
              <br />
              Phone number
              <br />
              Address, State, Province, ZIP/Postal code, City
              <br />
              Cookies and Usage Data
              <br />
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              1.2 Usage Data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              We may also collect information how the Service is accessed and
              used (“Usage Data”). This Usage Data may include information such
              as your computer’s Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              1.3 Tracking & Cookies Data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information. Cookies are
              files with small amount of data which may include an anonymous
              unique identifier. Cookies are sent to your browser from a website
              and stored on your device. Tracking technologies also used are
              beacons, tags, and scripts to collect and track information and to
              improve and analyze our Service. You can instruct your browser to
              refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use
              some portions of our Service.
            </p>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Examples of Cookies we use:
            </p>
            <p className={`mb-3 pl-3 ${css(AppStyles.pera18)}`}>
              Session Cookies: We use Session Cookies to operate our Service.
              <br />
              Preference Cookies: We use Preference Cookies to remember your
              preferences and various settings.
              <br />
              Security Cookies: We use Security Cookies for security purposes.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              2. Use of data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Kiffgo uses the collected data for various purposes: To provide
              and maintain the Service. To notify you about changes to our
              Service. To allow you to participate in interactive features of
              our Service when you choose to do so. To provide customer care and
              support. To provide analysis or valuable information so that we
              can improve the Service. To monitor the usage of the Service. To
              detect, prevent and address technical issues.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              3. Transfer of data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Your information, including Personal Data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ than those from your jurisdiction.
              If you are located outside United Kingdom and choose to provide
              information to us, please note that we transfer the data,
              including Personal Data, to United Kingdom and process it there.
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
              Kiffgo will take all steps reasonably necessary to ensure that
              your data is treated securely and in accordance with this Privacy
              Policy and no transfer of your Personal Data will take place to an
              organization or a country unless there are adequate controls in
              place including the security of your data and other personal
              information.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              4. Disclosure of data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Legal Requirements: Kiffgo may disclose your Personal Data in the
              good faith belief that such action is necessary to: To comply with
              a legal obligation. To protect and defend the rights or property
              of Kiffgo. To prevent or investigate possible wrongdoing in
              connection with the Service. To protect the personal safety of
              users of the Service or the public. To protect against legal
              liability.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              5. Security of data
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              6. Service Providers
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              We may employ third party companies and individuals to facilitate
              our Service (“Service Providers”), to provide the Service on our
              behalf, to perform Service-related services or to assist us in
              analyzing how our Service is used. These third parties have access
              to your Personal Data only to perform these tasks on our behalf
              and are obligated not to disclose or use it for any other purpose.
              Analytics: We may use third-party Service Providers to monitor and
              analyze the use of our Service. Google Analytics: Google Analytics
              is a web analytics service offered by Google that tracks and
              reports website traffic. Google uses the data collected to track
              and monitor the use of our Service. This data is shared with other
              Google services. Google may use the collected data to
              contextualize and personalize the ads of its own advertising
              network. You can opt-out of having made your activity on the
              Service available to Google Analytics by installing the Google
              Analytics opt-out browser add-on. The add-on prevents the Google
              Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing
              information with Google Analytics about visits activity. For more
              information on the privacy practices of Google, please visit the
              <a
                href="https://policies.google.com/privacy?hl=en"
                target="_blank"
              >
                &nbsp; Google Privacy & Terms
              </a>
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              7. Links To Other Sites
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Our Service may contain links to other sites that are not operated
              by us. If you click on a third party link, you will be directed to
              that third party’s site. We strongly advise you to review the
              Privacy Policy of every site you visit. We have no control over
              and assume no responsibility for the content, privacy policies or
              practices of any third party sites or services.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              8. Children’s Privacy
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              Our Service does not address anyone under the age of 18
              (“Children”). We do not knowingly collect personally identifiable
              information from anyone under the age of 18. If you are a parent
              or guardian and you are aware that your Children has provided us
              with Personal Data, please contact us. If we become aware that we
              have collected Personal Data from children without verification of
              parental consent, we take steps to remove that information from
              our servers.
            </p>
          </div>

          <div className={`my-4 mb-5`}>
            <h2
              className={`mb-3 ${css([
                AppStyles.headingThree,
                AppStyles.weight7,
              ])}`}
            >
              9. Changes To This Privacy Policy
            </h2>
            <p className={`mb-3 ${css(AppStyles.pera18)}`}>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email and/or a prominent notice on our
              Service, prior to the change becoming effective and update the
              “effective date” at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
