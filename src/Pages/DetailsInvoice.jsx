import { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar/Sidebar";
import "./DetailsInvoice.css";
import MiniItemInvoice from "../Components/DetailsInvoice/MiniItemInvoice";
import useWindowDeimensions from "../CustomHook/useWindowDeimensions";
import { CTXTheme } from "../Context/ContextTheme";
import EditForm from "../Components/editForm/EditForm";
import ShowProfile from "../Components/sidebar/ShowProfile";
import { SpinnerRoundOutlined } from 'spinners-react';


function DetailsInvoice() {
  const { width, height } = useWindowDeimensions();
  const { theme, loading } = CTXTheme();
  const [showEditForm, setShowEditForm] = useState( false );
  const [showProfile, setShowProfile] = useState( false );
  
  const switchEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  const dataEditForm = {
    width,
    showEditForm,
    switchEditForm,
  };


  return (
    <div
      className={`details-invoice ${theme ? "light" : ""} ${
        width < 991 ? "mobile" : ""
      }`}
    >
       {loading && <div className="loading flex-center"><SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></div>}
      {showProfile && <ShowProfile setShowProfile={setShowProfile}/>}
      <Sidebar setShowProfile={setShowProfile}/>
      <MiniItemInvoice switchEditForm={switchEditForm}/>
      <EditForm dataEditForm={{...dataEditForm}}/>
    </div>
  );
}

export default DetailsInvoice;
