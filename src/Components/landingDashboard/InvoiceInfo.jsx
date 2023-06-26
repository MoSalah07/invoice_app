import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import handelNumbers from '../../CustomHook/handelNumbers';
import formateDate from '../../CustomHook/formateDate';

function InvoiceInfo({ item, width}) {
  const {
    dateForm: { date },
    billTo: { clientName },
    itemListContent,
    serialInvoice,
    state
  } = item;



  const getTotal = itemListContent
    ?.map((item) => item.total)
    .reduce( ( acc, cur ) => acc + cur, 0 );
  
  const {id} = useParams();
  return (
    <Link to={`/dashboard/${id}/${serialInvoice}`} className={`item-info ${width < 768  ?'mobile' : ''}`}>
      <div className="wrapper-1">
        <div className="serial-item-info">
          <p><span>#</span>{`${serialInvoice || ''}`}</p>
        </div>
        <div className="date-item-info">
          <span>{formateDate(date) || ''}</span>
        </div>
        <div className="name-item-info">
          <span>{clientName || ''}</span>
        </div>
      </div>
      <div className="wrapper-2">
        <div className="total-item-info">{handelNumbers(getTotal || '')}</div>
        {/* Here State Condition From db */}
        <div className={`state-item-info flex-center ${state === 'draft' ? 'draft' : state === 'paid' ? 'paid' : 'pending'}`}>
          <span className="state-item">{state ||''}</span>
          <span className="state-circle"></span>
        </div>
        <div className="arrow-item-info">
          <FiArrowRight />
        </div>
      </div>
    </Link>
  );
}

export default InvoiceInfo;
