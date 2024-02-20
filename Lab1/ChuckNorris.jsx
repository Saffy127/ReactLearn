// ChuckNorris.jsx
import React, { useState, useEffect } from 'react';

function ChuckNorris({ token }) {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const getFact = async () => {
      const response = await fetch('http://localhost:3333/fact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setFact(data.fact);
    };

    getFact();
  }, [token]);

  return <div>{fact}</div>;
}

export default ChuckNorris;
