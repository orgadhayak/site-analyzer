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
      setStep('Connecting to Google Lighthouse...');

      setTimeout(() => setStep('Running mobile performance test...'), 4000);
      setTimeout(() => setStep('Checking SEO, accessibility and best practices...'), 10000);
      setTimeout(() => setStep('Generating your website audit report...'), 18000);
      setTimeout(() => setStep('Almost done. Real audits can take up to 60 seconds...'), 30000);

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
      alert('Request failed. Check Vercel logs.');
    } finally {
      setLoading(false);
      setStep('');
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return '#16a34a';
    if (score >= 50) return '#f59e0b';
    return '#dc2626';
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050505, #111827)',
      color: 'white',
      fontFamily: 'Arial',
      padding: 30
    }}>
      <div style={{
        maxWidth: 850,
        margin: '0 auto',
        padding: 35,
        borderRadius: 20,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        <h1 style={{ fontSize: 42, marginBottom: 10 }}>Analyze Your Website</h1>

        <p style={{ color: '#cbd5e1', fontSize: 17 }}>
          Get a real Google Lighthouse audit for performance, SEO, accessibility and best practices.
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 25, flexWrap: 'wrap' }}>
          <input
            placeholder="Enter your website, example: navines.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              padding: 15,
              flex: 1,
              minWidth: 280,
              borderRadius: 10,
              border: '1px solid #334155',
              fontSize: 16
            }}
          />

          <button
            onClick={analyze}
            disabled={loading}
            style={{
              padding: '15px 25px',
              borderRadius: 10,
              border: 0,
              background: loading ? '#475569' : '#22c55e',
              color: 'white',
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {loading && (
          <div style={{
            marginTop: 25,
            padding: 20,
            borderRadius: 14,
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.35)'
          }}>
            <div style={{
              width: 35,
              height: 35,
              border: '4px solid rgba(255,255,255,0.2)',
              borderTop: '4px solid #22c55e',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: 15
            }} />
            <strong>{step}</strong>
            <p style={{ color: '#cbd5e1', marginBottom: 0 }}>
              Please keep this page open. A real audit may take 20–60 seconds.
            </p>
          </div>
        )}

        {result && (
          <div style={{ marginTop: 35 }}>
            <h2>Your Audit Results</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 15,
              marginTop: 20
            }}>
              {[
                ['Performance', result.performance],
                ['SEO', result.seo],
                ['Accessibility', result.accessibility],
                ['Best Practices', result.bestPractices],
              ].map(([label, score]: any) => (
                <div key={label} style={{
                  padding: 20,
                  borderRadius: 15,
                  background: '#020617',
                  border: '1px solid #1e293b'
                }}>
                  <div style={{ color: '#94a3b8' }}>{label}</div>
                  <div style={{
                    fontSize: 38,
                    fontWeight: 'bold',
                    color: scoreColor(score),
                    marginTop: 8
                  }}>
                    {score}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 25,
              padding: 20,
              borderRadius: 15,
              background: 'rgba(255,255,255,0.06)'
            }}>
              <h3>What this means</h3>
              <p style={{ color: '#cbd5e1' }}>
                Low performance can reduce conversions, rankings and user trust.
                We can review the full report and send you a clear fix plan.
              </p>

              <a
                href={`https://wa.me/972548180200?text=${encodeURIComponent(
                  `Hi, I analyzed my website: ${url}. Please send me a full optimization plan.`
                )}`}
                target="_blank"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  padding: '14px 22px',
                  borderRadius: 10,
                  background: '#22c55e',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Get Full Fix on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
