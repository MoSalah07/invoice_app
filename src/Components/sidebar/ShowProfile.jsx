import React from "react";
import "./showProfile.css";
import Photo from "../../Img/Salah.jpg";
function ShowProfile({ setShowProfile }) {
  
  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <div onClick={closeProfile} className="show-profile flex-center">
      <div className="container-show-profile flex-center">
        <div className="img">
          <img src={Photo} alt="profile" />
        </div>
        <h2>Mohamed Salah</h2>
        <div className="links">
          <a className="link" href="https://www.facebook.com/mido.mohammed.7/">Visit Acc Facebook</a>
          <a className="link" href="https://github.com/MoSalah07">Visit Git repo</a>
          <a className="link" href="https://www.linkedin.com/in/mo-salah-464a42191/">Visit LinkedIn</a>
          <a className="link" href="https://codepen.io/Mohamed-Salah07">Visit CodePen</a>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
