import { useState, useEffect } from "react";

function EditBillInfo({updateItem, isDone, setIsDone, getDataFromBillInfo}) {
  const { dateForm } = updateItem;
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [description, setDescription] = useState( "" );
  
  const setValues = () => {
    setDate(dateForm?.date || '');
    setPayment(dateForm?.payment|| '');
    setDescription(dateForm?.description || '');
  };

  useEffect(() => {
    if ( !updateItem ) return;
    setValues()
  }, [updateItem] );
  
  useEffect(() => {
      if(isDone) {
        getDataFromBillInfo(date, payment, description);
      }
  }, [isDone])

  return (
    <div className="edit-bill-info">
      <div className="container-date">
        <div>
          <label htmlFor="date">Invoice Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
          />
        </div>
        <div>
          <label htmlFor="payment-terms">Payment Terms</label>
          <div className="select">
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              id="payment-terms"
            >
              <option value="net 30 day">net 30 day</option>
              <option value="net 14 day">net 14 day</option>
              <option value="net 7 day">net 7 day</option>
              <option value="net 1 day">net 1 day</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="description">description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          id="description"
        />
      </div>
    </div>
  );
}

export default EditBillInfo;
