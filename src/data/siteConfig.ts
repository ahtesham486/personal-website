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
  year: new Date().getFullYear(),
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

export const workProjects = [
  {
    num: "01",
    title: "WhatsApp AI Chatbot",
    category: "Product",
    tools: "Python, LLM, WhatsApp API, AI Automation",
    image: "/images/work-whatsapp-bot.webp",
  },
  {
    num: "02",
    title: "Lead Scraper Pipeline",
    category: "Web Scraping",
    tools: "Python, Scraping, Data Cleaning, CSV Export",
    image: "/images/work-lead-scraper.webp",
  },
  {
    num: "03",
    title: "Email + Sheets Automation",
    category: "AI Automation",
    tools: "Python, APIs, Google Sheets, Alerts",
    image: "/images/work-email-sheets.webp",
  },
  {
    num: "04",
    title: "Custom Python APIs",
    category: "Backend Development",
    tools: "Flask, Django, REST APIs, Automation",
    image: "/images/work-python-api.webp",
  },
  {
    num: "05",
    title: "E-commerce Data Scraper",
    category: "Web Scraping",
    tools: "Python, Price Tracking, Competitor Intel",
    image: "/images/work-ecommerce-scraper.webp",
  },
  {
    num: "06",
    title: "Business Workflow Bot",
    category: "WhatsApp Bot",
    tools: "AI Chatbot, Order Taking, Menu Images",
    image: "/images/work-workflow-bot.webp",
  },
];
