import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function EditNewContentList({
  getDataFromEditContentItemList,
  setIsDone,
  isDone,
  element,
  deleteSecondNewItem,
  
}) {
  const [itemName, setItemName] = useState(element?.itemName || "");
  const [qty, setQty] = useState(element?.qty || "");
  const [price, setPrice] = useState(element?.price || "");
  const [total, setTotal] = useState(element?.total || "");

  const handelTotal = () => {
    // For Test Math.trunc
    setTotal(Math.trunc(qty * price));
  };

  useEffect(() => {
    handelTotal();
  }, [qty, price]);


  useEffect(() => {
    if(isDone) {
      getDataFromEditContentItemList( itemName, qty, price, total );
    }
  }, [isDone]);


  return (
    <>
      <div className="wrapper">
        <div className="box-item-list">
          <label htmlFor="item-name">item name</label>
          <input
            value={itemName}
            type="text"
            id="item-name"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="box-item-list">
          <label htmlFor="qty.">Qty</label>
          <input
            value={qty}
            type="number"
            id="qty"
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <div className="box-item-list">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            type="number"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="box-item-list total">
          <label htmlFor="item-name">total</label>
          <div value={total} id="total">
            {total}
          </div>
        </div>
        <div onClick={deleteSecondNewItem} className="box-item-list">
          <RiDeleteBin6Line />
        </div>
      </div>
    </>
  );
}

export default EditNewContentList;
