export const siteConfig = {
  name: "Ahtasham Aslam",
  firstName: "AHTASHAM",
  lastName: "ASLAM",
  tagline: "Python Backend · AI Agents · Automation · WordPress · SEO/AEO/GEO/AIO",
  roles: ["Developer", "Automator"],
  email: "ahteshamaslam0486@gmail.com",
  whatsappNumber: "923233684976",
  whatsappUrl: "https://wa.me/923233684976",
  github: "https://github.com/ahtesham486",
  linkedin: "https://www.linkedin.com",
  siteUrl: "https://ahtasham.site",
  locale: "en_US",
  year: 2026,
};

export const aboutContent = {
  headline: "Python developer — backends, AI agents & automation.",
  note: "WordPress & SEO · AEO · GEO · AIO",
  skills: [
    "Django & Flask APIs",
    "AI Agent Builder",
    "Model Prediction",
    "n8n Automation",
    "WhatsApp Bots",
    "Web Scraping",
  ],
};

export type WhatIDoItem = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export const whatIDoItems: WhatIDoItem[] = [
  {
    title: "ENGINEER",
    subtitle: "Production-Grade Python Backends",
    description:
      "Django and Flask systems, clean API design, database architecture, and server-side logic built for uptime — not prototypes that break after launch.",
    tags: ["Python", "Django", "Flask", "SQL", "REST APIs", "n8n", "Web Scraping", "Data Pipelines"],
  },
  {
    title: "ORCHESTRATE",
    subtitle: "AI Agents, Bots & Predictions",
    description:
      "Custom LLM agents, WhatsApp bots for sales and support, trained prediction models, and connected workflows that run your operations around the clock.",
    tags: ["AI Agents", "LLM", "WhatsApp API", "ML Models", "Automation", "Integrations", "n8n", "Cron Jobs"],
  },
  {
    title: "AMPLIFY",
    subtitle: "WordPress & Multi-Channel Visibility",
    description:
      "Fast WordPress builds paired with SEO, AEO, GEO, and AIO strategy — so people discover your brand on search engines, voice assistants, and AI tools alike.",
    tags: ["WordPress", "SEO", "AEO", "GEO", "AIO", "Schema Markup", "Core Web Vitals", "Content SEO"],
  },
];

export const careerItems = [
  {
    role: "Freelance Python Developer",
    company: "Independent",
    year: "2024",
    desc: "Building custom automation scripts, APIs, and data pipelines for clients across Pakistan and internationally.",
  },
  {
    role: "AI Automation Specialist",
    company: "Client Projects",
    year: "2025",
    desc: "Delivered AI-powered workflows — email parsing, report generation, lead scraping, and smart business integrations.",
  },
  {
    role: "WhatsApp Chatbot Developer",
    company: "Product & Services",
    year: "NOW",
    desc: "Creating ready-to-deploy WhatsApp AI bots for restaurants, shops, and service businesses with 24/7 support.",
  },
];

export type WorkProject = {
  num: string;
  slug: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  description: string;
  highlights: string[];
};

export const workProjects: WorkProject[] = [
  {
    num: "01",
    slug: "whatsapp-ai-chatbot",
    title: "WhatsApp AI Chatbot",
    category: "Product",
    tools: "Python, LLM, WhatsApp API, AI Automation",
    image: "/images/work-whatsapp-bot.webp",
    description:
      "Production-ready WhatsApp AI chatbot for sales, support, and lead capture. Handles menu images, order flows, and 24/7 customer replies using Python backends and LLM orchestration.",
    highlights: ["WhatsApp Business API", "LLM intent routing", "Order & quote flows", "Deploy-ready product"],
  },
  {
    num: "02",
    slug: "lead-scraper-pipeline",
    title: "Lead Scraper Pipeline",
    category: "Web Scraping",
    tools: "Python, Scraping, Data Cleaning, CSV Export",
    image: "/images/work-lead-scraper.webp",
    description:
      "Automated lead extraction pipeline that scrapes target websites, cleans records, deduplicates contacts, and exports structured CSV/Excel for sales teams.",
    highlights: ["Multi-source scraping", "Data cleaning", "Scheduled runs", "CSV/Excel export"],
  },
  {
    num: "03",
    slug: "email-sheets-automation",
    title: "Email + Sheets Automation",
    category: "AI Automation",
    tools: "Python, APIs, Google Sheets, Alerts",
    image: "/images/work-email-sheets.webp",
    description:
      "Workflow automation that parses incoming emails, extracts structured data, writes to Google Sheets, and triggers alerts for time-sensitive business events.",
    highlights: ["Email parsing", "Google Sheets sync", "Slack/email alerts", "Cron scheduling"],
  },
  {
    num: "04",
    slug: "custom-python-apis",
    title: "Custom Python APIs",
    category: "Backend Development",
    tools: "Flask, Django, REST APIs, Automation",
    image: "/images/work-python-api.webp",
    description:
      "Custom REST APIs built with Flask and Django — authentication, database design, webhooks, and integrations tailored to client business logic.",
    highlights: ["REST API design", "Auth & permissions", "PostgreSQL/MySQL", "Webhook integrations"],
  },
  {
    num: "05",
    slug: "ecommerce-data-scraper",
    title: "E-commerce Data Scraper",
    category: "Web Scraping",
    tools: "Python, Price Tracking, Competitor Intel",
    image: "/images/work-ecommerce-scraper.webp",
    description:
      "Competitor price and product monitoring for e-commerce brands. Tracks catalog changes, price drops, and stock signals on a schedule.",
    highlights: ["Price tracking", "Competitor monitoring", "Historical charts", "Alert thresholds"],
  },
  {
    num: "06",
    slug: "business-workflow-bot",
    title: "Business Workflow Bot",
    category: "WhatsApp Bot",
    tools: "AI Chatbot, Order Taking, Menu Images",
    image: "/images/work-workflow-bot.webp",
    description:
      "WhatsApp workflow bot for restaurants and retail — menu browsing, order taking, status updates, and admin notifications in one connected system.",
    highlights: ["Menu image support", "Order management", "Admin dashboard hooks", "Multi-branch ready"],
  },
];

export const faqItems = [
  {
    question: "What services does Ahtasham Aslam offer?",
    answer:
      "Python backend development, AI agents, WhatsApp chatbots, web scraping, n8n automation, WordPress builds, and SEO/AEO/GEO/AIO visibility strategy.",
  },
  {
    question: "Do you build WhatsApp AI chatbots for businesses?",
    answer:
      "Yes. I build WhatsApp bots for sales, support, order taking, and lead capture — integrated with Python backends and LLM workflows.",
  },
  {
    question: "Can you help with SEO, AEO, and GEO for my brand?",
    answer:
      "Yes. I implement technical SEO, structured data, FAQ schema, content strategy, and AI-search optimization so your brand is discoverable on Google and AI answer engines.",
  },
  {
    question: "How can I hire Ahtasham for a Python or automation project?",
    answer:
      "Contact via email at ahteshamaslam0486@gmail.com or WhatsApp at +92 323 3684976 to discuss scope, timeline, and quote.",
  },
];
