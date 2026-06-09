import { siteConfig } from "./siteConfig";

export const privacyPageMeta = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name} (Ahtesham Aslam, Ahtesham Aslam, Ehtisham Aslam, Ahtsham Aslam) — Python developer portfolio at ahtasham.site.`,
};

export const privacyPageContent = {
  intro: `This privacy policy explains how ${siteConfig.name} ("we", "I") collects and uses information on ahtasham.site. This site is operated by ${siteConfig.name}, also known as Ahtesham Aslam, Ehtisham Aslam, or Ahtsham Aslam — a Python developer and AI automation specialist in ${siteConfig.location.country}.`,
  sections: [
    {
      heading: "Who operates this website",
      paragraphs: [
        `This website (ahtasham.site) is owned and operated by ${siteConfig.name}. You may find this person referenced online under alternate spellings: Ahtesham Aslam, Ehtisham Aslam, or Ahtsham Aslam. All refer to the same individual — a freelance Python developer based in ${siteConfig.location.city} and ${siteConfig.location.secondaryCity}, Pakistan.`,
        `Contact: ${siteConfig.email} · WhatsApp: +${siteConfig.whatsappNumber}`,
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        `When you contact me via email or WhatsApp, I receive the information you choose to share (name, email, phone number, project details). This site does not require account registration.`,
        `Like most websites, server logs may record your IP address, browser type, pages visited, and referring URL for security and analytics purposes. Cloudflare may process traffic data as the hosting provider.`,
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        `Contact form submissions and direct messages are used solely to respond to inquiries, provide quotes, and deliver contracted services. I do not sell or share your personal data with third parties for marketing.`,
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        `This site uses minimal cookies. Theme preferences may be stored locally in your browser. Third-party services (e.g. WhatsApp links, embedded content) may set their own cookies when you interact with them.`,
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You may request access to, correction of, or deletion of personal data you have shared with me by emailing ${siteConfig.email}. I will respond within a reasonable timeframe.`,
      ],
    },
    {
      heading: "Updates",
      paragraphs: [
        `This policy may be updated periodically. Last updated: ${siteConfig.year}. Continued use of the site after changes constitutes acceptance of the revised policy.`,
      ],
    },
  ],
};
