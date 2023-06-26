import { useEffect } from "react";

function EditConfirmForm({switchEditForm, isDone, setIsDone, changeItemsFromDb, isReady, setIsReady}) {
  

  const handelSaveChanges =  async () => {
    await setIsDone( true );
    setIsReady( true );
    switchEditForm()
  }

  useEffect(() => {
    // if ( !isDone ) return;
    if ( isReady ){
      changeItemsFromDb(); 
    }
    return () => setTimeout( () => {
      setIsReady( false );
      setIsDone( false );
    }, 1000 );
  }, [isDone] );

  return (
    <div className="edit-confirm">
      <div onClick={switchEditForm} className="edit-cancel flex-center">
        <button>cancel</button>
      </div>
      <div onClick={handelSaveChanges} className="edit-change-save flex-center">
        <button onClick={(e) => e.preventDefault()} className="save-changes">save changes</button>
      </div>
    </div>
  );
}

export default EditConfirmForm;
