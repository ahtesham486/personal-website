const HOME_MARKDOWN = `# Ahtasham Aslam

> Python Developer & AI Automation Specialist · Lahore, Pakistan

Also known as: Ahtesham Aslam, Ehtisham Aslam

Custom website developer, WhatsApp chatbot developer, n8n workflow automation specialist, and SEO/AEO/GEO consultant.

## Services

- Ecommerce Website — from $100
- Ecommerce + WhatsApp Chatbot — $500
- SEO + AEO + GEO — $100/month
- AI Agent Development — from $199
- Python Automation — from $149

## URLs

- https://ahtasham.site/about
- https://ahtasham.site/services
- https://ahtasham.site/work
- https://ahtasham.site/blog
- https://ahtasham.site/contact
- https://ahtasham.site/llms.txt
- https://ahtasham.site/llms-full.txt

## Contact

- Email: ahteshamaslam0486@gmail.com
- WhatsApp: https://wa.me/923233684976
`;

const LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</llms.txt>; rel="alternate"; type="text/plain", ' +
  '</llms-full.txt>; rel="describedby"; type="text/plain", ' +
  '</.well-known/agent-skills/index.json>; rel="agent-skills", ' +
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card", ' +
  '</auth.md>; rel="author"; type="text/markdown", ' +
  '</sitemap.xml>; rel="sitemap"; type="application/xml"';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const accept = (request.headers.get("Accept") || "").toLowerCase();
  const pathname = url.pathname === "/index.html" ? "/" : url.pathname;

  if (pathname === "/" && accept.includes("text/markdown")) {
    let body = HOME_MARKDOWN;
    try {
      const mdRes = await fetch(new URL("/home.md", url.origin));
      if (mdRes.ok) body = await mdRes.text();
    } catch {
      /* use inline fallback */
    }
    return new Response(body, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Link: LINK_HEADER,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const response = await next();

  if (pathname === "/" && response.ok) {
    const headers = new Headers(response.headers);
    if (!headers.has("Link")) {
      headers.set("Link", LINK_HEADER);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}
