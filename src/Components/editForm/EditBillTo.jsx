import { useState, useEffect } from "react";

function EditBillTo({updateItem, getDataFromBillTo, isDone, setIsDone}) {
  const { billTo } = updateItem;
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPost, setClientPost] = useState("");
  const [clientCountry, setClientCountry] = useState( "" );

  const setValues = () => {
    setClientName( billTo?.clientName );
    setClientEmail( billTo?.clientEmail );
    setClientStreet( billTo?.clientst );
    setClientCity( billTo?.city );
    setClientPost( billTo?.post );
    setClientCountry(billTo?.country);
  };

  useEffect(() => {
    if ( !updateItem ) return;
    setValues()
  }, [updateItem] )
  
  useEffect(() => {
    if(isDone) {
      getDataFromBillTo(clientName, clientCity, clientCountry, clientPost, clientEmail, clientStreet)
    }
  }, [isDone])

  
  return (
    <div className="edit-bill-to">
      <h5 className="sub-title-form">bill to</h5>
      <div>
        <label htmlFor="client-name">Client's Name</label>
        <input
          defaultValue={clientName}
          onChange={(e) => setClientName(e.target.value)}
          type="text"
          id="client-name"
        />
      </div>
      <div>
        <label htmlFor="client-email">Client's Email</label>
        <input
          defaultValue={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          type="text"
          id="client-email"
        />
      </div>
      <div>
        <label htmlFor="street-2">Street Address</label>
        <input
          defaultValue={clientStreet}
          onChange={(e) => setClientStreet(e.target.value)}
          type="text"
          id="street-2"
        />
      </div>
      <div className="container-inputs">
        <div>
          <label htmlFor="city-2">City</label>
          <input
            defaultValue={clientCity}
            onChange={(e) => setClientCity(e.target.value)}
            type="text"
            id="city-2"
          />
        </div>
        <div>
          <label htmlFor="post-2">Post Code</label>
          <input
            defaultValue={clientPost}
            onChange={(e) => setClientPost(e.target.value)}
            type="text"
            id="post-2"
          />
        </div>
        <div>
          <label htmlFor="country-2">Country</label>
          <input
            defaultValue={clientCountry}
            onChange={(e) => setClientCountry(e.target.value)}
            type="text"
            id="country-2"
          />
        </div>
      </div>
    </div>
  );
}

export default EditBillTo;
