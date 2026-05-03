export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const key = process.env.GOOGLE_API_KEY;

    if (!key) {
      return Response.json({ error: 'Missing GOOGLE_API_KEY' }, { status: 500 });
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${key}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log('Google response:', data); // חשוב לבדיקה

    if (!res.ok) {
      return Response.json({
        error: data.error?.message || 'Google API error',
      });
    }

    if (!data.lighthouseResult) {
      return Response.json({ error: 'No lighthouse data returned' });
    }

    return Response.json({
      performance: Math.round(data.lighthouseResult.categories.performance.score * 100),
      seo: Math.round(data.lighthouseResult.categories.seo.score * 100),
      accessibility: Math.round(data.lighthouseResult.categories.accessibility.score * 100),
      bestPractices: Math.round(
        data.lighthouseResult.categories['best-practices'].score * 100
      ),
    });
  } catch (e) {
    return Response.json({ error: 'Server crash' });
  }
}
