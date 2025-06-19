import close from '/images/picto/close.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavModal({ show, setShow }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleNavClick = (path) => {
    navigate(path);
    setShow(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#5f5f5f7d] z-40 transition-opacity duration-300 cursor-pointer ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShow(false)}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="fixed top-0 left-0 h-full z-50 flex flex-col px-6 pt-6 pb-8"
        style={{
          background: 'white',
          boxShadow: show ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
          width: show ? 300 : 0,
          opacity: show ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          pointerEvents: show ? 'auto' : 'none',
        }}
      >        {/* Top bar */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setShow(false)} className="p-2 cursor-pointer">
            <img src={close} alt="fermer" className="h-5 w-5" />
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Recherche"
            className="w-full border-b border-black outline-none focus:border-gray-600 pb-2 text-base"
          />
        </div>

        {/* Navigation items */}
        <nav className="flex-1">
          <ul className="space-y-6">
            <li>
              <button 
                onClick={() => handleNavClick('/boxes')}
                className="w-full text-left text-lg font-medium text-gray-800 hover:text-loomipink transition-colors py-2 border-b border-gray-100"
              >
                Nos box
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('/subscriptions')}
                className="w-full text-left text-lg font-medium text-gray-800 hover:text-loomipink transition-colors py-2 border-b border-gray-100"
              >
                Nos abonnements
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('/gift-cards')}
                className="w-full text-left text-lg font-medium text-gray-800 hover:text-loomipink transition-colors py-2 border-b border-gray-100"
              >
                Cartes cadeaux
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('/about')}
                className="w-full text-left text-lg font-medium text-gray-800 hover:text-loomipink transition-colors py-2 border-b border-gray-100"
              >
                À propos
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick('/blog')}
                className="w-full text-left text-lg font-medium text-gray-800 hover:text-loomipink transition-colors py-2 border-b border-gray-100"
              >
                Blog
              </button>
            </li>
          </ul>
        </nav>

        {/* Bottom section - peut contenir des liens secondaires */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={() => handleNavClick('/profile')}
            className="w-full text-left text-sm text-gray-600 hover:text-loomipink transition-colors py-2"
          >
            Mon profil
          </button>
          <button 
            onClick={() => handleNavClick('/profile/favorites')}
            className="w-full text-left text-sm text-gray-600 hover:text-loomipink transition-colors py-2"
          >
            Mes favoris
          </button>
        </div>
      </div>
    </>
  );
}

export default NavModal;
