import close from '/images/picto/close.svg';
import logo from '/images/picto/logo_phase_1.svg';
import { useEffect, useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';

export default function AuthModal({ show, setShow }) {
  const [mode, setMode] = useState('login');

  const handleShowLogin = () => setMode('login');
  const handleShowRegister = () => setMode('register');
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!show) setMode('login');
  }, [show]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#5f5f5f7d] z-40 transition-opacity duration-300 cursor-pointer ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      ></div>
      {/* Modal */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col p-6"
        style={{
          background: 'white',
          boxShadow: show ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
          width: show ? 400 : 0,
          opacity: show ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          pointerEvents: show ? 'auto' : 'none',
        }}
      >
        {/* Close button */}
        <button onClick={handleClose} className="p-2 cursor-pointer self-end">
          <img src={close} alt="fermer" className="h-6 w-6" />
        </button>
        {/* Logo */}
        <div className="flex justify-center my-4">
          <img src={logo} alt="logo" className="h-15" />
        </div>
        {/* Titre */}
        <h2 className="text-xl text-center font-bold mb-6">
          {mode === 'login' ? 'Connecte-toi ou crée ton compte' : mode === 'register' ? 'Créer un compte' : 'Réinitialiser le mot de passe'}
        </h2>
        {/* Contenu dynamique */}
        {mode === 'login' ? (
          <Login onShowRegister={handleShowRegister} onClose={handleClose} onShowForgot={() => setMode('forgot')} />
        ) : mode === 'register' ? (
          <Register onShowLogin={handleShowLogin} onClose={handleClose} />
        ) : (
          <ForgotPassword onShowLogin={handleShowLogin} onClose={handleClose} />
        )
        }
      </div>
    </>
  );
}
