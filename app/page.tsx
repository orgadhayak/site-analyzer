'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('');

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
      setStep('Navines is starting a real website audit...');

      setTimeout(() => setStep('Connecting to Google Lighthouse...'), 3000);
      setTimeout(() => setStep('Checking speed, SEO & accessibility...'), 8000);
      setTimeout(() => setStep('Analyzing website structure...'), 14000);
      setTimeout(() => setStep('Finding issues affecting conversions...'), 20000);
      setTimeout(() => setStep('Preparing your audit results...'), 30000);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fixedUrl }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || 'Error analyzing site');
        return;
      }

      setResult(data);
    } catch (e) {
      alert('Request failed.');
    } finally {
      setLoading(false);
      setStep('');
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 20% 20%, #0f172a, #020617)',
        color: 'white',
        fontFamily: 'Arial',
        padding: 30,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: 35,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p style={{ color: '#22c55e', fontWeight: 'bold' }}>
          Navines Website Intelligence
        </p>

        <h1 style={{ fontSize: 40 }}>Analyze Your Website</h1>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <input
            placeholder="example: navines.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #334155',
              background: '#020617',
              color: 'white',
            }}
          />

          <button
            onClick={analyze}
            disabled={loading}
            style={{
              padding: '12px 20px',
              borderRadius: 8,
              border: 0,
              background: '#22c55e',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {loading && (
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                height: 6,
                width: '100%',
                background: '#1e293b',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#22c55e',
                  animation: 'progress 2s infinite',
                }}
              />
            </div>

            <p style={{ marginTop: 10 }}>{step}</p>
          </div>
        )}

        {result && (
          <div style={{ marginTop: 30 }}>
            <h2>Results</h2>

            {[
              ['Performance', result.performance],
              ['SEO', result.seo],
              ['Accessibility', result.accessibility],
              ['Best Practices', result.bestPractices],
            ].map(([label, score]: any) => (
              <p key={label} style={{ color: scoreColor(score) }}>
                {label}: {score}
              </p>
            ))}

            <a
              href={`https://wa.me/972548180200?text=I analyzed ${encodeURIComponent(
                url
              )}`}
              target="_blank"
              style={{ display: 'block', marginTop: 15, color: '#22c55e' }}
            >
              👉 Contact on WhatsApp
            </a>

            <a
              href="mailto:hello@navines.com"
              style={{ display: 'block', marginTop: 10, color: '#aaa' }}
            >
              📧 Send Email
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 10%; }
          50% { width: 80%; }
          100% { width: 10%; }
        }
      `}</style>
    </main>
  );
}
