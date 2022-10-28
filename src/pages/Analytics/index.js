import { css } from "aphrodite";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { uniqueId } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import SVG from "react-inlinesvg";
import { useSelector } from "react-redux";
import { ModalView, SideBar } from "../../components";
import Button from "../../components/Button";
import {
  getAccountsOrdersEarningsDetails,
  payNowOnAnalyticInvoice,
} from "../../services/userHelper";
import { Colors, Images } from "../../theme";
import styles from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  type: "bar",
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "",
    },
  },
  layout: {
    padding: {
      bottom: 20,
    },
  },
  scales: {
    y: {
      grid: {
        display: true,
      },
    },

    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// const labels = [...Array(12)].map((_, i) => moment().add(i + 1, 'M').format('MMM'));

// const dummyGraphData = [...Array(12)].map(() => ({
//   "totalProperties": 0,
//   "soldProperties": 0,
//   "buyer": 50,
//   "seller": 50
// }));

const Analytics = (props) => {
  const { accessToken } = useSelector((state) => state.user);
  const layout = useSelector((state) => state.layout);
  const [showModal, setShowModal] = useState(false);
  const [apiData, setApiData] = useState({});
  const [invoicePaymentRes, setInvoicePaymentRes] = useState();
  const [invoiceDate, setInvoiceDate] = useState("");
  const emptyData = [...Array(12)].map(() => 0);
  const [calenderSelectedValue, setCalenderSelectedValue] = useState("");
  const calenderSelectionValues = useMemo(
    () =>
      [
        ...new Set(
          apiData?.etsySoldTemplates?.map((obj) =>
            moment(obj.paidTime).format("YYYY")
          )
        ),
      ]
        .sort()
        .reverse(),
    [apiData]
  );

  useEffect(() => {
    setCalenderSelectedValue(calenderSelectionValues[0] || moment().year());
  }, [calenderSelectionValues]);

  const AnalyticsTopCardsData = [
    {
      icon: Images.shoppingBag,
      title: "Total Orders",
      numbers: apiData?.totalOrders || 0,
    },
    {
      icon: Images.shoppingBag,
      title: "Recent Orders",
      numbers: apiData?.currentMonthOrders || 0,
    },
    {
      icon: Images.earning,
      title: "Total Earning",
      numbers: `$${apiData?.totalEarning || 0}`,
    },
    {
      icon: Images.earning,
      title: "Current Month Earnings",
      numbers: `$${apiData?.currentMonthEarning || 0}`,
    },
  ];

  const getAnalyticsData = () => {
    getAccountsOrdersEarningsDetails(
      accessToken,
      (data) => setApiData(data),
      (err) => console.log("~ err", err)
    );
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const setChardData = () => {
    const soldTemplatesMonthsData = apiData.etsySoldTemplates
      .filter((obj) => obj?.paidTime?.includes(calenderSelectedValue))
      .map((obj) => moment(obj.paidTime).format("MMM"));
    const data = labels.map(
      (name) => soldTemplatesMonthsData.filter((month) => month == name).length
    );
    return data;
  };

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: !!apiData?.etsySoldTemplates?.length
            ? setChardData()
            : emptyData,
          backgroundColor: Colors.AnalyticsThemeColor,
          barThickness: 30,
          borderRadius: 50,
          borderWidth: 2,
          barThickness: 40,
          borderColor: Colors.white,
        },
      ],
    }),
    [calenderSelectedValue]
  );

  const payNow = (invoiceId, setLoading, date) => {
    setInvoiceDate(date);
    setLoading(true);
    payNowOnAnalyticInvoice(
      invoiceId,
      accessToken,
      (data) => {
        setShowModal(true);
        setLoading(false);
        setInvoicePaymentRes(data);
        getAnalyticsData();
      },
      (err) => {
        setLoading(false);
        console.log("~ err", err);
      }
    );
  };

  const TopCards = AnalyticsTopCardsData.map((res) => (
    <div key={uniqueId()} className={`${css(styles.cardWrapper)}`}>
      <div className={`${css(styles.topCardIconWrapper)}`}>
        <SVG
          width="auto"
          height="auto"
          src={res.icon}
          title={res.title}
          className={`${css(styles.topCardIcon)}`}
        />
      </div>
      <div className={`${css(styles.topCardDetails)}`}>
        <h6 className={`${css(styles.topCardTitle)}`}>{res.title}</h6>
        <h2 className={`${css(styles.topCardNumbers)}`}>{res.numbers}</h2>
      </div>
    </div>
  ));

  const tableValues = apiData?.subscriptions?.map((obj) => (
    <div key={uniqueId()} className={`${css(styles.tableValuesWrapper)}`}>
      <div className={`${css(styles.tableValues)}`}>
        {moment(obj.created).format("MM/DD/YYYY")}
      </div>
      <div className={`${css(styles.tableValues2)}`}>
        ${Number(obj?.amount).toFixed(2)}
      </div>
    </div>
  ));

  const sortData = (data = [], objectKey = "due_date", paidData = false) =>
    data
      .filter((obj) => (paidData ? obj.isPaid : !obj.isPaid))
      .sort(
        (a, b) =>
          moment(b[objectKey]).format("YYYYMMDD") -
          moment(a[objectKey]).format("YYYYMMDD")
      );

  return (
    <>
      {layout?.sideBar && <SideBar />}
      <div className={`${css(styles.main)} d-flex flex-column`}>
        <div className={`${css(styles.topSection)} w-100`}>{TopCards}</div>
        <div className={`w-100`} style={{ paddingBottom: "2vw" }}>
          <ToggleMenu
            list={calenderSelectionValues}
            value={calenderSelectedValue}
            setValue={setCalenderSelectedValue}
          />
        </div>
        <div className={`${css(styles.middleSection)} w-100`}>
          <div className={`${css(styles.middleSectionChart)}`}>
            <div className={`${css(styles.chartWrapper)}`}>
              <div className={`${css(styles.chartHading)}`}>Total Orders</div>
              <Bar
                options={options}
                data={data}
                // className={`${css(styles.chart)}`}
              />
            </div>
          </div>
          <div className={`${css(styles.middleSectionInvoice)}`}>
            <h4 className={`${css(styles.invoiceHeading)}`}>Invoice</h4>
            <div
              className={`${css(styles.invoiceItemsWrapper)} customScrollBar`}
            >
              {[
                ...sortData(apiData?.invoices),
                ...sortData(apiData?.invoices, "paid_at", true),
              ].map((obj) => (
                <InvoiceItem obj={obj} payNow={payNow} />
              ))}
            </div>
          </div>
          <div className={`${css(styles.bottomSection)}`}>
            <div className={`${css(styles.bottomSectionHeadingWrapper)}`}>
              <h2 className={`${css(styles.bottomSectionHeading)}`}>
                Subscription Record
              </h2>
            </div>
            <div className={`${css(styles.tableHeadingsWrapper)}`}>
              <div className={`${css(styles.tableHeadings)}`}>Date</div>
              <div className={`${css(styles.tableHeadings)}`}>Total Earn</div>
            </div>
            <div style={{ paddingRight: "1vw" }}>
              <div className={`${css(styles.tableWrapper)} customScrollBar`}>
                {tableValues}
              </div>
            </div>
          </div>
        </div>
        <ModalView
          title={"Successfully Sent"}
          // cancelText={"No"}
          showModal={showModal}
          setShowModal={setShowModal}
          submitText={"Ok"}
          cancelOnClick={() => {
            setShowModal(false);
          }}
          submitOnClick={() => {
            setShowModal(false);
          }}
        >
          <div className={`d-flex ${css(styles.modalMessage)}`}>
            {invoicePaymentRes?.status
              ? `Your invoice was already sent on ${invoiceDate}. Please check your email.`
              : invoicePaymentRes?.message}
          </div>
        </ModalView>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
  canvasData: state.canvasData,
  user: state.user,
});

