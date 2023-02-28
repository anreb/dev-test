import React, {useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Account from './Account';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/" element={isLoggedIn ? <Account /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
  )
}

export default App;
