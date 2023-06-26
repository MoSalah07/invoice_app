import React from 'react'
import Profile from '../../Img/Salah.jpg'

function PortFolio({setShowProfile}) {
  const handelProfile = () => {
    setShowProfile( true );
  }
  return (
    <div  className='portfolio flex-center'>
      <div onClick={handelProfile} className="img flex-center">
        <img src={Profile} alt="profile" />
      </div>
    </div>
  )
}

export default PortFolio