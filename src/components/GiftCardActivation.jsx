import { useState } from 'react';
import { postData } from '../api';
import MainButton from './addOns/MainButton';

export default function GiftCardActivation({ onClose, onActivationSuccess }) {
  const [giftCardCode, setGiftCardCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleActivation = async () => {
    if (!giftCardCode.trim()) {
      setError('Veuillez saisir un code de carte cadeau');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await postData('/gift-cards/activate', {
        code: giftCardCode.trim().toUpperCase()
      });

      setSuccess(`Carte cadeau activée avec succès ! Type: ${response.giftCard.type}`);
      
      // Appeler le callback de succès si fourni
      if (onActivationSuccess) {
        onActivationSuccess(response.giftCard);
      }

      // Fermer automatiquement après 2 secondes
      setTimeout(() => {
        onClose();
      }, 2000);    } catch (error) {
      console.error('Erreur activation carte cadeau:', error);
      
      // Gestion spécifique des erreurs HTTP
      if (error.response) {
        const status = error.response.status;
        const backendMessage = error.response.data?.message;
        
        if (status === 404) {
          setError('Code de carte cadeau invalide ou non trouvé. Vérifiez le code saisi.');
        } else if (status === 400) {
          setError(backendMessage || 'Carte cadeau invalide ou déjà utilisée');
        } else {
          setError(backendMessage || 'Erreur lors de l\'activation de la carte cadeau');
        }
      } else {
        // Erreur réseau ou autre
        setError('Erreur de connexion. Vérifiez votre connexion internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatGiftCardCode = (value) => {
    // Format automatique: GIFT-XXXX-XXXX
    const cleaned = value.replace(/[^A-Z0-9]/g, '');
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
    }
  };

  const handleInputChange = (e) => {
    const formatted = formatGiftCardCode(e.target.value.toUpperCase());
    setGiftCardCode(formatted);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-[2rem] p-8 max-w-[600px] w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Activer ma carte cadeau</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-center">
            <div className="text-green-500 text-lg mb-4">✓ {success}</div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Code de la carte cadeau
              </label>
              <input
                type="text"
                value={giftCardCode}
                onChange={handleInputChange}
                placeholder="GIFT-XXXX-XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB3D88] focus:border-transparent text-center font-mono text-lg"
                maxLength={14} // GIFT-XXXX-XXXX = 14 caractères
                disabled={loading}
              />
            </div>            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                disabled={loading}
              >
                Annuler
              </button>
              <MainButton
                text={loading ? "Activation..." : "Activer"}
                onClick={handleActivation}
                disabled={loading || !giftCardCode.trim()}
                className="flex-1"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
