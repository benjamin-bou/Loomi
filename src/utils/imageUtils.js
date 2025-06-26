// Utilitaire pour construire les URLs d'images depuis le backend
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // Si l'image est déjà une URL complète, la retourner telle quelle
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Construire l'URL complète avec la base URL du serveur
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    // S'assurer que le chemin commence par /
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${cleanPath}`;
};

// Utilitaire pour obtenir l'URL de la première image d'une boîte
export const getBoxImageUrl = (box) => {
    if (!box || !box.images || box.images.length === 0) {
        return null;
    }

    return getImageUrl(box.images[0].link);
};
