import EditBillForm from "./EditBillForm";
import EditBillTo from "./EditBillTo";
import EditBillInfo from "./EditBillInfo";
import EditItemList from "./editItemList/EditItemList";
import EditConfirmForm from "./EditConfirmForm";
import "./editForm.css";
import { useParams } from 'react-router-dom';
import { db, auth } from '../../configFirebase/configFirebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { CTXTheme } from '../../Context/ContextTheme';
import { SpinnerRoundOutlined } from 'spinners-react';

function EditForm({ dataEditForm: { showEditForm, width, switchEditForm } }) {
  const [updateItem, setUpdateItem] = useState( [] );
  const [itemContentList, setItemContentList] = useState( [] );
  const [dataBillFrom, setDataBillFrom] = useState( {} );
  const [dataBillTo, setDataBillTo] = useState( {} );
  const [dataBillInfo, setDataBillInfo] = useState( {} );
  const [isDone, setIsDone] = useState( false );
  const [isReady, setIsReady] = useState( false );
  const { serial } = useParams();
  const { theme, setLoading } = CTXTheme();
  

  // [1] getItem 
  const getItemFromDb = async () => {
    setLoading( true );
    const docRef = doc( db, 'users', auth?.currentUser?.uid );
    const data = await getDoc( docRef );
    const { invoice } = data.data();
    const findDoc = invoice.find( ( item ) => item.serialInvoice === serial );
    setUpdateItem( findDoc );
    setLoading( false );
  }



  const getDataFromBillFrom = (st, city, country, post) => {
    setDataBillFrom( { st, city, country, post } );
    setIsDone( false );
  }

  const getDataFromBillTo = (clientName, city, country, post, clientEmail, clientst,) => {
    setDataBillTo( { clientName, clientEmail, clientst, city, post, country } );
    setIsDone( false );
  }

  const getDataFromEditContentItemList = (itemName, qty, price, total, id) => {
    setItemContentList( ( prev ) => [...prev, { itemName, qty, price, total, id }] );
    setIsDone( false );
  };

  
  const getDataFromBillInfo = (date, payment, description) => {
    setDataBillInfo({date, payment, description})
    setIsDone( false );
  }

  const changeItemsFromDb = async () => {
    if(isReady)  {
      try {
        setLoading( true );
        const docRef = doc( db, 'users', auth?.currentUser?.uid );
        const data = await getDoc( docRef );
        const { invoice } = data.data();
        const test = invoice.map( ( el ) => el.serialInvoice === serial ? { billFrom: dataBillFrom, billTo: dataBillTo, dateForm: dataBillInfo, itemListContent: itemContentList, serialInvoice: el.serialInvoice, state: 'pending' } : el );
        const setitemChange = await setDoc( docRef, { invoice: test }, { merge: true } );

        // setTimeout => Testing => Not Repeat Items 
        setTimeout(() => {
          setItemContentList([])
        }, 1000 );
        
        setLoading( false );
      } catch (err) {
        console.log( err )
        setLoading( false );
      }
    }
  }

  useEffect(() => {
    if ( !auth?.currentUser  || !updateItem) return;
    getItemFromDb();  
  }, [auth?.currentUser] );
  

  return (
    <div
      className={`edit-form  ${width < 991 ? "mobile" : ""} ${width < 400 ? 'mobile-sm' : ''} ${
        showEditForm ? "show" : ""
      } ${theme ? 'light' : ""}`}
    >
      <div className="container">
        <div className="title">
          <h2 className="title-edit-form">edit <span>#</span>{serial}</h2>
        </div>
        <div className="container-edit-form">
          <EditBillForm setIsDone={setIsDone} isDone={isDone} updateItem={updateItem} getDataFromBillFrom={getDataFromBillFrom} />
          <EditBillTo getDataFromBillTo={getDataFromBillTo} setIsDone={setIsDone} isDone={isDone} updateItem={updateItem}/>
          <EditBillInfo getDataFromBillInfo={getDataFromBillInfo} setIsDone={setIsDone} isDone={isDone} updateItem={updateItem}/>
          <EditItemList setIsDone={setIsDone} isDone={isDone} getDataFromEditContentItemList={getDataFromEditContentItemList} updateItem={updateItem}/>
        </div>
        <EditConfirmForm isReady={isReady} setIsReady={setIsReady} changeItemsFromDb={changeItemsFromDb}  setIsDone={setIsDone} isDone={isDone} switchEditForm={switchEditForm} />
      </div>
    </div>
  );
}

export default EditForm;
