import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminBoxesList = () => {
    const [boxes, setBoxes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoxes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
                // try {
                //     const payload = JSON.parse(atob(token.split('.')[1]));
                //     console.log('Decoded token:', payload);
                //     if (payload.role) {
                //         console.log('User role:', payload.role); // affiche le rôle de l'utilisateur
                //     } else {
                //         console.error('Role not found in token payload');
                //     }
                // } catch (e) {
                //     console.error('Failed to decode token', e);
                // }

                const response = await api.get('/admin/boxes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBoxes(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/'); // Non admin user, redirect to home
                    return;
                } else if (err.response && err.response.status === 403) {
                    setError('Unauthorized access. Admins only.');
                } else {
                    setError('Failed to fetch boxes.');
                }
            }
        };

        fetchBoxes();
    }, [navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
    <div className="bg-[#FFF7F0] min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
        {boxes.map((box) => (
          <div key={box.id} className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center">
            {/* <img
              src={`/images/${box.image}`} // Ex: "kit-tricot.png"
              alt={`Boîte ${box.name}`}
              className="w-full max-w-[220px] rounded-xl mb-4"
            /> */}
            <img src="https://dummyimage.com/400x300/F4AECC/ffffff&text=Boite" />

            <h2 className="text-2xl font-semibold mb-2">
              {box.name}
            </h2>
            <p className="mb-4">{box.description}</p>
            <button
              className="bg-loomipink text-white px-5 py-2 rounded-full font-semibold hover:bg-[#e04d4d] transition cursor-pointer"
              onClick={() => window.location.href = `/admin/boxes/${box.id}`}
            >
              Voir le produit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBoxesList;