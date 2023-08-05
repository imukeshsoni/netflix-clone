import React, { useRef, useState } from 'react';
import './LoginScreen.css';
import SignupScreen from '../signup/SignupScreen.js';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className='loginScreen'>
      <div className='loginScreen__background'>
        <img
          onClick={() => navigate('/')}
          className='loginScreen__logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt=''
        />
        <button onClick={() => setSignIn(true)} className='loginScreen__button'>
          Sign In
        </button>
        <div className='loginScreen__gradient' />
      </div>

      <div className='loginScreen__body'>
        {signIn ? (
          <SignupScreen email={emailRef?.current && emailRef.current.value}/>
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className='loginScreen__input'>
              <form>
                <input type='email' ref={emailRef} placeholder='Email Address' />
                <button
                  onClick={() => setSignIn(true)}
                  type='submit'
                  className='loginScreen__getStarted'
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
