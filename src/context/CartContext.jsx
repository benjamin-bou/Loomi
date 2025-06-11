import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [activatedGiftCards, setActivatedGiftCards] = useState(() => {
    const savedGiftCards = localStorage.getItem('activatedGiftCards');
    return savedGiftCards ? JSON.parse(savedGiftCards) : [];
  });

  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };  const removeFromCart = (id, removeAll = false) => {
    let updatedCart;

    if (removeAll) {
      // Trouver l'item à supprimer
      const itemToRemove = cart.find(item => item.id === id);
      
      // Si c'est une carte cadeau, supprimer aussi les items reliés
      if (itemToRemove && itemToRemove.type === 'giftcard_usage') {
        const relatedItems = cart.filter(item => 
          item.giftCardCode === itemToRemove.giftCardCode && 
          (item.type === 'subscription' || item.type === 'box') && 
          item.paidWithGiftCard
        );
        // Supprimer la carte cadeau et tous les items reliés
        updatedCart = cart.filter((item) => 
          item.id !== id && 
          !relatedItems.some(relatedItem => relatedItem.id === item.id)
        );
      } else {
        updatedCart = cart.filter((item) => item.id !== id);
      }
    } else {
      updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const addActivatedGiftCard = (giftCard) => {
    const updatedGiftCards = [...activatedGiftCards, giftCard];
    setActivatedGiftCards(updatedGiftCards);
    localStorage.setItem('activatedGiftCards', JSON.stringify(updatedGiftCards));
  };

  const removeActivatedGiftCard = (giftCardId) => {
    const updatedGiftCards = activatedGiftCards?.filter(gc => gc?.id !== giftCardId);
    setActivatedGiftCards(updatedGiftCards);
    localStorage.setItem('activatedGiftCards', JSON.stringify(updatedGiftCards));
  };
  
  const useGiftCardForPayment = (giftCardId) => {
    // Marquer la carte cadeau comme utilisée pour le paiement
    const updatedGiftCards = activatedGiftCards.map(gc => 
      gc.id === giftCardId ? { ...gc, usedForPayment: true } : gc
    );
    setActivatedGiftCards(updatedGiftCards);
    localStorage.setItem('activatedGiftCards', JSON.stringify(updatedGiftCards));
  };  const addGiftCardToCart = (giftCard, selectedBox = null) => {
    // Ajouter la carte cadeau au panier avec un prix de 0
    const cartItem = {
      id: `giftcard_usage_${giftCard.id}`, // ID unique pour éviter les conflits
      name: giftCard.giftCardType?.name || 'Carte cadeau',
      type: 'giftcard_usage',
      price: 0,
      base_price: 0,
      quantity: 1,
      giftCardCode: giftCard.code,
      originalGiftCard: giftCard
    };
    
    // Supprimer tout autre usage de carte cadeau du panier
    const filteredCart = cart.filter(item => item.type !== 'giftcard_usage');
    
    let updatedCart = [...filteredCart, cartItem];
      // Si un item est sélectionné (box ou subscription), l'ajouter aussi
    if (selectedBox) {
      const selectedItem = {
        ...selectedBox,
        type: selectedBox.type || 'box', // Respecter le type de l'item ou défaut 'box'
        quantity: 1,
        paidWithGiftCard: true,
        giftCardCode: giftCard.code,
        price: 0, // Prix à 0 car payé avec carte cadeau
        originalPrice: selectedBox.price || selectedBox.base_price // Garder le prix original pour référence
      };
      updatedCart.push(selectedItem);
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const validateGiftCardInCart = async () => {
    // Vérifier si une carte cadeau dans le panier est toujours valide
    const giftCardItem = cart.find(item => item.type === 'giftcard_usage');
    if (!giftCardItem) return true;

    try {
      const { fetchData } = await import('../api');
      const response = await fetchData('/my-gift-cards');
      const dbGiftCards = response.giftCards || [];
      
      // Vérifier si la carte est toujours valide et activée par l'utilisateur connecté
      const validCard = dbGiftCards.find(dbCard => 
        dbCard.code === giftCardItem.giftCardCode && !dbCard.used_at
      );
      
      if (!validCard) {
        // Supprimer la carte invalide du panier
        const filteredCart = cart.filter(item => item.type !== 'giftcard_usage');
        setCart(filteredCart);
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la validation de la carte cadeau:', error);
      return true; // En cas d'erreur, on laisse passer
    }
  };  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      activatedGiftCards,
      addActivatedGiftCard,
      removeActivatedGiftCard,
      useGiftCardForPayment,
      addGiftCardToCart,
      validateGiftCardInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);