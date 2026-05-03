export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: 'No URL provided' }, { status: 400 });
    }

    const key = process.env.GOOGLE_API_KEY;

    if (!key) {
      return Response.json({ error: 'Missing GOOGLE_API_KEY' }, { status: 500 });
    }

    const apiUrl =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
      `?url=${encodeURIComponent(url)}` +
      `&strategy=mobile` +
      `&category=performance` +
      `&category=seo` +
      `&category=accessibility` +
      `&category=best-practices` +
      `&key=${key}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: data.error?.message || 'Google API error' },
        { status: 500 }
      );
    }

    if (!data.lighthouseResult?.categories) {
      return Response.json(
        { error: 'No lighthouse data returned' },
        { status: 500 }
      );
    }

    const categories = data.lighthouseResult.categories;

    return Response.json({
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score ?? 0) * 100),
    });
  } catch (e) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
