import React, { useRef, useEffect, useState } from 'react';
import './SignupScreen.css';
import { auth } from '../../firebase';

function SignupScreen({ email }) {
  const emailRef = useRef(email);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const register = (e) => {
    e.preventDefault();
    // check email format
    if (!isEmail(emailRef.current.value)) {
      setError('Please enter a valid email address.');
      return;
    }
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .catch((_err) => {
        setError('Something went wrong. Please try again.')
      });
  };

  useEffect(() => {
    emailRef.current.value = email;
  }, [email])


  const signIn = (e) => {
    e.preventDefault();
    // check email format
    if (!isEmail(emailRef.current.value)) {
      setError('Please enter a valid email address.');
      return;
    }
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).catch((_err) => {
        setError('Username or password is incorrect.')
      });
  };

  return (
    <div className='signupScreen'>
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type='email'
          name='Email'
          placeholder='Email'
          required
        />
        <input
          ref={passwordRef}
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <span className="signupScreen__error">
          {error}
        </span>
        <button onClick={signIn} type='submit'>Sign In</button>
        <h4>
          <span className='signupScreen__gray'>New to Netflix? </span>
          <span className='signupScreen__link' onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
