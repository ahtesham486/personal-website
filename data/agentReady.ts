import { siteConfig } from "./siteConfig";

const base = siteConfig.siteUrl;

export const homeMarkdown = `# ${siteConfig.name}

> ${siteConfig.jobTitle} · ${siteConfig.location.city}, ${siteConfig.location.country}

${siteConfig.name} (also: ${siteConfig.alternateNames.join(", ")}) builds custom websites, WhatsApp AI chatbots, n8n automations, AI agents, Python APIs, and SEO/AEO/GEO strategies.

## Services

- Ecommerce Website — from $100
- Ecommerce + WhatsApp Chatbot — $500
- SEO + AEO + GEO — $100/month
- AI Agent Development — from $199
- Python Automation — from $149

## Key URLs

- Home: ${base}/
- About: ${base}/about
- Services: ${base}/services
- Work: ${base}/work
- Blog: ${base}/blog
- Contact: ${base}/contact
- LLMs context: ${base}/llms.txt
- Full context: ${base}/llms-full.txt

## Contact

- Email: ${siteConfig.email}
- WhatsApp: +${siteConfig.whatsappNumber}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}
`;

export const linkHeaderValue = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</llms.txt>; rel="alternate"; type="text/plain"`,
  `</llms-full.txt>; rel="describedby"; type="text/plain"`,
  `</.well-known/agent-skills/index.json>; rel="agent-skills"`,
  `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
  `</auth.md>; rel="author"; type="text/markdown"`,
  `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
].join(", ");

export const apiCatalog = {
  linkset: [
    {
      anchor: `${base}/`,
      item: [
        { href: `${base}/llms.txt`, rel: "service-desc" },
        { href: `${base}/llms-full.txt`, rel: "service-desc" },
        { href: `${base}/services`, rel: "service-doc" },
        { href: `${base}/contact`, rel: "status" },
        { href: `${base}/about`, rel: "service-doc" },
      ],
    },
  ],
};

export const oauthAuthorizationServer = {
  issuer: base,
  authorization_endpoint: `${base}/contact`,
  registration_endpoint: `${base}/auth.md`,
  scopes_supported: ["public:read"],
  response_types_supported: ["none"],
  grant_types_supported: [],
  token_endpoint_auth_methods_supported: [],
  service_documentation: `${base}/llms.txt`,
  agent_auth: {
    register_uri: `${base}/auth.md`,
    supported_identity_types: ["email", "whatsapp"],
    credential_types: ["human_contact"],
    documentation: `${base}/llms-full.txt`,
  },
};

export const openIdConfiguration = {
  issuer: base,
  authorization_endpoint: `${base}/contact`,
  registration_endpoint: `${base}/auth.md`,
  scopes_supported: ["public:read", "openid"],
  response_types_supported: ["none"],
  grant_types_supported: [],
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: [],
};

export const oauthProtectedResource = {
  resource: `${base}/`,
  authorization_servers: [`${base}/.well-known/oauth-authorization-server`],
  scopes_supported: ["public:read"],
  resource_documentation: `${base}/llms.txt`,
  bearer_methods_supported: ["header"],
};

export const mcpServerCard = {
  schemaVersion: "2024-11-05",
  serverInfo: {
    name: "ahtasham-portfolio",
    title: `${siteConfig.name} Portfolio`,
    version: "1.0.0",
  },
  description:
    "Informational discovery server for Ahtasham Aslam — Python developer, WhatsApp bots, n8n automation, and SEO/AEO/GEO services.",
  documentation: `${base}/llms-full.txt`,
  capabilities: {
    tools: { listChanged: false },
    resources: { subscribe: false, listChanged: false },
    prompts: { listChanged: false },
  },
  transports: [
    {
      type: "documentation",
      url: `${base}/llms.txt`,
    },
  ],
};

export const agentSkillsIndex = {
  $schema: "https://agentskills.io/schemas/discovery/v0.2.0",
  skills: [
    {
      name: "ahtasham-portfolio-full",
      type: "knowledge",
      description: "Complete profile, services, pricing, and contact for Ahtasham Aslam",
      url: `${base}/llms-full.txt`,
      sha256: "3794cd8b0185b0a3c78f4661d90b75d71ccf083b0dec94bd8b4e0b52c08f20eb",
    },
    {
      name: "ahtasham-services",
      type: "knowledge",
      description: "Services and pricing — ecommerce, WhatsApp bots, SEO/AEO/GEO",
      url: `${base}/services`,
      sha256: "",
    },
    {
      name: "ahtasham-contact",
      type: "action",
      description: "Contact for quotes — email and WhatsApp",
      url: `${base}/contact`,
      sha256: "",
    },
  ],
};
