export type WorkCaseStudy = {
  problem: string;
  solution: string;
  tools: string[];
  results: string[];
  sections: { heading: string; body: string }[];
};

export const workCaseStudies: Record<string, WorkCaseStudy> = {
  "whatsapp-ai-chatbot": {
    problem:
      "A service business needed 24/7 WhatsApp replies for quotes, FAQs, and order intake — but manual replies caused slow response times and lost leads after hours.",
    solution:
      "Built a production WhatsApp AI chatbot with Python backend, LLM intent routing, structured order flows, and admin notifications for new conversations.",
    tools: ["Python", "WhatsApp Business API", "LLM orchestration", "PostgreSQL", "Webhook handlers"],
    results: [
      "24/7 automated replies on WhatsApp",
      "Faster quote and order capture",
      "Reduced manual support load",
      "Deploy-ready product for similar businesses",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "The client received dozens of WhatsApp messages daily — product questions, price requests, and order details — but could only reply during business hours. Leads went cold overnight and weekends. They needed a WhatsApp chatbot developer in Pakistan who could build something production-grade, not a fragile no-code demo.",
      },
      {
        heading: "Architecture & build",
        body: "I designed a Python service that receives WhatsApp webhooks, classifies intent with an LLM layer, and routes users through guided flows: menu browsing, quote collection, and order confirmation. Session state is stored server-side so conversations resume correctly. Admin alerts fire on high-intent messages and completed orders.",
      },
      {
        heading: "Outcome",
        body: "The bot now handles first-line support and sales qualification around the clock. The business owner reviews exceptions in a dashboard hook and escalates only when needed. The same codebase is packaged as a reusable product for restaurants, shops, and service providers.",
      },
    ],
  },
  "lead-scraper-pipeline": {
    problem:
      "A sales team spent hours copying contact details from directories and competitor sites into spreadsheets — inconsistent data and missed follow-ups.",
    solution:
      "Automated multi-source web scraping pipeline with deduplication, validation, and scheduled CSV/Excel export.",
    tools: ["Python", "BeautifulSoup", "Playwright", "Pandas", "Cron scheduling"],
    results: [
      "Hundreds of leads collected per run",
      "Clean, deduplicated contact lists",
      "Scheduled daily exports",
      "Hours of manual work eliminated weekly",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "Manual lead research does not scale. The client's team needed verified emails and phone numbers from niche directories, but copy-paste introduced duplicates and outdated records. They wanted a Python lead scraper pipeline that could run on a schedule and deliver sales-ready files.",
      },
      {
        heading: "Pipeline design",
        body: "I built modular scrapers per source, normalized fields into a common schema, ran validation rules (format checks, domain filters), and merged results with hash-based deduplication. Failed pages retry with backoff; successful runs log counts and output timestamped CSV and Excel files to cloud storage.",
      },
      {
        heading: "Outcome",
        body: "Sales now starts each morning with a fresh lead file instead of manual hunting. The pipeline runs unattended and alerts on anomalies. The client reinvested saved hours into outreach, improving close rates without hiring extra researchers.",
      },
    ],
  },
  "email-sheets-automation": {
    problem:
      "Invoices and order confirmations arrived by email but data entry into Google Sheets was slow and error-prone.",
    solution:
      "Python automation that parses incoming emails, extracts structured fields, writes to Sheets, and triggers Slack/email alerts.",
    tools: ["Python", "Gmail API", "Google Sheets API", "Regex parsers", "Cron jobs"],
    results: [
      "Near-instant Sheet updates from email",
      "Fewer manual entry mistakes",
      "Alerts on urgent orders",
      "Audit trail of parsed records",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "Operations relied on staff reading emails and typing details into spreadsheets — typos, delays, and missed urgent orders were common. The business needed n8n-style reliability with custom Python parsers tuned to their email formats.",
      },
      {
        heading: "Implementation",
        body: "I connected Gmail via API, built parsers for each supplier template, mapped fields to Sheet columns, and added idempotency keys so duplicate emails do not create duplicate rows. Threshold-based alerts notify managers when high-value or same-day orders appear.",
      },
      {
        heading: "Outcome",
        body: "Data lands in Sheets within minutes of email arrival. Staff focus on exceptions instead of typing. The workflow runs daily without supervision and scales as email volume grows.",
      },
    ],
  },
  "custom-python-apis": {
    problem:
      "A growing product needed secure REST APIs, user auth, and third-party integrations — but off-the-shelf tools did not match business rules.",
    solution:
      "Custom Django/Flask APIs with role-based auth, PostgreSQL models, webhooks, and integration endpoints tailored to client logic.",
    tools: ["Flask", "Django", "PostgreSQL", "JWT auth", "REST", "Webhooks"],
    results: [
      "Stable API layer for web and mobile clients",
      "Role-based permissions",
      "Webhook integrations with partners",
      "Documented endpoints for future devs",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "The client's frontend team needed dependable backend endpoints for user accounts, billing events, and partner webhooks. Generic BaaS platforms could not model their permission rules or reporting needs. They hired a Python backend developer to own the server side properly.",
      },
      {
        heading: "Build approach",
        body: "I designed REST resources with clear versioning, implemented JWT-based auth and role checks, and structured PostgreSQL schemas for auditability. Webhook receivers validate signatures and queue retries. OpenAPI-style docs help the frontend team integrate without guesswork.",
      },
      {
        heading: "Outcome",
        body: "The API supports current users and new features without rewrites. Integrations with payment and notification providers run through a single backend the team controls. Uptime and error logging give visibility production apps require.",
      },
    ],
  },
  "ecommerce-data-scraper": {
    problem:
      "An ecommerce brand needed competitor price and stock monitoring but manual checks missed changes and reacted too slowly.",
    solution:
      "Scheduled scraper tracking competitor catalogs, price history, and alert thresholds for drops and stock signals.",
    tools: ["Python", "HTTP scraping", "Price normalization", "SQLite history", "Email alerts"],
    results: [
      "Automated competitor price tracking",
      "Historical charts for pricing decisions",
      "Alerts on significant drops",
      "Faster repricing response",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "Pricing teams checked competitor sites manually — inconsistent timing meant lost margin opportunities when rivals undercut. The brand wanted automated competitor intelligence with historical context, not one-off snapshots.",
      },
      {
        heading: "Monitoring system",
        body: "I built scrapers per competitor storefront, normalized SKUs where possible, stored time-series prices locally, and computed week-over-week deltas. Alert rules fire when prices fall beyond configured percentages or when key items go out of stock.",
      },
      {
        heading: "Outcome",
        body: "Merchandising sees price movements in a dashboard export and adjusts listings proactively. The system runs on a cron schedule and has reduced reactive firefighting to structured, data-driven repricing.",
      },
    ],
  },
  "business-workflow-bot": {
    problem:
      "A restaurant chain took orders via WhatsApp manually — menu photos, modifications, and branch routing created chaos at peak hours.",
    solution:
      "WhatsApp workflow bot with menu images, structured order taking, status updates, and branch-specific routing for staff.",
    tools: ["Python", "WhatsApp API", "Image handling", "Order state machine", "Admin notifications"],
    results: [
      "Structured WhatsApp orders with menu images",
      "Branch routing for kitchen staff",
      "Status updates to customers",
      "Less peak-hour message chaos",
    ],
    sections: [
      {
        heading: "The challenge",
        body: "Customers loved ordering on WhatsApp but messages were unstructured — wrong branch, missing items, unclear modifiers. Staff re-typed orders into internal systems. The owner needed a WhatsApp chatbot developer who understood food service workflows.",
      },
      {
        heading: "Workflow bot",
        body: "I implemented a guided flow: greet → show menu categories with images → collect item modifiers → confirm total → assign branch → notify kitchen. Customers receive status updates; admins can override or cancel through backend hooks.",
      },
      {
        heading: "Outcome",
        body: "Peak-hour WhatsApp chaos dropped significantly. Orders arrive in a consistent format staff can act on immediately. The multi-branch setup scales as new locations open without retraining customers on a new channel.",
      },
    ],
  },
};
