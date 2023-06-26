import React, { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../configFirebase/configFirebase";
import { CTXAuth } from "../../Context/ContextProviderAuth";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import handelNumbers from "../../CustomHook/handelNumbers";
import formateDate, { handelPaymentTerms } from "../../CustomHook/formateDate";
import useWindowDeimensions from "../../CustomHook/useWindowDeimensions";
import { CTXTheme } from "../../Context/ContextTheme";
import PopupDelete from "./PopupDelete";
import { motion } from "framer-motion";

function MiniItemInvoice({ switchEditForm }) {
  const [itemDetailsInvoice, setItemDetailsInvoice] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const { user } = CTXAuth();
  const { serial } = useParams();
  const { width } = useWindowDeimensions();
  const { loading, setLoading } = CTXTheme();
  const navigate = useNavigate();

  // 1 Delete Invoice from db in allProps To Component PopUp
  const deleteItemFromFireStore = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const refDoc = doc(db, "users", user?.uid);
      const data = await getDoc(refDoc);
      const { invoice } = data.data();
      const filterDelete = invoice.filter(
        (item) => item.serialInvoice !== serial
      );
      await setDoc(refDoc, { invoice: filterDelete });
      navigate(`/dashboard/${user?.uid}`);
      setShowDelete(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 2 Change Status From db
  const changeStatusFromDb = async (e) => {
    e.preventDefault();
    const stopLoading = itemDetailsInvoice?.state === "paid";
    try {
      if (stopLoading) return;
      setLoading(true);
      const docRef = doc(db, "users", user?.uid);
      const data = await getDoc(docRef);
      const { invoice } = data.data();
      const filterStatus = invoice.map((ele) =>
        ele.serialInvoice === serial ? { ...ele, state: "paid" } : ele
      );
      await setDoc(docRef, { invoice: filterStatus }, { merge: true });
      setLoading(false);

      // state
      // For Testing Not need it
      // setItemDetailsInvoice( filterStatus.find( ( el ) => el.serialInvoice === serial ) );
    } catch (err) {
      console.log(err);
    }
  };

  const allProps = {
    setShowDelete,
    showDelete,
    deleteItemFromFireStore,
  };

  // Test For Error From Db {FireBase}

  useEffect(() => {
    setLoading(true);
    if (user === null) return;
    getDetailsInvoiceFromFirestore();
    setLoading(false);
  }, [user]);

  // First Info
  const getDetailsInvoiceFromFirestore = () => {
    const docRef = doc(db, "users", user?.uid);
    onSnapshot(docRef, (doc) => {
      setItemDetailsInvoice(
        doc.data().invoice?.find((item) => item.serialInvoice === serial)
      );
    });
    setLoading(false);
  };

  const renderTotalItemList = itemDetailsInvoice?.itemListContent?.map(
    (item, index) => {
      // console.log(item)
      return (
        <div className="box" key={index}>
          <h6>{item?.itemName || ""}</h6>
          <b className="hidden">{item?.qty || ""}</b>
          <b className="hidden">{handelNumbers(item?.price) || ""}</b>
          <b>{handelNumbers(item?.total) || ""}</b>
        </div>
      );
    }
  );

  const amountTotal = itemDetailsInvoice?.itemListContent
    ?.map((item) => item.total)
    .reduce((acc, cur) => acc + cur, 0);

  /*========================================================================================================= */
  // For Test
  const userID = user?.uid;
  return (
    <motion.div
      initial={{ translateX: "-100%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 0, opacity: 1 }}
      transition={{ duration: .8 }}
      className={`mini-item-invoice ${width < 991 ? "mobile" : ""} ${
        width < 640 ? "mobile-sm" : ""
      }`}
    >
      <div className="container-mini-item">
        <Link className="go-back" to={`/dashboard/${userID}`}>
          <MdKeyboardArrowLeft />
          <h6>Go Back</h6>
        </Link>
        <div className="header">
          <div className="status">
            <span>status</span>
            {/* Change Class Css  */}
            <span
              className={`${
                itemDetailsInvoice?.state === "pending"
                  ? "pending"
                  : itemDetailsInvoice?.state === "draft"
                  ? "draft"
                  : itemDetailsInvoice?.state === "paid"
                  ? "paid"
                  : ""
              }`}
            >
              <b>{itemDetailsInvoice?.state || ""}</b>
            </span>
          </div>
          <div className={`btns-mini-item ${width < 380 ? 'mobile-mini' : ''}`}>
            <div onClick={switchEditForm} className="edit">
              <button>edit</button>
            </div>
            <div onClick={() => setShowDelete(true)} className="delete">
              <button>delete</button>
            </div>
            {/* itemDetailsInvoice?.state === 'paid' */}
            <div
              onClick={changeStatusFromDb}
              className={`mark-as-paid ${
                itemDetailsInvoice?.state === "paid" ? "hidden" : ""
              }`}
            >
              <button>mark as paid</button>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="top">
            <div>
              <div className="serial">
                <b>#</b>
                {itemDetailsInvoice?.serialInvoice || ""}
              </div>
              <span>{itemDetailsInvoice?.dateForm?.description || ""}</span>
            </div>
            <div className="info">
              <span className="st">
                {itemDetailsInvoice?.billFrom?.st || ""}
              </span>
              <span className="city">
                {itemDetailsInvoice?.billFrom?.city || ""}
              </span>
              <span className="post">
                {itemDetailsInvoice?.billFrom?.post || ""}
              </span>
              <span className="country">
                {itemDetailsInvoice?.billFrom?.country || ""}
              </span>
            </div>
            <div></div>
          </div>
          <div className="middle">
            <div>
              <div>
                <span>Invoice Date</span>
                <h3>{formateDate(itemDetailsInvoice?.dateForm?.date) || ""}</h3>
              </div>
              <div>
                <span>Payment Due</span>
                <h3>
                  {handelPaymentTerms(
                    itemDetailsInvoice?.dateForm?.date,
                    Number(itemDetailsInvoice?.dateForm?.payment.split(" ")[1])
                  ) || ""}
                </h3>
              </div>
            </div>
            <div>
              <span>bill to</span>
              <p>{itemDetailsInvoice?.billTo?.clientName || ""}</p>
              <span>{itemDetailsInvoice?.billTo?.clientst || ""}</span>
              <span>{itemDetailsInvoice?.billTo?.city || ""}</span>
              <span>{itemDetailsInvoice?.billTo?.post || ""}</span>
              <span>{itemDetailsInvoice?.billTo?.country || ""}</span>
            </div>
            <div>
              <span>sent to</span>
              <p>{itemDetailsInvoice?.billTo?.clientEmail}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="container-bottom">
              <div className="boxes">
                <div className="labels box">
                  <span>item name</span>
                  <span>qty</span>
                  <span>price</span>
                  <span>total</span>
                </div>

                {renderTotalItemList}

                {/* <div className="names">
                  <span>item name</span>
                  <h6>khaled</h6>
                  <h6>gamal</h6>
                </div>
                <div className="qty">
                  <span>qty</span>
                  <b>12</b>
                  <b>50</b>
                </div>
                <div className="price">
                  <span>price</span>
                  <b>45</b>
                  <b>60</b>
                </div>
                <div className="total">
                  <span>total</span>
                  <b>648</b>
                  <b>40000</b>
                </div> */}
              </div>
              <div className="amount">
                <div className="content">
                  <p>amount due</p>
                  <h2>{handelNumbers(amountTotal) || ""}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupDelete allProps={{ ...allProps }} />
    </motion.div>
  );
}

export default MiniItemInvoice;
