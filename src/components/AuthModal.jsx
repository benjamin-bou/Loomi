import Login from '../Login';
import Register from '../Register';
import { useEffect, useState } from 'react';

export default function AuthModal({ show, setShow }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const handleShowLogin = () => setMode('login');
  const handleShowRegister = () => setMode('register');

  useEffect(() => {
    if (!show) setMode('login');
  }, [show]);

  if (!show) return null;

  return (
    <>
      {mode === 'login' && (
        <Login
          showLogin={show}
          setShowLogin={setShow}
          onShowRegister={handleShowRegister}
        />
      )}
      {mode === 'register' && (
        <Register
          showRegister={show}
          setShowRegister={setShow}
          onShowLogin={handleShowLogin}
        />
      )}
    </>
  );
}
