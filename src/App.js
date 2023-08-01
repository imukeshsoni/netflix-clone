import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/login/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const user = null;
  return (
    <div className='app'>
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path='/' Component={HomeScreen}></Route>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
