import React from 'react';
import './ProfileScreen.css';
import Nav from '../../nav/Nav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import PlansScreen from '../plans/PlansScreen';
import { auth } from '../../firebase';

function ProfileScreen() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
    auth.signOut();
  }
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt='avatar'
          />
          <div className='profileScreen__details'>
            <h2>{user.email}</h2>
            <div className='profileScreen__plans'>
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => logout()}
                className='profileScreen__signOut'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
