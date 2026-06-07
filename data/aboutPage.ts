import { siteConfig } from "./siteConfig";

export const aboutPageMeta = {
  title: "About Ahtasham Aslam",
  description: `About ${siteConfig.name} (also Ahtesham Aslam, Ehtisham Aslam) — Python developer, n8n automation expert, and WhatsApp chatbot specialist in ${siteConfig.location.city}, ${siteConfig.location.country}.`,
};

export const aboutPageContent = {
  intro: `${siteConfig.name}, also known as ${siteConfig.alternateNames.join(" and ")}, is a custom website developer, n8n agent builder, AI chatbot specialist, and automation expert based in ${siteConfig.location.city}, ${siteConfig.location.country}.`,
  sections: [
    {
      heading: "Who I am",
      paragraphs: [
        `My name is ${siteConfig.name}. People often search for me as Ahtesham Aslam or Ehtisham Aslam — these are spelling variants of the same person. I am a freelance Python developer and AI automation specialist working with clients in Pakistan and internationally.`,
        `I started building production Python backends and automation scripts in 2024, then expanded into AI agents, WhatsApp chatbots, and multi-channel visibility (SEO, AEO, GEO). Today I help businesses replace manual work with reliable code — not demos that break after launch.`,
      ],
    },
    {
      heading: "Where I'm from",
      paragraphs: [
        `I am based in ${siteConfig.location.city}, ${siteConfig.location.country}. I work remotely with clients across Pakistan, the Gulf, Europe, and North America. Time-zone overlap and clear WhatsApp communication make projects run smoothly regardless of location.`,
      ],
    },
    {
      heading: "What I do",
      paragraphs: [
        `I am a Python & AI automation expert focused on real business outcomes: custom websites and ecommerce stores, WhatsApp AI chatbots for sales and support, n8n workflow automation, web scraping and lead pipelines, Django/Flask APIs, and SEO/AEO/GEO strategies so brands show up on Google and AI answer engines.`,
        `As a n8n workflow automation specialist, I connect email, spreadsheets, CRMs, payment gateways, and messaging apps into flows that run 24/7. As a WhatsApp chatbot developer, I build bots that handle menus, orders, quotes, and customer support with Python backends and LLM routing.`,
      ],
    },
    {
      heading: "Technologies I use",
      paragraphs: [
        `Python (Django, Flask, FastAPI), n8n, WhatsApp Business API, OpenAI and other LLM providers, PostgreSQL/MySQL, Google Sheets APIs, Selenium/Playwright scraping, WordPress/WooCommerce, and structured data (JSON-LD) for SEO and AEO.`,
      ],
    },
    {
      heading: "Why clients hire me",
      paragraphs: [
        `Clients hire me when they need a custom website developer in Pakistan who also understands automation — not a generic template shop. I deliver working systems: APIs that stay up, bots that reply correctly, scrapers that return clean data, and sites optimized for search and AI discovery.`,
        `I communicate clearly, document what I build, and price transparently. Whether you need a $100 ecommerce site, a $500 store with WhatsApp bot, or ongoing SEO/AEO/GEO at $100/month — you get a direct line to the developer, not a middleman.`,
      ],
    },
    {
      heading: "My background",
      paragraphs: [
        `I learned Python through building real client projects — lead scrapers, email parsers, inventory syncs, and customer-facing bots. That practical background shapes how I work: understand the business problem first, pick the simplest stack that scales, ship fast, then iterate.`,
        `If you found this page searching for Ahtasham, Ahtesham, or Ehtisham Aslam — you are in the right place. Explore my work portfolio, read the blog for guides on WhatsApp bots and SEO/AEO/GEO, or contact me for a free scope discussion.`,
      ],
    },
  ],
};
