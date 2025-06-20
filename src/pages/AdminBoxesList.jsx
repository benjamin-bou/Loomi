import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getImageUrl } from '../api';

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
          {box.images && box.images.length > 0 ? (
              <img 
                src={getImageUrl(box.images[0].link)}
                alt={box.images[0].alt || `Boîte ${box.name}`}
                className="w-full max-w-[220px] rounded-xl mb-4 object-cover h-48"
                onError={(e) => {
                  e.target.src = "https://dummyimage.com/400x300/F4AECC/ffffff&text=Boite";
                }}
              />
            ) : (
              <img 
                src="https://dummyimage.com/400x300/F4AECC/ffffff&text=Boite" 
                alt={`Boîte ${box.name}`}
                className="w-full max-w-[220px] rounded-xl mb-4 object-cover h-48"
              />
            )}

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