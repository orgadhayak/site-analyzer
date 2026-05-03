'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{padding:40, fontFamily:'Arial'}}>
      <h1>Analyze Your Website</h1>

      <input
        placeholder="Enter your website"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{padding:10, width:'300px'}}
      />

      <button onClick={analyze} style={{marginLeft:10, padding:10}}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {result && (
        <div style={{marginTop:30}}>
          <h3>Results:</h3>
          <p>Performance: {result.performance}</p>
          <p>SEO: {result.seo}</p>

          <a
            href={`https://wa.me/972XXXXXXXXX?text=I analyzed ${url}`}
            target="_blank"
          >
            👉 Get Full Fix on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
