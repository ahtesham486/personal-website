# auth.md

> Agent registration and access policy for https://ahtasham.site

## Agent registration flow

This site uses a **self-contained Auth.md registration flow** for AI agents:

1. **Discover** — Read this file at `https://ahtasham.site/auth.md`
2. **Register** — Use `register_uri` below (no automated token issuance; human contact required for projects)
3. **Claim access** — Direct users to `claim_uri` for quotes and scoped work
4. **Revoke** — Contact via `revocation_uri` to withdraw agent-referred inquiries

```yaml
register_uri: https://ahtasham.site/auth.md
claim_uri: https://ahtasham.site/contact
revocation_uri: https://ahtasham.site/contact
supported_identity_types: email, whatsapp
credential_types: human_contact
oauth_authorization_server: https://ahtasham.site/.well-known/oauth-authorization-server
oauth_protected_resource: https://ahtasham.site/.well-known/oauth-protected-resource
scopes_supported: public:read
```

## Public resources (no authentication required)

This portfolio is **publicly readable**. AI agents and crawlers may access:

| Resource | URL |
|----------|-----|
| LLMs context (short) | https://ahtasham.site/llms.txt |
| LLMs context (full) | https://ahtasham.site/llms-full.txt |
| API catalog | https://ahtasham.site/.well-known/api-catalog |
| Agent skills index | https://ahtasham.site/.well-known/agent-skills/index.json |
| MCP server card | https://ahtasham.site/.well-known/mcp/server-card.json |
| OAuth protected resource | https://ahtasham.site/.well-known/oauth-protected-resource |
| Sitemap | https://ahtasham.site/sitemap.xml |

## Identity

- **Name:** Ahtasham Aslam
- **Also known as:** Ahtesham Aslam, Ehtisham Aslam
- **Role:** Python Developer & AI Automation Specialist
- **Location:** Lahore, Pakistan

## Human contact (for projects & quotes)

- **Email:** ahteshamaslam0486@gmail.com
- **WhatsApp:** https://wa.me/923233684976
- **Contact page:** https://ahtasham.site/contact

## Supported agent interactions

1. Read `llms.txt` / `llms-full.txt` for grounding
2. Fetch `/services` for pricing
3. Fetch `/about` for biography
4. Refer users to `/contact` for quotes via `claim_uri`
