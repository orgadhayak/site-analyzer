export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: 'No URL' }, { status: 400 });
    }

    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile`;

    const res = await fetch(api);

    const data = await res.json();

    if (!data.lighthouseResult) {
      return Response.json({ error: 'Failed to analyze' });
    }

    return Response.json({
      performance: Math.round(
        data.lighthouseResult.categories.performance.score * 100
      ),
      seo: Math.round(
        data.lighthouseResult.categories.seo.score * 100
      ),
    });
  } catch (err) {
    return Response.json({ error: 'Server error' });
  }
}
