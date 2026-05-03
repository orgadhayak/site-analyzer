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
      setStep('Starting a real Navines website audit...');

      setTimeout(() => setStep('Connecting to Google Lighthouse...'), 3500);
      setTimeout(() => setStep('Scanning performance and Core Web Vitals...'), 9000);
      setTimeout(() => setStep('Checking SEO, accessibility and best practices...'), 16000);
      setTimeout(() => setStep('Building your website health snapshot...'), 26000);
      setTimeout(() => setStep('Almost done. Real live audits can take up to 60 seconds...'), 38000);

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
    if (score >= 90) return '#00f5ff';
    if (score >= 50) return '#ffe600';
    return '#ff2bd6';
  };

  const scoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 50) return 'Needs work';
    return 'Critical';
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
    <main className="page">
      <div className="stars" />

      <section className="card">
        <div className="brand">NAVINES WEBSITE INTELLIGENCE</div>

        <h1>Analyze Your Website</h1>

        <p className="subtitle">
          Real Google Lighthouse audit for speed, SEO, accessibility and technical quality.
        </p>

        <div className="form">
          <input
            placeholder="example: navines.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button onClick={analyze} disabled={loading}>
            {loading ? 'Analyzing' : 'Analyze'}
          </button>
        </div>

        {loading && (
          <div className="loadingBox">
            <div className="scanner">
              <span />
            </div>

            <div className="loadingTitle">{step}</div>

            <p>
              Keep this page open. We are running a real live audit, not a fake instant score.
            </p>

            <div className="dots">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}

        {result && (
          <div className="results">
            <h2>Your Navines Audit Results</h2>

            <div className="scoreGrid">
              {[
                ['Performance', result.performance],
                ['SEO', result.seo],
                ['Accessibility', result.accessibility],
                ['Best Practices', result.bestPractices],
              ].map(([label, score]: any) => (
                <div className="scoreCard" key={label}>
                  <div className="scoreLabel">{label}</div>
                  <div className="scoreNumber" style={{ color: scoreColor(score) }}>
                    {score}
                  </div>
                  <div className="scoreStatus" style={{ color: scoreColor(score) }}>
                    {scoreText(score)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary">
              <h3>Want the full fix plan?</h3>
              <p>
                Navines can review the full audit and send you a clear plan to improve speed,
                SEO, trust and conversions.
              </p>

              <div className="actions">
                <a
                  className="whatsapp"
                  href={`https://wa.me/972548180200?text=${contactText}`}
                  target="_blank"
                >
                  Contact on WhatsApp
                </a>

                <a
                  className="email"
                  href={`mailto:hello@navines.com?subject=${emailSubject}&body=${emailBody}`}
                >
                  Send by Email
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 10%, rgba(0,245,255,0.14), transparent 28%),
            radial-gradient(circle at 80% 20%, rgba(255,43,214,0.12), transparent 30%),
            linear-gradient(180deg, #000000 0%, #05070d 100%);
          color: #ffffff;
          font-family: Arial, Helvetica, sans-serif;
          padding: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(#ffffff 1px, transparent 1px),
            radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 90px 90px, 140px 140px;
          background-position: 0 0, 40px 60px;
          opacity: 0.18;
          pointer-events: none;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 930px;
          padding: 42px;
          border-radius: 22px;
          background: rgba(0,0,0,0.78);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 0 40px rgba(0,245,255,0.10),
            0 0 70px rgba(255,43,214,0.08);
          backdrop-filter: blur(14px);
        }

        .brand {
          color: #00f5ff;
          letter-spacing: 2px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 16px;
          text-shadow: 0 0 14px rgba(0,245,255,0.8);
        }

        h1 {
          font-size: 48px;
          line-height: 1;
          margin: 0 0 14px;
          letter-spacing: -1px;
        }

        .subtitle {
          color: rgba(255,255,255,0.72);
          font-size: 17px;
          margin: 0 0 28px;
        }

        .form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        input {
          flex: 1;
          min-width: 280px;
          padding: 16px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.22);
          background: #05070d;
          color: #ffffff;
          font-size: 16px;
          outline: none;
        }

        input:focus {
          border-color: #00f5ff;
          box-shadow: 0 0 22px rgba(0,245,255,0.25);
        }

        button {
          padding: 16px 28px;
          border-radius: 12px;
          border: 1px solid #00f5ff;
          background: #ffffff;
          color: #000000;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 18px rgba(0,245,255,0.35);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loadingBox {
          margin-top: 26px;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(0,245,255,0.28);
          background: rgba(255,255,255,0.04);
        }

        .scanner {
          height: 2px;
          width: 100%;
          background: rgba(255,255,255,0.16);
          overflow: hidden;
          margin-bottom: 18px;
        }

        .scanner span {
          display: block;
          height: 100%;
          width: 35%;
          background: linear-gradient(90deg, transparent, #00f5ff, #ff2bd6, transparent);
          animation: scan 2.4s linear infinite;
        }

        .loadingTitle {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
        }

        .loadingBox p {
          color: rgba(255,255,255,0.65);
          margin-bottom: 0;
        }

        .dots {
          display: flex;
          gap: 6px;
          margin-top: 14px;
        }

        .dots i {
          width: 7px;
          height: 7px;
          background: #00f5ff;
          border-radius: 50%;
          animation: pulse 1.2s infinite;
        }

        .dots i:nth-child(2) {
          animation-delay: 0.2s;
          background: #ffffff;
        }

        .dots i:nth-child(3) {
          animation-delay: 0.4s;
          background: #ff2bd6;
        }

        .results {
          margin-top: 34px;
        }

        .scoreGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
          margin-top: 18px;
        }

        .scoreCard {
          padding: 22px;
          border-radius: 16px;
          background: #05070d;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .scoreLabel {
          color: rgba(255,255,255,0.62);
          font-size: 14px;
        }

        .scoreNumber {
          font-size: 42px;
          font-weight: 900;
          margin-top: 8px;
        }

        .scoreStatus {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .summary {
          margin-top: 24px;
          padding: 22px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .summary p {
          color: rgba(255,255,255,0.7);
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .actions a {
          padding: 14px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 900;
        }

        .whatsapp {
          background: #ffffff;
          color: #000000;
          border: 1px solid #00f5ff;
          box-shadow: 0 0 18px rgba(0,245,255,0.35);
        }

        .email {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.28);
        }

        @keyframes scan {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @media (max-width: 640px) {
          .page {
            padding: 18px;
          }

          .card {
            padding: 26px;
          }

          h1 {
            font-size: 36px;
          }

          button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
