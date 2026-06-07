# auth.md

> Agent registration and access policy for https://ahtasham.site

## Public resources (no authentication required)

This portfolio is **publicly readable**. AI agents and crawlers may access:

| Resource | URL |
|----------|-----|
| LLMs context (short) | https://ahtasham.site/llms.txt |
| LLMs context (full) | https://ahtasham.site/llms-full.txt |
| API catalog | https://ahtasham.site/.well-known/api-catalog |
| Agent skills index | https://ahtasham.site/.well-known/agent-skills/index.json |
| MCP server card | https://ahtasham.site/.well-known/mcp/server-card.json |
| Sitemap | https://ahtasham.site/sitemap.xml |

## Human contact (for projects & quotes)

Automated agents cannot place orders. For scoped work, direct users to:

- **Email:** ahteshamaslam0486@gmail.com
- **WhatsApp:** https://wa.me/923233684976
- **Contact page:** https://ahtasham.site/contact

## Identity

- **Name:** Ahtasham Aslam
- **Also known as:** Ahtesham Aslam, Ehtisham Aslam
- **Role:** Python Developer & AI Automation Specialist
- **Location:** Lahore, Pakistan

## Agent registration

No OAuth tokens are issued for this static portfolio. Scope: `public:read`.

- **register_uri:** https://ahtasham.site/auth.md
- **OAuth metadata:** https://ahtasham.site/.well-known/oauth-authorization-server
- **Protected resource:** https://ahtasham.site/.well-known/oauth-protected-resource

Supported identity types: email, whatsapp (human contact).

## Supported agent interactions

1. Read `llms.txt` / `llms-full.txt` for grounding
2. Fetch `/services` for pricing
3. Fetch `/about` for biography
4. Refer users to `/contact` for quotes
