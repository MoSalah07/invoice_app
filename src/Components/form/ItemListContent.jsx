import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import clearForm from "../../CustomHook/clearForm";

function ItemListContent({ isSaveForm, getItemListContent, deleteAddNewItem }) {
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState( "" );

  useEffect(() => {
    if (isSaveForm) {
      getItemListContent( itemName, qty, price, total );
      clearForm( [setItemName, setQty, setPrice, setTotal] );
    }
  }, [isSaveForm]);

  const handelTotal = () => {
    setTotal(qty * price);
  };

  useEffect(() => {
    handelTotal();
  }, [qty, price]);

  return (
    <>
      <div className="container-box-item-list">
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
            min='1'
            max='1000000'
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
            min='1'
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="box-item-list total">
          <label htmlFor="item-name">total</label>
          <div value={total} id="total">
            {total}
          </div>
        </div>
        <div onClick={deleteAddNewItem} className="box-item-list">
          <RiDeleteBin6Line />
        </div>
      </div>
    </>
  );
}

export default ItemListContent;
