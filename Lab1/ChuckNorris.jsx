// ChuckNorris.jsx
import React, { useState, useEffect } from 'react';

function ChuckNorris({ token }) {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const getFact = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('http://localhost:3333/fact', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setFact(data.fact);
      } catch (error) {
        console.error('Error fetching fact:', error);
        setFact('Failed to load fact');
      }
      setLoading(false); // End loading
    };

    getFact();
  }, [token]);

  // Show loading spinner or fact
  return (
    <div>
      {loading ? <div>Loading...</div> : fact}
    </div>
  );
}

export default ChuckNorris;
