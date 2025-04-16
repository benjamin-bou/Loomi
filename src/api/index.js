import axios from 'axios';

// Créé une instance Axios avec une configuration par défaut
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// requête GET
export const fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
};

// requête POST
export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'envoi des données: ", error);
        throw error;
    }
};

export default apiClient;