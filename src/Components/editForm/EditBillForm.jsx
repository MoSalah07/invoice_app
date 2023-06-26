import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../configFirebase/configFirebase";

function EditBillForm({ updateItem, getDataFromBillFrom, isDone, setisDone }) {
  const { billFrom } = updateItem;
  const [street, setStreet] = useState(updateItem?.st);
  const [city, setCity] = useState(billFrom?.city);
  const [post, setPost] = useState(billFrom?.post);
  const [country, setCountry] = useState(billFrom?.country);

  const setValues = () => {
    setStreet(billFrom?.st || '');
    setCity(billFrom?.city || '');
    setPost(billFrom?.post || '');
    setCountry(billFrom?.country || '');
  };

  useEffect(() => {
    if ( !updateItem ) return;
    setValues()

  }, [updateItem]);

  useEffect(() => {
    if(isDone) {
      getDataFromBillFrom( street, city, country, post );
      
    }
  }, [isDone])

  return (
    <div className="edit-bill-from">
      <h5 className="sub-title-form">bill form</h5>
      <div>
        <label htmlFor="street-1">Street Address</label>
        <input
          defaultValue={street}
          onChange={(e) => setStreet(e.target.value)}
          type="text"
          id="street-1"
        />
      </div>
      <div className="container-inputs">
        <div>
          <label htmlFor="city-1">City</label>
          <input
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city-1"
          />
        </div>
        <div>
          <label htmlFor="post-1">Post Code</label>
          <input
            defaultValue={post}
            onChange={(e) => setPost(e.target.value)}
            type="number"
            id="post-1"
          />
        </div>
        <div>
          <label htmlFor="country-1">Country</label>
          <input
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country-1"
          />
        </div>
      </div>
    </div>
  );
}

export default EditBillForm;
