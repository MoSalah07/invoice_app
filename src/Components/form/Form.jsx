import React from "react";
import BillTo from "./BillTo";
import BillFrom from "./BillFrom";
import ItemList from "./ItemList";
import InfoForm from "./InfoForm";
import "./form.css";
import { CTXForm } from "../../Context/ContextForm";
import ConfirmForm from "./ConfirmForm";
import useWindowDeimensions from "../../CustomHook/useWindowDeimensions";
import { CTXTheme } from "../../Context/ContextTheme";

function Form({
  formProps: {
    getBillFrom,
    getBillTo,
    getDateForm,
    addToFireStore,
    isSaveForm,
    setIsSaveForm,
    setReadyState,
    readyState,
    billFrom,
    getItemListContent,
    getItemList,
    setItemList,
    setState,
    setIsDraft,
    isDraft,
  }
}) {
  
  const { show } = CTXForm();
  const { width } = useWindowDeimensions();
  const { theme } = CTXTheme();

  return (
    <section
      className={`sub-form ${width < 768 ? 'mobile-sm' : ''} ${theme ? "light" : ""} ${show ? "show" : ""} ${
        width < 991 ? "mobile" : ""
      }`}
    >
      <form className="form">
        <h2 className="title-form">create invoice</h2>
        <div className={`container-form ${width < 450 ? 'mobile-sm' : ''}`}>
          <BillFrom getBillFrom={getBillFrom} isSaveForm={isSaveForm} />
          <BillTo getBillTo={getBillTo} isSaveForm={isSaveForm} />
          <InfoForm getDateForm={getDateForm} isSaveForm={isSaveForm} />
          <ItemList
            getItemListContent={getItemListContent}
            isSaveForm={isSaveForm}
            getItemList={getItemList}
          />
          <ConfirmForm
            billFrom={billFrom}
            readyState={readyState}
            setReadyState={setReadyState}
            addToFireStore={addToFireStore}
            isSaveForm={isSaveForm}
            setIsSaveForm={setIsSaveForm}
            setItemList={setItemList}
            setState={setState}
            setIsDraft={setIsDraft}
            isDraft={isDraft}
          />
        </div>
      </form>
    </section>
  );
}

export default Form;
