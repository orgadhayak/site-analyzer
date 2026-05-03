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

      setTimeout(() => setStep('Connecting to Google Lighthouse for a trusted performance scan...'), 3500);
      setTimeout(() => setStep('Checking mobile speed, SEO, accessibility and best practices...'), 8000);
      setTimeout(() => setStep('Building a clearer picture of your website health...'), 14000);
      setTimeout(() => setStep('Looking for issues that may affect conversions, trust and rankings...'), 21000);
      setTimeout(() => setStep('Almost there — real audits take time because we scan the live page...'), 32000);
      setTimeout(() => setStep('Preparing your Navines audit summary...'), 45000);

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

  const contactText = encodeURIComponent(
    `Hi Navines, I analyzed my website: ${url}. Please send me a full optimization plan.`
  );

  const emailSubject = encodeURIComponent('Website Optimization Plan Request');
  const emailBody = encodeURIComponent(
    `Hi Navines,

I used the website analyzer and would like to receive a full optimization plan.

Website: ${url}

Please send me recommendations for improving speed, SEO, accessibility and conversions.

Thank you.`
  );

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050505, #111827)',
      color: 'white',
      fontFamily: 'Arial',
      padding: 30
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 35,
        borderRadius: 20,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        <p style={{ color: '#22c55e', fontWeight: 'bold' }}>
          Navines Website Intelligence
        </p>

        <h1 style={{ fontSize: 42, marginBottom: 10 }}>
          Analyze Your Website
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: 17 }}>
          Run a real audit and get a clear view of your site speed, SEO, accessibility and technical quality.
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
              Please keep this page open. A real live audit may take 20–60 seconds.
            </p>
          </div>
        )}

        {result && (
          <div style={{ marginTop: 35 }}>
            <h2>Your Navines Audit Results</h2>

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
              <h3>Want the full fix plan?</h3>

              <p style={{ color: '#cbd5e1' }}>
                Navines can review the full audit and send you a clear action plan for speed,
                SEO, accessibility and conversion improvements.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 15 }}>
                <a
                  href={`https://wa.me/972548180200?text=${contactText}`}
                  target="_blank"
                  style={{
                    display: 'inline-block',
                    padding: '14px 22px',
                    borderRadius: 10,
                    background: '#22c55e',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Contact on WhatsApp
                </a>

                <a
                  href={`mailto:hello@navines.com?subject=${emailSubject}&body=${emailBody}`}
                  style={{
                    display: 'inline-block',
                    padding: '14px 22px',
                    borderRadius: 10,
                    background: '#2563eb',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Send by Email
                </a>
              </div>
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
