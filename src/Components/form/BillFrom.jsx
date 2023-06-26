import {useEffect, useState} from 'react';
import clearForm from '../../CustomHook/clearForm';

function BillFrom({getBillFrom, isSaveForm}) {
  const [street, setStreet] = useState( '' );
  const [city, setCity] = useState( '' );
  const [post, setPost] = useState( '' );
  const [country, setCountry] = useState( '' );

  useEffect(() => {
    if(isSaveForm) {
      getBillFrom( street, city, post, country );
      clearForm( [setStreet, setCity, setPost, setCountry] );
    }
  }, [isSaveForm] );
  
  return (
    <div className='bill-from'>
      <h5 className="sub-title-form">bill form</h5>
      <div>
        <label htmlFor='street-1'>Street Address</label>
        <input value={street} onChange={(e) => setStreet(e.target.value)} type="text" id='street-1'/>
      </div>
      <div className="container-inputs">
      <div>
        <label htmlFor='city-1'>City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id='city-1'/>
        </div>
        <div>
        <label htmlFor='post-1'>Post Code</label>
        <input value={post} onChange={(e) => setPost(e.target.value)} type="number" id='post-1'/>
        </div>
        <div>
        <label htmlFor='country-1'>Country</label>
        <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" id='country-1'/>
      </div>
      </div>
    </div>
  )
}

export default BillFrom