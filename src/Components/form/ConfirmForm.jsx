import React, { useEffect } from "react";
import { CTXForm } from "../../Context/ContextForm";
function ConfirmForm({
  addToFireStore,
  setIsSaveForm,
  isSaveForm,
  setReadyState,
  readyState,
  setItemList,
  setState,
  setIsDraft,
  isDraft,
}) {
  const { switchForm } = CTXForm();

  const handelAsDraft = async (e) => {
    e.preventDefault();
    await setIsSaveForm(true);
    setReadyState(true);
    // await setItemList( [] );
    // secondSetitemList( [] );
    // For Test State
    setState("draft");
  };

  const handelBtnSave = async (e) => {
    e.preventDefault();
    await setIsSaveForm(true);
    setReadyState(true);
    // await setItemList( [] );
    // secondSetitemList( [] );
    // For Test State
    setState("pending");
  };

  // Important => hena setTimeOut false 3lshan lw dynab readyState True add 2 times => Depend =>  isSaveForm in use Effect
  useEffect(() => {
    if (readyState) {
      // if(billFrom.st === '' || billFrom.st === undefined) return;
      addToFireStore();
    }
    // setTimeout(() => setReadyState(false), 1000);
    return () => setTimeout(() => setReadyState(false), 1000);
  }, [isSaveForm]);

  return (
    <div className="confirm-form">
      <div onClick={switchForm}>
        <button>discard</button>
      </div>
      <div className="container-confirm-form">
        <div onClick={handelAsDraft}>
          <button onClick={switchForm}>Save as Draft</button>
        </div>
        <div onClick={handelBtnSave}>
          <button onClick={switchForm}>save & send</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmForm;
