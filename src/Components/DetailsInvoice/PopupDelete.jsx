import React from "react";
import {useParams} from 'react-router-dom';
import './popup.css';
import useWindowDeimensions from '../../CustomHook/useWindowDeimensions.js';

function PopupDelete( { allProps: { setShowDelete, showDelete, deleteItemFromFireStore } }) {
    
    const { serial } = useParams();
    const { width } = useWindowDeimensions();

    return (showDelete && (<div className="overlay-delete flex-center">
    <div className={`content ${width < 768 ? 'mobile' : ''}`}>
        <div className="text">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete invoice {serial} ? This action cannot be undone.</p>
        </div>
        <div className="btns-del">
            <div onClick={() => setShowDelete(false)} className="cancel flex-center">
                <button>cancel</button>
            </div>
            <div onClick={deleteItemFromFireStore} className="delete flex-center">
                <button>delete</button>
            </div>
        </div>
  </div>
</div>));
}

export default PopupDelete;
