export async function POST(req: Request) {
  const { url } = await req.json();

  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`
  );

  const data = await res.json();

  return Response.json({
    performance: Math.round(
      data.lighthouseResult.categories.performance.score * 100
    ),
    seo: Math.round(
      data.lighthouseResult.categories.seo.score * 100
    ),
  });
}
