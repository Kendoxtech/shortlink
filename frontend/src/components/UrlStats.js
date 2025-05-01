// src/components/UrlStats.js
import React, { useState } from 'react';
import { fetchStats } from '../api';

function UrlStats() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchStats(code);
      setStats(res.data);
    } catch (err) {
      alert('Stats not found');
    }
  };

  return (
    <div>
      <h2>URL Stats</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter short code (e.g. abc123)"
          required
        />
        <button type="submit">Get Stats</button>
      </form>
      {stats && (
        <div>
          <p>Original URL: {stats.long_url}</p>
          <p>Visits: {stats.visits}</p>
          <p>Created on: {stats.creation_date}</p>
        </div>
      )}
    </div>
  );
}

export default UrlStats;
