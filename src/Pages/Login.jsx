import {useState, memo, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { CTXAuth } from '../Context/ContextProviderAuth';
import { CTXTheme } from '../Context/ContextTheme';
import './login.css';
import { SpinnerRoundOutlined } from 'spinners-react';
import { googleProvider, auth } from '../configFirebase/configFirebase';
import { signInWithPopup } from 'firebase/auth'
import { MdDone } from 'react-icons/md';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState( "" );
    const [showCheckBox, setShowCheckBox] = useState( false );
    const [showPassword, setShowPassword] = useState( true );
    const [password, setPassword] = useState("");
    const { signInEmailPassword, user } = CTXAuth();
    const { loading, setLoading, error, setError} = CTXTheme();
    const navigate = useNavigate( '' );
    const refPassword = useRef();
    const refEmail = useRef();


    const showIconPassword = () => {
        setShowPassword( ( prev ) => !prev );
        showPassword ? refPassword.current.type = 'text' : refPassword.current.type = 'password';
    }

    const handelCheckBoxShow = () => {
        setShowCheckBox( ( prev ) => !prev );
    }

    const signIn = async (e) => {
        e.preventDefault();
        try {
            setLoading( true );
            setError( false );
            await signInEmailPassword( email, password );
            navigate( `/dashboard/${ user?.uid }` );
            // setErorr( false );
            setLoading( false );
        } catch (err) {
            console.log( err )
            setLoading(false);
            setError( true );
        }
    }
    

    const handelLoginGoogle = async (e) => {
        e.preventDefault();
        try {
            setLoading( true );
            setError( false );
            const loginGoogle = await signInWithPopup( auth, googleProvider );
            const user = loginGoogle.user;
            navigate( `/dashboard/${ loginGoogle?.user?.uid }` );
            setTimeout(() => {
                setLoading(false);
            }, 1000 );

        } catch (err) {
            setLoading( false );
            setError( true );
        }
    }

    // Focus input
    useEffect(() => {
        refEmail.current.focus();
    }, []);

  return (
      
      <div className='login flex-center'>
          {loading && <div className="loading flex-center"><SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></div>}
          <div className="container-login">
              <h1>Login</h1>
              <form onClick={(e) => e.preventDefault()}  className={``}>
                  <div>
                      {/* <label>email</label> */}
                      <input ref={refEmail} onChange={( e ) => setEmail( e.target.value )} placeholder='email' type="email" />
                  </div>
                  <div>
                      {/* <label>password</label> */}
                      <input ref={refPassword} onChange={( e ) => setPassword( e.target.value )} placeholder='password' type="password" autoComplete='off' />
                      <span onClick={showIconPassword} className='login-icon'>{showPassword ?  <AiFillEyeInvisible /> : <AiFillEye />}</span>
                  </div>
                  <div onClick={handelCheckBoxShow}>
                      <div>
                          {/* <input id='check' type="checkbox" name='check' /> */}
                          <span className='check-box flex-center'>{ showCheckBox ? <MdDone /> : ''}</span>
                      </div>
                      <div>
                        <label htmlFor="check">remember me</label>
                      </div>
                  </div>
                  <div>
                      <button onClick={signIn} type='submit'>login</button>
                      <button onClick={handelLoginGoogle} type='submit'>google</button>
                      <Link to='/signup'>register</Link>
                  </div>
              </form>
              {error ? <h4>{`${email === '' ? 'Enter Your Email' : password === '' ? 'Enter Your Password' : 'Your Account Invalid'}`}</h4> : ''}
          </div>
    </div>
  )
}

export default memo( Login );