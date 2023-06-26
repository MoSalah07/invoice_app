import React, { useEffect, useState, memo } from "react";
import Form from "../Components/form/Form";
import LandingDashboard from "../Components/landingDashboard/LandingDashboard";
import Sidebar from "../Components/sidebar/Sidebar";
import ContextForm from "../Context/ContextForm";
import "./dashboard.css";
import { db} from '../configFirebase/configFirebase';
import { doc, setDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { CTXAuth } from '../Context/ContextProviderAuth';
import generateInvoiceNumber from "../CustomHook/generateInvoiceNumber";
import { CTXTheme } from '../Context/ContextTheme';
import { SpinnerRoundOutlined } from 'spinners-react';
import ShowProfile from '../Components/sidebar/ShowProfile';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [isSaveForm, setIsSaveForm] = useState( false );
  const [readyState, setReadyState] = useState( false );
  const [showProfile, setShowProfile] = useState( false );
  const [billFrom, setBillFrom] = useState( {} );
  const [billTo, setBillTo] = useState( {} );
  const [dateForm, setDateForm] = useState( {} );
  const [itemListContent, setItemListContent] = useState( [] );
  const [invoiceFromDb, setInvoiceFromDb] = useState( [] );
  const [itemList, setItemList] = useState( [] );
  const [state, setState] = useState( 'pending' );
  const [isDraft, setIsDraft] = useState( false );
  const { user } = CTXAuth();
  const { theme, erorr, setErorr, setLoading, loading } = CTXTheme();
  const navigate = useNavigate();
  
  const getBillFrom = (st, city, post, country) => {
    setBillFrom( { st, city, post, country } );
    setIsSaveForm( false );
  };

  const getBillTo = (clientName, clientEmail, clientst, city, post, country) => {
    setBillTo( { clientName, clientEmail, clientst, city, post, country } )
    setIsSaveForm( false );
  };


  const getDateForm = (date, payment, description) => {
    setDateForm( { date, payment, description } );
    setIsSaveForm( false );

  };

  // Counter ItemList Inside Form
  const getItemList = (item) => {
    setItemList( item );
  }

  
  const validationDateFrom = Object.entries( dateForm ).map( ( el ) => el[1] === '' ).every((el) => el === true);
  const validationBillTo = Object.entries( billTo ).map( ( el ) => el[1] === '' ).every((el) => el === true);

  
  const getItemListContent = (itemName, qty, price, total) => {
    setItemListContent((prev) => [...prev, { itemName, qty, price, total, id: Math.trunc(Math.random() * 10000000) }]);
    setIsSaveForm( false );
  };

  const serialInvoice = generateInvoiceNumber();

  
  const addToFireStore = async () => {
    // console.log(readyState)
    if(readyState) {
        // For Test Only Not Add Item List Empty
          if ( itemList.length <= 0 || validationDateFrom || validationBillTo) return;
      try {
        // console.log(billFrom, billTo)
        setLoading(true);
        const docRef = doc( db, 'users', user?.uid );
        await setDoc( docRef, { invoice: arrayUnion( { billFrom, billTo, dateForm, itemListContent, serialInvoice, state } ) }, { merge: true } );

      setLoading(false);
      } catch (err) {
        console.log( err )
        setLoading(false)
      }
    }
  }

  // console.log(itemList)

  const getFromFireStore = async () => {
    try {
      setLoading( true );
      const docRef = doc( db, 'users', user?.uid );
          onSnapshot(docRef, (doc) => {
            setInvoiceFromDb( doc.data()?.invoice );
          } );
      setLoading( false );
    } catch (err) {
      console.log( err )
      setLoading( false );
    }
  }


  useEffect(() => {
    setLoading( true );
    if ( user === null ) return;
    getFromFireStore();
    setLoading( false )
  }, [user] );


  // All Props
  const formProps = {
    setState, setIsDraft, isDraft,
    setItemList, getItemList, getItemListContent,
    billFrom, readyState, setReadyState,
    setIsSaveForm, isSaveForm, addToFireStore,
    getBillTo, getBillFrom, getDateForm
  }

/*
  // Protected Dashboard
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if(!user) {
        navigate( '/' );
      } else {
        
        navigate( `/dashboard/${ user?.uid }` );
      }
    });
    
  },[])
*/

  // console.log( Object.entries(billFrom).map((el) => el[1].length === 0) );
  return (
    <ContextForm>
      <section className={`dashboard ${ theme ? 'light' : '' }`}>
        {loading && <div className="loading flex-center"><SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></div>}
        {/* Component When Click To img in side bar Show This Component */}
        {showProfile && <ShowProfile setShowProfile={setShowProfile}/>}
        <Sidebar setShowProfile={setShowProfile}/>
        <LandingDashboard invoiceFromDb={invoiceFromDb}/>
        <Form formProps={{...formProps}} />
      </section>
    </ContextForm>
  );
}

export default memo(Dashboard);
