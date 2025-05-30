import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'loomi_favorites';

export const useFavorites = () => {    // Initialiser directement avec les données du localStorage
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites);
                return parsed;
            } catch (error) {
                console.error('Erreur lors du chargement des favoris:', error);
                return [];
            }
        }
        return [];
    });

    // Sauvegarder les favoris dans le localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // Ajouter ou retirer un favori
    const toggleFavorite = (boxId) => {
        setFavorites(prev => {
            if (prev.includes(boxId)) {
                return prev.filter(id => id !== boxId);
            } else {
                return [...prev, boxId];
            }
        });
    };

    // Vérifier si une boîte est en favori
    const isFavorite = (boxId) => {
        return favorites.includes(boxId);
    };

    // Obtenir toutes les boîtes favorites (nécessite les données des boîtes)
    const getFavoriteBoxes = (allBoxes) => {
        return allBoxes.filter(box => favorites.includes(box.id));
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        getFavoriteBoxes
    };
};
