"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

type ModelContext = {
  provideContext: (ctx: {
    tools: Array<{
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
      execute: (input: Record<string, unknown>) => Promise<unknown>;
    }>;
  }) => void;
};

export default function AgentWebMCP() {
  useEffect(() => {
    const nav = navigator as Navigator & { modelContext?: ModelContext };
    if (!nav.modelContext?.provideContext) return;

    try {
      nav.modelContext.provideContext({
        tools: [
          {
            name: "get_developer_info",
            description:
              "Get identity and role for Ahtasham Aslam — Python developer and AI automation specialist in Pakistan",
            inputSchema: { type: "object", properties: {}, additionalProperties: false },
            execute: async () => ({
              name: siteConfig.name,
              alternateNames: siteConfig.alternateNames,
              jobTitle: siteConfig.jobTitle,
              location: `${siteConfig.location.city}, ${siteConfig.location.country}`,
              site: siteConfig.siteUrl,
              llms: `${siteConfig.siteUrl}/llms.txt`,
            }),
          },
          {
            name: "get_services",
            description: "List development services and starting prices",
            inputSchema: { type: "object", properties: {}, additionalProperties: false },
            execute: async () => ({
              services: [
                { name: "Ecommerce Website", price: "$100" },
                { name: "Ecommerce + WhatsApp Chatbot", price: "$500" },
                { name: "SEO + AEO + GEO", price: "$100/month" },
                { name: "AI Agent Development", price: "from $199" },
                { name: "Python Automation", price: "from $149" },
              ],
              url: `${siteConfig.siteUrl}/services`,
            }),
          },
          {
            name: "get_contact",
            description: "Get contact details for project quotes",
            inputSchema: { type: "object", properties: {}, additionalProperties: false },
            execute: async () => ({
              email: siteConfig.email,
              whatsapp: siteConfig.whatsappUrl,
              contactPage: `${siteConfig.siteUrl}/contact`,
            }),
          },
        ],
      });
    } catch {
      /* WebMCP not supported in this browser */
    }
  }, []);

  return null;
}
