"use client";

import { faqItems } from "@/data/siteConfig";
import FaqAccordion from "./FaqAccordion";

export default function FaqSection() {
  return <FaqAccordion items={faqItems} id="faq-heading" className="faq-section section-container" />;
}
