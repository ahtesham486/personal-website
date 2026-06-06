export type ServicePackage = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
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
    id: "custom-website",
    title: "Custom Website",
    subtitle: "Fast, professional site tailored to your brand",
    price: 100,
    originalPrice: 150,
    features: [
      "Unique modern design",
      "Mobile & tablet responsive",
      "Contact form + WhatsApp link",
      "Basic SEO & meta tags",
      "Fast loading (Core Web Vitals)",
      "Google-friendly structure",
      "2 revision rounds included",
    ],
    cta: "Start Your Website",
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
    "Affordable web development, ecommerce + WhatsApp chatbots, AI agents, and Python automation by Ahtasham Aslam — transparent pricing from $100.",
};
