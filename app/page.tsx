'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setResult(null);

    let fixedUrl = url.trim();

    if (!fixedUrl) {
      alert('Please enter a website URL');
      return;
    }

    if (!fixedUrl.startsWith('http://') && !fixedUrl.startsWith('https://')) {
      fixedUrl = 'https://' + fixedUrl;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fixedUrl }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || 'Error analyzing site');
        return;
      }

      setResult(data);
    } catch (e) {
      alert('Request failed. Check Vercel logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Analyze Your Website</h1>

      <input
        placeholder="Enter your website"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: 10, width: '320px' }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{ marginLeft: 10, padding: 10 }}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Results:</h3>
          <p>Performance: {result.performance}</p>
          <p>SEO: {result.seo}</p>
          <p>Accessibility: {result.accessibility}</p>
          <p>Best Practices: {result.bestPractices}</p>

          <a
            href={`https://wa.me/972XXXXXXXXX?text=I analyzed ${encodeURIComponent(
              fixedUrl
            )}`}
            target="_blank"
          >
            👉 Get Full Fix on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
