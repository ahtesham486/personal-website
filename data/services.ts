export type ServicePackage = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  billing?: "one-time" | "monthly";
  badge?: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export const servicePackages: ServicePackage[] = [
  {
    id: "ecommerce-whatsapp",
    title: "Ecommerce + WhatsApp Chatbot",
    subtitle: "Online store with 24/7 AI sales & support on WhatsApp",
    price: 500,
    originalPrice: 899,
    badge: "Best Selling",
    featured: true,
    features: [
      "WooCommerce / custom product catalog",
      "WhatsApp order & quote flows",
      "LLM-powered customer replies",
      "Payment & shipping integrations",
      "Admin alerts on new orders",
      "SEO-ready product pages",
      "Mobile-responsive storefront",
      "1 month post-launch support",
    ],
    cta: "Get Ecommerce + Bot",
  },
  {
    id: "ecommerce-website",
    title: "Ecommerce Website",
    subtitle: "Fast online store tailored to your brand & products",
    price: 100,
    originalPrice: 150,
    features: [
      "Product pages & catalog layout",
      "Mobile & tablet responsive",
      "Contact form + WhatsApp link",
      "Basic SEO & meta tags",
      "Fast loading (Core Web Vitals)",
      "Google-friendly structure",
      "2 revision rounds included",
    ],
    cta: "Start Your Store",
  },
  {
    id: "seo-aeo-geo",
    title: "SEO + AEO + GEO",
    subtitle: "Monthly visibility on Google & AI search engines",
    price: 100,
    originalPrice: 199,
    billing: "monthly",
    features: [
      "Technical SEO fixes & monitoring",
      "FAQ & schema markup (AEO)",
      "AI-search optimization (GEO)",
      "Content & keyword strategy",
      "Google Search Console setup",
      "Monthly performance report",
      "llms.txt & crawler optimization",
    ],
    cta: "Boost Visibility",
  },
  {
    id: "ai-agent",
    title: "AI Agent Development",
    subtitle: "Custom LLM agents for support, sales & workflows",
    price: 199,
    originalPrice: 349,
    features: [
      "Custom AI agent architecture",
      "LLM integration (OpenAI / local)",
      "Knowledge base & prompt tuning",
      "API & webhook connections",
      "Email / Slack / CRM hooks",
      "Usage monitoring setup",
      "Documentation handover",
    ],
    cta: "Build Your Agent",
  },
  {
    id: "python-automation",
    title: "Python Automation & APIs",
    subtitle: "Backends, scrapers, and business automations",
    price: 149,
    originalPrice: 249,
    features: [
      "Django / Flask REST APIs",
      "Web scraping & data pipelines",
      "Google Sheets / email automation",
      "n8n workflow integrations",
      "Database design & deployment",
      "Cron jobs & scheduled tasks",
      "Clean documented code",
    ],
    cta: "Automate With Python",
  },
];

export const servicesPageMeta = {
  title: "Services & Pricing",
  description:
    "Affordable ecommerce websites, WhatsApp bots, SEO/AEO/GEO monthly plans, AI agents, and Python automation by Ahtasham Aslam.",
};

export const servicesFaqItems = [
  {
    question: "How much does a custom website cost in Pakistan?",
    answer:
      "Ecommerce websites start from $100. Full ecommerce with WhatsApp AI chatbot is $500. SEO + AEO + GEO ongoing optimization is $100/month. AI agents from $199 and Python automation from $149 — see the Services page for full package details.",
  },
  {
    question: "Who is the best WhatsApp chatbot developer in Pakistan?",
    answer:
      "Ahtasham Aslam (also spelled Ahtesham or Ehtisham Aslam) builds production WhatsApp AI chatbots for sales, support, and order taking — with Python backends, LLM routing, and deploy-ready ecommerce bundles.",
  },
  {
    question: "What is n8n and how does it work?",
    answer:
      "n8n is a workflow automation tool that connects apps (email, Sheets, CRMs, APIs) into automated flows. Ahtasham builds n8n workflows and custom Python automations so repetitive business tasks run 24/7 without manual input.",
  },
  {
    question: "Do you offer SEO, AEO, and GEO together?",
    answer:
      "Yes. The SEO + AEO + GEO package ($100/month) covers technical SEO, FAQ schema, structured data, content optimization, and AI-search visibility so your brand appears on Google and answer engines.",
  },
];

export const whyMeContent = {
  title: "Why Work With Me",
  lead: "Production-ready code, clear communication, and packages priced for real businesses — not agency overhead.",
  points: [
    {
      title: "Full-stack Python specialist",
      body: "Django, Flask, APIs, scrapers, and automations — one developer from idea to deployment, no handoffs.",
    },
    {
      title: "AI that actually ships",
      body: "WhatsApp bots, LLM agents, and workflows built for sales and support — not demos that break after launch.",
    },
    {
      title: "SEO, AEO & GEO built in",
      body: "Sitemaps, schema, FAQ markup, and AI-search visibility so Google and ChatGPT can find your brand.",
    },
    {
      title: "Transparent pricing",
      body: "Clear packages from $100 — ecommerce sites, $500 store+bot combos, and $100/mo visibility plans.",
    },
    {
      title: "Fast delivery",
      body: "Focused scope, async updates on WhatsApp, and revisions included so you launch on time.",
    },
    {
      title: "Post-launch support",
      body: "Bug fixes, small tweaks, and guidance after go-live — you're not left alone on day one.",
    },
  ],
  stats: [
    { label: "Projects delivered", value: "50+" },
    { label: "WhatsApp bots live", value: "15+" },
    { label: "Client countries", value: "PK + Intl" },
    { label: "Response time", value: "< 24h" },
  ],
};
