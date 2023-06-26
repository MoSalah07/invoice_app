import {useState, useEffect} from "react";
import clearForm from "../../CustomHook/clearForm";

function BillTo({getBillTo, isSaveForm}) {
  const [clientName, setClientName] = useState( '' );
  const [clientEmail, setClientEmail] = useState( '' );
  const [clientStreet, setClientStreet] = useState( '' );
  const [clientCity, setClientCity] = useState( '' );
  const [clientPost, setClientPost] = useState( '' );
  const [clientCountry, setClientCountry] = useState( '' );


  useEffect(() => {
      if(isSaveForm) {
        getBillTo( clientName, clientEmail, clientStreet, clientCity, clientPost, clientCountry );
        clearForm( [setClientName, setClientEmail, setClientStreet, setClientCity, setClientPost, setClientCountry] );
      }
  }, [isSaveForm]);

  return (
    <div className="bill-to">
      <h5 className="sub-title-form">bill to</h5>
      <div>
        <label htmlFor="client-name">Client's Name</label>
        <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" id="client-name" />
      </div>
      <div>
        <label htmlFor="client-email">Client's Email</label>
        <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="text" id="client-email" />
      </div>
      <div>
        <label htmlFor="street-2">Street Address</label>
        <input value={clientStreet} onChange={(e) => setClientStreet(e.target.value)} type="text" id="street-2" />
      </div>
      <div className="container-inputs">
      <div>
        <label htmlFor='city-2'>City</label>
        <input value={clientCity} onChange={(e) => setClientCity(e.target.value)} type="text" id='city-2'/>
        </div>
        <div>
        <label htmlFor='post-2'>Post Code</label>
        <input value={clientPost} onChange={(e) => setClientPost(e.target.value)} type="text" id='post-2'/>
        </div>
        <div>
        <label htmlFor='country-2'>Country</label>
        <input value={clientCountry} onChange={(e) => setClientCountry(e.target.value)} type="text" id='country-2'/>
      </div>
      </div>
    </div>
  );
}

export default BillTo;
