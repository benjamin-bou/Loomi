import { useEffect, useState } from 'react';

function BoxesList() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    async function fetchBoxes() {
      try {
        const response = await fetch('/api/boxes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` // Use an environment variable for security
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch boxes');
        }

        const data = await response.json();
        setBoxes(data);
      } catch (error) {
        console.error('Error fetching boxes:', error);
      }
    }

    fetchBoxes();
  }, []);

  return (
    <div>
      <h1>Boxes List</h1>
      <ul>
        {boxes.map(box => (
          <li key={box.id}>{box.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BoxesList;