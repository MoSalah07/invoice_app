import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import ItemListContent from "./ItemListContent";
import { CTXAuth } from '../../Context/ContextProviderAuth';

function ItemList({getItemListContent, isSaveForm, getItemList}) {
  const [items, setItems] = useState( [] );
  const { user } = CTXAuth();

  const handelAddNewItem = () => {
    setItems((prev) => [...prev, {id: Math.trunc(Math.random() * 1000000000)}]);
  };

    // Called Inside Component ItemListContent
  const deleteAddNewItem = (id) => {
    const deleted = items.filter( ( item ) => item.id !== id );
    setItems( deleted );
  };

// worked to Move items to Dashboard when items change
  useEffect(() => {
    getItemList(items);
  }, [items] );
  
// Here UseEffect Test => When Add Invoice Remove All Item List
  useEffect(() => {
      if(isSaveForm) {
       setItems([]);
      }
  }, [isSaveForm]);

  const renderItemListContent = items?.map((item) => {
      return (
        <ItemListContent deleteAddNewItem={() => deleteAddNewItem(item.id)} key={item.id} id={item.id} getItemListContent={getItemListContent} isSaveForm={isSaveForm}/>
      )
    });
  

  return (
    <div className="container-item-list">
      <div className="item-list">
        <h3 className="title-item-list">ItemList</h3>
          {renderItemListContent}
        <div onClick={handelAddNewItem} className="add-new-item">
          <BiPlus />
          <button onClick={(e) => e.preventDefault()}>add new item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
