import React, { useState } from "react";
import "./landingDash.css";
import InvoiceTitle from "./InvoiceTitle";
import Layout from "../Layout/Layout";
import useWindowDeimensions from "../../CustomHook/useWindowDeimensions";
import InvoiceInfo from "./InvoiceInfo";
import { motion } from "framer-motion";

function LandingDashboard({ invoiceFromDb }) {
  const [select, setSelect] = useState("");
  const { width } = useWindowDeimensions();

  const filterRender = () => {
    let switchingArray = [];
    switch (select) {
      case "pending":
        switchingArray = invoiceFromDb?.filter(
          (invoice) => invoice.state === select
        );
        break;
      case "draft":
        switchingArray = invoiceFromDb?.filter(
          (invoice) => invoice.state === select
        );
        break;
      case "paid":
        switchingArray = invoiceFromDb?.filter(
          (invoice) => invoice.state === select
        );
        break;
      default:
        switchingArray = invoiceFromDb;
    }
    return switchingArray;
  };

  const renderInvoiceInfo = filterRender()?.map((item, index) => {
    return <InvoiceInfo width={width} item={item} key={index} />;
  });
  // console.log( invoiceFromDb.filter( item => item.state === 'draft' ) ) // get state

  return (
    <div
      className={`landing-dashboard ${width < 1200 ? "mobile-lg" : ""} ${
        width < 991 ? "mobile" : ""
      } ${width < 360 ? "mobile-sm" : ""}`}
    >
      <Layout />
      <div
        className={`container-dashboard ${width < 991 ? "mobile" : ""} ${
          width < 768 ? "mobile-sm" : ""
        }`}
      >
        <InvoiceTitle
          filterRender={filterRender}
          setSelect={setSelect}
          width={width}
        />
        <motion.div
        initial={{ translateX: '-100%', opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: 0, opacity: 1 }}
        transition={{duration: .8}}
          className="boxes-invoices"
        >
          {renderInvoiceInfo}
        </motion.div>
      </div>
    </div>
  );
}

export default LandingDashboard;
