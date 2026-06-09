const HOME_MARKDOWN = `# Ahtasham Aslam

> Python Developer & AI Automation Specialist · Rahim Yar Khan, Pakistan

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

/** Static assets must bypass worker logic (WASM/GLB/JS chunks break if streamed wrong). */
const STATIC_PREFIXES = ["/_next/", "/models/", "/draco/", "/images/", "/icon.svg"];

function isStaticAsset(pathname) {
  return STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = (request.headers.get("Accept") || "").toLowerCase();
    const pathname = url.pathname === "/index.html" ? "/" : url.pathname;

    if (isStaticAsset(pathname)) {
      return env.ASSETS.fetch(request);
    }

    if (pathname === "/" && accept.includes("text/markdown")) {
      const asset = await env.ASSETS.fetch(new URL("/home.md", url));
      const body = asset.ok ? await asset.text() : HOME_MARKDOWN;
      return new Response(body, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Link: LINK_HEADER,
          Vary: "Accept",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);

    if (pathname === "/" && response.ok) {
      const headers = new Headers(response.headers);
      if (!headers.has("Link")) {
        headers.set("Link", LINK_HEADER);
      }
      headers.set("Vary", "Accept");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};
