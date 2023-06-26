import React, { useEffect, useState, memo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CTXAuth } from "../Context/ContextProviderAuth";
import { CTXTheme } from "../Context/ContextTheme";
import useWindowDeimensions from '../CustomHook/useWindowDeimensions';
import { db } from '../configFirebase/configFirebase';
import { setDoc, doc } from 'firebase/firestore';
import './signup.css';
import { SpinnerRoundOutlined } from 'spinners-react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState( "" );
  const [confirmPass, setConfirmPass] = useState( '' );
  const [owner, setOwner] = useState( '' ); 
  const [showIconSignUp, setShowIconSignUp] = useState( true );
  const { createEmailPassword} = CTXAuth();
  const navigate = useNavigate();
  const { loading, setLoading, error, setError} = CTXTheme();
  const { width } = useWindowDeimensions();
  const refPassword = useRef();
  const refPasswordConfirm = useRef();


  const handelShowIconPassword = () => {
    setShowIconSignUp( ( prev ) => !prev );
    if(showIconSignUp) {
      refPassword.current.type = 'text';
      refPasswordConfirm.current.type = 'text';
    } else {
      refPassword.current.type = 'password';
      refPasswordConfirm.current.type = 'password';
    }
  };


  // this function call inside function createUser
  const addOwnerName = async (id) => {
    try {
      setLoading( true );
      await setDoc( doc( db, 'names', id ), { owner } );
      setLoading( false );
      setError( false );
    } catch (err) {
      console.log( err )
      setError( true );
      setLoading( false );
    }
  };


  const createUser = async (e) => {
    e.preventDefault();
    if (owner === '' || confirmPass === '' || password === '' || email === '' || password !== confirmPass){
      setError( true );
      console.log('good')
      return;
    } else {
      try {
        setLoading( true );
        const userCredential = await createEmailPassword( email, password );
        const user = userCredential.user;
        await addOwnerName(user.uid);
        navigate( "/" );
        setLoading( false );
        setError( false );
      } catch (err) {
        console.log( err );
        setError( true );
        setLoading( false );
      }
    }
  };


  // console.log(showIconSignUp)
  const styleH4Error = {
    fontSize: '1.1rem',
    color: '#fff',
    letterSpacing: '1px',
  };

  return (
    <div className="signup flex-center">
      {loading && <div className="loading flex-center"><SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></div>}
      <div className={`container-signup ${width < 400 ? 'mobile-sm' : ''}`}>
        <h1>create new account</h1>
        <form onSubmit={createUser} className='flex-center'>
        <div>
            <label>user name</label>
            <input onChange={(e) => setOwner(e.target.value)} type="text" />
          </div>
          <div>
            <label>create email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div>
            <label>create password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="off"
              ref={refPassword}
            />
            <span onClick={handelShowIconPassword} className="signup-icon">{showIconSignUp ?  <AiFillEyeInvisible /> : <AiFillEye />}</span>
          </div>
          <div>
            <label>confirm password</label>
            <input
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              autoComplete="off"
              ref={refPasswordConfirm}
            />
            <span onClick={handelShowIconPassword} className="signup-icon">{showIconSignUp ?  <AiFillEyeInvisible /> : <AiFillEye />}</span>            
          </div>
          <button type="submit">create account</button>
        </form>
        <Link to="/">back</Link>
      </div>
      {error && <h4 style={styleH4Error}>{
        !owner ? 'Enter Your Name'
        : !email ? 'Enter your email address'
        : !password ? 'Enter Your Password'
        : !confirmPass ? 'Confirm Your Password'
        : password !== confirmPass ? 'Password Not Match ' : ''}</h4>
      }
    </div>
  );
}

export default memo(Signup);