export default Analytics;

const InvoiceItem = ({ obj, payNow }) => {
  const [loading, setLoading] = useState(false);
  const date = moment(obj.isPaid ? obj.paid_at : obj.due_date).format(
    "MM/DD/YYYY"
  );
  return (
    <div key={uniqueId()} className={`${css(styles.invoiceItem)}`}>
      <div className={`${css(styles.invoiceItemRight)}`}>
        <SVG
          width="auto"
          height="auto"
          src={obj.isPaid ? Images.invoice : Images.invoiceFilled}
          title={"invoice"}
          className={`${css(styles.invoiceIcon)}`}
        />
        <div>
          <div
            className={`${css(styles.invoiceDate)} ${
              obj.isPaid && css(styles.invoiceDatePaid)
            }`}
          >
            {date}
          </div>
          <div
            className={`${css(styles.invoiceNoPaid)} ${
              obj.isPaid && css(styles.invoicePaid)
            }`}
          >
            {obj.isPaid ? "Paid" : "Not Paid"}
          </div>
        </div>
      </div>
      <div className={`${css(styles.invoiceBtnWrapper)}`}>
        <Button
          title={
            obj.isPaid
              ? `$${Number(obj.amount_paid)
                  .toFixed(2)
                  .toString()
                  .padStart(2, 0)}`
              : `Generate Invoice`
          }
          onClick={() =>
            obj.isPaid ? {} : payNow(obj.invoice_id, setLoading, date)
          }
          className={`${css(styles.invoicePayBtn)}
          ${obj.isPaid && css(styles.invoicePaidBtn)}`}
          isLoading={loading}
          ripple={false}
        />
      </div>
    </div>
  );
};

const ToggleMenu = ({ list, value, setValue }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`${css(styles.calenderSelectorWrapper)}`}>
      <h2 className={`${css(styles.calenderSelectedValue)}`}>{value}</h2>
      <div className={`${css(styles.toggleWrapper)}`}>
        <div
          onClick={() => setToggle((a) => !a)}
          className={`${css(styles.downArrowWrapper)}`}
        >
          <SVG
            width="auto"
            height="auto"
            src={Images.downArrow}
            title={"downArrow"}
            className={`${css(styles.downArrow)}`}
          />
        </div>
        {toggle && (
          <div className={`${css(styles.toggleMenu)}`}>
            {list?.map((item) => (
              <div
                onClick={() => {
                  setToggle(false);
                  setValue(item);
                }}
                key={item}
                className={`${css(styles.toggleItem)}`}
                style={
                  item == value ? { backgroundColor: "rgb(215, 208, 255)" } : {}
                }
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
