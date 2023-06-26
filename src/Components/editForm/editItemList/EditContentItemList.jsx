import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { auth } from "../../../configFirebase/configFirebase";

function EditContentItemList({
  deleteAddNewItem,
  item,
  getDataFromEditContentItemList,
  isDone,
  setCreateList,
}) {
  const [itemName, setItemName] = useState(item?.itemName || "");
  const [qty, setQty] = useState(item?.qty || "");
  const [price, setPrice] = useState(item?.price || "");
  const [total, setTotal] = useState( item?.total || "" );
  
  const handelTotal = () => {
    // For Test Math.trunc
    setTotal(Math.trunc(qty * price));
  };

  useEffect(() => {
    handelTotal();
  }, [qty, price]);

  useEffect(() => {
    if(isDone) {
      getDataFromEditContentItemList( itemName, qty, price, total, item?.id + 2 );
      // setCreateList( [] );
    }
    // return () => setIsDone(false);
  }, [isDone] );
  

  return (
    <>
        <div className="wrapper">
          <div className="box-item-list">
            <label htmlFor="item-name">item name</label>
            <input
              defaultValue={itemName}
              type="text"
              id="item-name"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="box-item-list">
            <label htmlFor="qty.">Qty</label>
            <input
              defaultValue={qty}
              type="number"
              id="qty"
            onChange={( e ) => setQty( e.target.value )}
            min='0'
            max='100000'
            />
          </div>
          <div className="box-item-list">
            <label htmlFor="price">Price</label>
            <input
              defaultValue={price}
              type="number"
              id="price"
            onChange={( e ) => setPrice( e.target.value )}
            min='0'
            max='1000000000'
            />
          </div>
          <div className="box-item-list total">
            <label htmlFor="item-name">total</label>
            <div defaultValue={total} id="total">
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

export default EditContentItemList;
