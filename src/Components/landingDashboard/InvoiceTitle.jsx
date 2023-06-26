import React, { useEffect, useState } from "react";
import { CTXForm } from "../../Context/ContextForm";
import { CTXAuth } from "../../Context/ContextProviderAuth";
import { db, auth } from "../../configFirebase/configFirebase";
import { getDoc, doc } from "firebase/firestore";
import { AiOutlinePlus } from "react-icons/ai";

function InvoiceTitle({width, setSelect, filterRender}) {
  const [owner, setOwner] = useState("");
  const { switchForm } = CTXForm();
  const { user } = CTXAuth();
// console.log(auth.currentUser)
  const getOwnerName = async () => {
    try {
      const docRef = doc(db, "names", auth?.currentUser?.uid);
      const onwerName = await getDoc(docRef, { merge: true });
      setOwner(onwerName.data()?.owner || auth?.currentUser?.displayName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getOwnerName();
    }
  }, [user]);

  return (
    <div className={`invoice-title ${width < 768 ? 'mobile' : ''} ${width < 480 ? 'mobile-sm' : ''}`}>
      <div className="info">
        <h2>invoices</h2>
        <p>{`there are ${filterRender()?.length === undefined ? '0' : filterRender().length} total invoices`}</p>
        <span>Dear {owner}</span>
      </div>
      <div className="container-inv flex-center">
        <div className="select">
          <select onChange={(e) => setSelect(e.target.value)}>
            <option value="">filter by status</option>
            <option value="paid">paid</option>
            <option value="pending">pending</option>
            <option value="draft">draft</option>
          </select>
        </div>
        <div onClick={switchForm} className="add-invoices flex-center">
          <div className="overlay-add-invoices flex-center">
            <AiOutlinePlus />
          </div>
          <button>{width < 768 ? 'new' : 'new invoice'}</button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTitle;
