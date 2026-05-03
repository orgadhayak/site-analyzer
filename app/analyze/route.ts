export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: 'No URL provided' }, { status: 400 });
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch API' });
    }

    const data = await res.json();

    if (!data.lighthouseResult) {
      return Response.json({ error: 'Invalid response from Google' });
    }

    return Response.json({
      performance: Math.round(
        data.lighthouseResult.categories.performance.score * 100
      ),
      seo: Math.round(
        data.lighthouseResult.categories.seo.score * 100
      ),
    });

  } catch (error) {
    return Response.json({ error: 'Server error' });
  }
}
