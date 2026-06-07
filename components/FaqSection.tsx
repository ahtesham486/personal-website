import { faqItems } from "@/data/siteConfig";
import FaqDetails from "./FaqDetails";

export default function FaqSection() {
  return <FaqDetails items={faqItems} id="faq-heading" className="faq-section section-container" />;
}
